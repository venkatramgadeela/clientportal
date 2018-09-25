  import React from 'react';
  import { Row, Col } from 'reactstrap';
  import { withRouter, Route, Link } from 'react-router-dom';

  import Auth from '../../services/Auth';
  // import ClubMenu from '../ClubMenu';

  import './index.css';

  const Breadcrumbs = props => {
    const homeValue = '/dashboard';

    const crumb = (part, partIndex, parts) => {
      const path = ['', ...parts.slice(0, partIndex + 1)].join('/');
      return (
        <span key={path}>
          {' / '}
          <Link to={`${path}/`} href={`${path}/`}>
            {part}
          </Link>
        </span>
      );
    };
    }

    const {
      location: { pathname }
    } = props;



    return (
      <Route
        path="*"
        render={() => {
          let parts = pathname.split('/');
          if (pathname.slice(-1) === '/') {
            parts = pathname.slice(0, -1).split('/');
          }
          if (pathname.includes('add')) {
            parts = pathname.slice(0, pathname.lastIndexOf('add') + 3).split('/');
          }
          if (pathname.includes('edit')) {
            parts = pathname
              .slice(0, pathname.lastIndexOf('edit') + 4)
              .split('/');
          }
          let place = parts[parts.length - 1];
          place = place.replace(/-/g, ' ');
          parts = parts.slice(1, parts.length - 1);
          return (

            <Row className="breadcrumbs mb-3">
              <Col xs="6">
                <div className="breadcrumbs__previous">
                  <Link to={homeValue} href={homeValue}>
                    Home
                  </Link>
                  {parts.map(crumb)} /
                </div>
                <span> {place}</span>
              </Col>
              {/* <Col xs="6" className="text-right">
                <ClubMenu />
              </Col> */}
            </Row>
          );
        }}
      />
    );
  };

  export default withRouter(Breadcrumbs);



