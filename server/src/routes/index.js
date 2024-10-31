// cấu hình các router chính
import loginRouter from './login.js';
import registerRouter from './register.js';
import imagesRouter from './images.js'
import userRouter from './user.js'
import deletedImagesRouter from './deleted_images.js';

function routes(app) {
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/images', imagesRouter);
    app.use('/deleteImages',deletedImagesRouter);
    app.use('/user', userRouter);
}
export default routes;

