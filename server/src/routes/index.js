// cấu hình các router chính
import loginRouter from './login.js';
import registerRouter from './register.js';
import imagesRouter from './images.js'
import userRouter from './user.js'
<<<<<<< HEAD
import albumRouter from './album.js'
import album_imagesRouter from './album_images.js' 
=======
import deletedImagesRouter from './deleted_images.js';
>>>>>>> anh_new

function routes(app) {
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/images', imagesRouter);
<<<<<<< HEAD
    app.use('/album',albumRouter);
    app.use('/album_images',album_imagesRouter);
=======
    app.use('/deleteImages',deletedImagesRouter);
>>>>>>> anh_new
    app.use('/user', userRouter);
}
export default routes;

