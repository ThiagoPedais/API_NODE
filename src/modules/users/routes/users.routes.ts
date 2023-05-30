import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import uploadConfig from '@config/upload';
import UserController from '../controllers/UserControllers';
import isAuthentcated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';

const usersRouter = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthentcated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthentcated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
