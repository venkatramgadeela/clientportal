pipeline {
  parameters {
    booleanParam(name: 'RUN_SECURITY_SCANS', defaultValue: false, description: 'Whether or not to run the fortify and black duck scans for information security.')
    booleanParam(name: 'RUN_SONAR_QUBE_SCAN', defaultValue: false, description: 'Whether or not to run the sonar qube static analysis.')
    booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: 'Whether or not to run junit tests.')
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
    disableConcurrentBuilds()
    skipStagesAfterUnstable()
    timestamps()
  }
  triggers {
    pollSCM('')
  }
  environment {
    // DEVOPSBUILD USER - NOTE THIS USER MUST BE PROPERLY CONFIGURED IN THE HOME DIR .gitconfig FILE
    // THIS USE SHOULD ALSO BE CONFIGURED IN BITBUCKET TO BE AN IGNORED COMMITTER TO NOT KICK OFF SPURIOUS BUILDS
    SCM_USER = credentials('c4ac668d-0ac9-413b-9dc0-43be2898f7ab')
    CLOUDSCAN_APP = 'dct-client'
    CLOUDSCAN_APP_VERSION = '1'
    CLOUDSCAN_EXCLUDE = 'node_modules'
    // HUBSCAN is BlackDuck
    HUBSCAN_APP = 'dct-client'
    HUBSCAN_APP_VERSION = '1'
    HUBSCAN_EXCLUDE = '/node_modules/'
    FORTIFY_EXCLUDE = 'node_modules'
    // RSYNC TO QA ENVIRONMENT
    //RSYNC_EXCLUDE = '--exclude relative/directory/path'
    RSYNC_EXCLUDE = ''
    RSYNC_SRC_DIR = '.'
    RSYNC_DST_DIR = '/opt/dct/workspace'
    RSYNC_DST_SRV = 'dct@dctqa01.national.aaa.com'
  }
  agent any
  stages {
    stage('Checkout') { // for display purposes
      steps {
        checkout scm
      }
    }
    stage('Compile') {
   agent {
    docker {
      image 'node:8.9.4'
      args "-v ${env.JENKINS_HOME}:/tmp/jenkins_home -v /home/fortify:/home/fortify --env HOME=/tmp/jenkins_home --env HTTPS_PROXY=proxy.national.aaa.com:8889 --env HTTP_PROXY=proxy.national.aaa.com:8889 --env PATH=$PATH:/home/fortify/HPE_Security/Fortify_SCA_and_Apps_17.20/bin:/var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarScanner/bin"
    }
  }
      steps {
        script {
          sh '''
            echo "Compile stage"
          '''
        }
      }
    }
    stage('UnitTest') {
      when {
        not { expression { return params.SKIP_TESTS } }
      }
      steps {
        script {
          sh '''
            echo "Unit Tests"
          '''
        }
      }
    }
    stage('SonarQube analysis') {
      when {
        expression { return params.RUN_SONAR_QUBE_SCAN }
      }
      steps {
        withSonarQubeEnv('SONAR_QUBE') {
          script {
            sh '''
                CLOUDSCAN_APP_BUILD=dct-client-`grep "version" package.json | head -n1 | awk '{print $2 }' |  tr -d '"' | tr -d ',' `
                sonar-scanner -Dsonar.projectName=$CLOUDSCAN_APP -Dsonar.projectVersion=$CLOUDSCAN_APP_BUILD -Dsonar.projectKey=$CLOUDSCAN_APP -Dsonar.sources=src
            '''
          }
        }
      }
    }
    stage('InfoSecScans') {
      when {
        expression { return params.RUN_SECURITY_SCANS }
      }
      steps {
        script {
          sh '''
            #CLOUDSCAN_APP_BUILD=dct-client-`grep "version" package.json | head -n1 | awk '{print $2 }' |  tr -d '"' | tr -d ',' `
            CLOUDSCAN_APP_BUILD=$CLOUDSCAN_APP-$CLOUD_APP_VERSION
            sourceanalyzer -b $CLOUDSCAN_APP_BUILD . exclude=$FORTIFY_EXCLUDE
            cloudscan -sscurl http://secscan02:8080/ssc -ssctoken $INFOSEC_FORTIFY_KEY start -b ${CLOUDSCAN_APP_BUILD} --upload-to-ssc --ssc-upload-token $INFOSEC_FORTIFY_KEY --application ${CLOUDSCAN_APP} --application-version ${CLOUDSCAN_APP_VERSION} -scan -autoheap
          '''
        }

      }
    }
    stage('BlackDuck'){
      when {
        expression { return params.RUN_SECURITY_SCANS }
      }
      steps{
        script{
          hub_scan(hubProjectName: "${env.HUBSCAN_APP}", hubProjectVersion:"${env.HUBSCAN_APP_VERSION}", codeLocationName: '', unmapPreviousCodeLocations:false, deletePreviousCodeLocations:false, scans: [], excludePatterns: [], hubVersionPhase: 'Released', hubVersionDist: 'Internal', scanMemory: '8192', shouldGenerateHubReport: true, projectLevelAdjustments: true, bomUpdateMaximumWaitTime: '5', dryRun: false, cleanupOnSuccessfulScan: true)
        }
      }
    }
    stage('Push to dctqa01') {
      steps {
        script {
          sh '''
            echo "Push to dctqa01"
            rsync --verbose --progress --stats --compress --recursive --times --perms --links --delete $RSYNC_EXCLUDE $RSYNC_SRC_DIR $RSYNC_DST_SRV:$RSYNC_DST_DIR
          '''
        }
      }
    }
    stage('Restart application on dctqa01'){
      steps{
        script{
          sh'''
           echo "Time to call the restart script"
           ssh $RSYNC_DST_SRV 'chmod +x /opt/dct/workspace/scripts/restart.sh;/opt/dct/workspace/scripts/restart.sh'
        '''
        }
      }
    }
  }
  post {
    always {
      script {
        if (!params.SKIP_TESTS) {
          junit allowEmptyResults: true, testResults: '**/target/surefire-reports/*.xml'
          findbugs canComputeNew: false, defaultEncoding: '', excludePattern: '', healthy: '', includePattern: '', pattern: '**/target/findbugsXml.xml', unHealthy: ''
        }
      }
    }
    failure {
      echo "Build failed"
      emailext(
        recipientProviders: [[$class: 'CulpritsRecipientProvider']],
        from: "${env.DEPLOYMENT_EMAIL_FROM}",
        subject: "Build failed: ${env.JOB_NAME} branch <${env.BRANCH_NAME}>.",
        body: "${env.JOB_NAME} branch <${env.BRANCH_NAME}> has failed.  Check console output at ${env.BUILD_URL} for more information"
      )
    }
    unstable {
      echo "Build Unstable"
      emailext(
        recipientProviders: [[$class: 'FailingTestSuspectsRecipientProvider']],
        from: "${env.DEPLOYMENT_EMAIL_FROM}",
        subject: "Build unstable: ${env.JOB_NAME} branch <${env.BRANCH_NAME}>.",
        body: "${env.JOB_NAME} branch <${env.BRANCH_NAME}> has become unstable.  Check console output at ${env.BUILD_URL} for more information"
      )
    }
    changed {
      echo "Build State Changed..."
    }
  }
}
