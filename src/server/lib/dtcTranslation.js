import DtcTranslation from '../models/dtcTranslation';

export const create = (req, res) => {
  console.log('req', req);
  if (!req.body.dtc) {
    return res.status(400).send({
      message: 'DtcTranslation must have a dtc'
    });
  }
  if (!req.body.name) {
    return res.status(400).send({
      message: 'DtcTranslation must have a name'
    });
  }
  if (!req.body.priority) {
    return res.status(400).send({
      message: 'DtcTranslation must have a priority'
    });
  }
  if (!req.body.consumerTranslation) {
    return res.status(400).send({
      message: 'DtcTranslation must have a consumer translation'
    });
  }
  if (!req.body.recommendedAction) {
    return res.status(400).send({
      message: 'DtcTranslation must have a recommended action'
    });
  }
  if (!req.body.impactExpected) {
    return res.status(400).send({
      message: 'DtcTranslation must have an impact expected'
    });
  }

  const dtcTranslation = new DtcTranslation({ ...req.body });

  if (
    typeof dtcTranslation.goRating !== 'undefined' &&
    dtcTranslation.goRating !== null
  ) {
    dtcTranslation.goRating = parseInt(dtcTranslation.goRating, 10);
  }

  dtcTranslation.save((err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      if (err.name === 'MongoError' || err.code === 11000) {
        res.status(500).send({
          message: `DtcTranslation ${req.body.dtc} is already taken.`
        });
      } else {
        res.status(500).send({
          message: 'Some error occurred while saving the DtcTranslation.'
        });
      }
    } else {
      res.send(data);
    }
  });
  return null;
};

export const findAll = (req, res) => {
  DtcTranslation.find((err, dtcTranslations) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving dtcTranslations.'
      });
    } else {
      res.send(dtcTranslations);
    }
    return null;
  });
};

export const findOne = (req, res) => {
  DtcTranslation.findOne({
    dtc: req.params.dtc.toUpperCase()
  }).exec((err, dtcTranslation) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('There was an error:', err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `DtcTranslation ${req.params.dtc} not found`
        });
      }
      return res.status(500).send({
        message: `Error retrieving dtcTranslation ${req.params.dtc}`
      });
    }

    if (!dtcTranslation) {
      return res.status(404).send({
        message: `DtcTranslation ${req.params.dtc} not found`
      });
    }

    return res.send(dtcTranslation);
  });
};

export const findConsumerTranslations = (req, res) => {
  DtcTranslation.find((err, dtcTranslations) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving dtcTranslations.'
      });
    } else {
      const translationSet = new Set(
        dtcTranslations.map(trans => trans.consumerTranslation)
      );
      const filteredTranslations = Array.from(translationSet).filter(
        trans => trans !== undefined && trans !== ''
      );
      res.send(filteredTranslations);
    }
    return null;
  });
};

export const findTechTranslations = (req, res) => {
  DtcTranslation.find((err, dtcTranslations) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving dtcTranslations.'
      });
    } else {
      const translationSet = new Set(
        dtcTranslations.map(trans => trans.techTranslation)
      );
      const filteredTranslations = Array.from(translationSet).filter(
        trans => trans !== undefined && trans !== ''
      );
      res.send(filteredTranslations);
    }
    return null;
  });
};

export const findCautionMessages = (req, res) => {
  DtcTranslation.find((err, dtcTranslations) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving dtcTranslations.'
      });
    } else {
      const cautionMessageSet = new Set(
        dtcTranslations.map(trans => trans.cautionMessage)
      );
      const filteredCautionMessages = Array.from(cautionMessageSet).filter(
        trans => trans !== undefined && trans !== ''
      );
      res.send(filteredCautionMessages);
    }
    return null;
  });
};

export const findTipMessages = (req, res) => {
  DtcTranslation.find((err, dtcTranslations) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving dtcTranslations.'
      });
    } else {
      const tipMessageSet = new Set(
        dtcTranslations.map(trans => trans.tipMessage)
      );
      const filteredTipMessages = Array.from(tipMessageSet).filter(
        trans => trans !== undefined && trans !== ''
      );
      res.send(filteredTipMessages);
    }
    return null;
  });
};

export const findMessageEmails = (req, res) => {
  DtcTranslation.find((err, dtcTranslations) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving dtcTranslations.'
      });
    } else {
      const messageEmailSet = new Set(
        dtcTranslations.map(trans => trans.messageEmail)
      );
      const filteredMessageEmails = Array.from(messageEmailSet).filter(
        trans => trans !== undefined && trans !== ''
      );
      res.send(filteredMessageEmails);
    }
    return null;
  });
};

export const findMessageSmss = (req, res) => {
  DtcTranslation.find((err, dtcTranslations) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving dtcTranslations.'
      });
    } else {
      const messageSmsSet = new Set(
        dtcTranslations.map(trans => trans.messageSms)
      );
      const filteredMessageSmss = Array.from(messageSmsSet).filter(
        trans => trans !== undefined && trans !== ''
      );
      res.send(filteredMessageSmss);
    }
    return null;
  });
};

export const findRecommendedActions = (req, res) => {
  DtcTranslation.find((err, dtcTranslations) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving dtcTranslations.'
      });
    } else {
      const recommendedActionSet = new Set(
        dtcTranslations.map(trans => trans.recommendedAction)
      );
      const filteredRecommendedActions = Array.from(
        recommendedActionSet
      ).filter(trans => trans !== undefined && trans !== '');
      res.send(filteredRecommendedActions);
    }
    return null;
  });
};

export const findImpactExpecteds = (req, res) => {
  DtcTranslation.find((err, dtcTranslations) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving dtcTranslations.'
      });
    } else {
      const impactExpectedSet = new Set(
        dtcTranslations.map(trans => trans.impactExpected)
      );
      const filteredImpactExpecteds = Array.from(impactExpectedSet).filter(
        trans => trans !== undefined && trans !== ''
      );
      res.send(filteredImpactExpecteds);
    }
    return null;
  });
};

export const update = (req, res) => {
  DtcTranslation.findOne(
    {
      dtc: req.params.dtc.toUpperCase()
    },
    (err, resultDtc) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: `DtcTranslation ${req.params.dtc} not found`
          });
        }
        return res.status(500).send({
          message: `Error finding ${req.params.dtc}`
        });
      }

      if (!resultDtc) {
        return res.status(404).send({
          message: `DtcTranslation ${req.params.dtc} not found`
        });
      }

      const {
        _id,
        dtc,
        name,
        clubCode,
        category,
        standard,
        vehicleStatus,
        ...customizableFields
      } = req.body;
      let copiedDtc = resultDtc;
      if (typeof clubCode === 'undefined' || clubCode === null) {
        copiedDtc = Object.assign(resultDtc, req.body);
      } else {
        const club = copiedDtc.customTranslations.findIndex(
          elm => elm.clubCode === clubCode
        );
        copiedDtc.customTranslations[club] = Object.assign(
          copiedDtc.customTranslations[club],
          customizableFields
        );
        if (
          typeof copiedDtc.customTranslations[club].goRating !== 'undefined' &&
          copiedDtc.customTranslations[club].goRating !== null
        ) {
          copiedDtc.customTranslations[club].goRating = parseInt(
            copiedDtc.customTranslations[club].goRating,
            10
          );
        }
      }

      if (
        typeof copiedDtc.goRating !== 'undefined' &&
        copiedDtc.goRating !== null
      ) {
        copiedDtc.goRating = parseInt(copiedDtc.goRating, 10);
      }

      copiedDtc.save(updateErr => {
        if (updateErr) {
          // eslint-disable-next-line no-console
          console.log(updateErr);
          res.status(500).send({
            message: `Could not update ${req.params.dtc}`
          });
        } else {
          res.send(copiedDtc);
        }
      });

      return null;
    }
  );
};

export const destroy = (req, res) => {
  DtcTranslation.findOneAndRemove(
    {
      dtc: req.body.dtc.toUpperCase()
    },
    (err, dtcTranslation) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: `DtcTranslation ${req.params.dtc} not found`
          });
        }
        return res.status(500).send({
          message: `Could not delete ${req.params.dtc}`
        });
      }

      if (!dtcTranslation) {
        return res.status(404).send({
          message: `DtcTranslation ${req.params.dtc} not found`
        });
      }

      res.send({
        message: 'DtcTranslation deleted successfully!'
      });
      return null;
    }
  );
};
