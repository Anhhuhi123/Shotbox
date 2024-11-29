import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import styles from './FormAlbum.module.scss';
import { v4 as uuidv4 } from 'uuid';
import Input from '../Input';
import Button from '../Button';
import * as AlbumService from '../../services/albumService';
const cx = classNames.bind(styles);

function FormAlbum({ setShowFormAlbum }) {
    const formik = useFormik({
        initialValues: {
            albumName: '',
            description: '',
        },
        validationSchema: Yup.object({
            albumName: Yup.string()
                .required('Album name is required')
                .min(3, 'Album name must be at least 3 characters'),
            description: Yup.string()
                .max(500, 'Description cannot exceed 500 characters'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const uniqueId = uuidv4();
            try {
                const res = await AlbumService.createAlbum({
                    albumName: values.albumName,
                    description: values.description,
                    location: uniqueId,
                });

                toast.success(`Success:${res.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                    onClose: () => {
                        resetForm();
                        window.location.reload();
                    },
                });
            } catch (error) {
                formik.setFieldError('albumName', `${error.response.data.message}`);
                console.error('Error creating album:', error);
            }
        },
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <h2>ADD NEW ALBUM</h2>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        className={cx('album-control')}
                        type="text"
                        id="albumName"
                        name="albumName"
                        placeholder="Album Name"
                        autoComplete="albumName"
                        value={formik.values.albumName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.albumName && formik.errors.albumName && (
                        <p className={cx('message-error')}>{formik.errors.albumName}</p>
                    )}

                    <textarea
                        className={cx('txt-area')}
                        placeholder="Description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <p className={cx('message-error')}>{formik.errors.description}</p>
                    )}

                    <div>
                        <Button first onClick={() => setShowFormAlbum(false)} type="button">
                            Cancel
                        </Button>
                        <Button first type="submit">
                            Add
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default FormAlbum;
