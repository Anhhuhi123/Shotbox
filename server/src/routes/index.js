// cấu hình các router chính
import loginRouter from './login.js';
import registerRouter from './register.js';
import imagesRouter from './images.js'
import userRouter from './user.js'
import albumRouter from './album.js'
import albumImagesRouter from './albumImages.js'
import deletedImagesRouter from './deletedImages.js'
import identifyRouter from './identify.js'


function routes(app) {
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/images', imagesRouter);
    app.use('/user', userRouter)
    app.use('/album', albumRouter)
    app.use('/album/images', albumImagesRouter)
    app.use('/deleted/images', deletedImagesRouter)
    app.use('/identify', identifyRouter);

}
export default routes;

