import express from 'express';
import * as dctTranslationController from '../../controllers/dtcTranslation';

const dctTranslations = express.Router();

dctTranslations.get('/', dctTranslationController.findAll);
dctTranslations.get('/:dct', dctTranslationController.findOne);
dctTranslations.post('/', dctTranslationController.create);
dctTranslations.put('/:dct', dctTranslationController.update);
dctTranslations.delete('/:dct', dctTranslationController.destroy);

export default dctTranslations;
