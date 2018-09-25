import express from 'express';
import authRoutes from '../services/auth/routes';
import dctTranslationRoutes from './lib/dtcTranslation';
import userRoutes from './lib/users';

const routes = express.Router();

routes.use('/api', authRoutes);
routes.use('/api/dctTranslations', dctTranslationRoutes);
routes.use('/api/users', userRoutes);

export default routes;