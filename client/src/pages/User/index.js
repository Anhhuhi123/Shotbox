import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Button from '../../components/Button';
import Input from '../../components/Input';


const cx = classNames.bind(styles);

function User() {
    if (localStorage.getItem('authToken')) {
        var user = jwtDecode(localStorage.getItem('authToken'));
    }
    const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
    const [hideButtonChange, setHideButtonChange] = useState(true);
    const validationSchema = Yup.object({
        new_email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        current_password: Yup.string().required('Required'),
        new_password: Yup.string()
            .required('Required')
            .min(5, 'Must be at least 5 characters'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
            .required('Required')
    });

    const formik = useFormik({
        initialValues: {
            new_email: '',
            current_password: '',
            new_password: '',
            password_confirmation: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });



    const validationSchema1 = Yup.object({
        new_email: Yup.string()
            .email('Invalid email address')
            .required('Required')
    });

    const formik1 = useFormik({
        initialValues: {
            new_email: '',
        },
        validationSchema: validationSchema1,
        onSubmit: (values) => {
            console.log(values);
        }
    });


    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className={cx('title')}>
                    <h1>Account settings</h1>
                </div>
                <hr />
                <h2>Email Address</h2>
                <div className={cx('block-email')}>
                    <p>{"Your email address is "}
                        {/* <strong>nguyenquoctien2401@gmail.com</strong> */}
                        <strong>{user.email}</strong>

                    </p>
                    {hideButtonChange &&
                        <Button five onClick={() => {
                            setIsChangeEmailOpen(!isChangeEmailOpen);
                            setHideButtonChange(!hideButtonChange);
                        }}>
                            Change
                        </Button>
                    }

                </div>

                {isChangeEmailOpen && (
                    <form onSubmit={formik1.handleSubmit}>
                        <Input
                            className={cx("group-control")}
                            type="email"
                            id="new_email"
                            name="new_email"
                            placeholder="New Email Address"
                            value={formik1.values.new_email}
                            onChange={formik1.handleChange}
                            error={formik1.touched.new_email && formik1.errors.new_email ? formik1.errors.new_email : null}
                        />
                        <Button type="submit" five>Save Email</Button>
                        <Button five onClick={(e) => {
                            formik1.resetForm();
                            setIsChangeEmailOpen(!isChangeEmailOpen);
                            setHideButtonChange(!hideButtonChange);
                        }}>Cancel</Button>

                    </form>
                )}

                <hr />
                <h2>Password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={cx('control')}>
                        <Input
                            className={cx("group-control")}
                            type="password"
                            id="current_password"
                            name="current_password"
                            placeholder="Current Password"
                            autoComplete="current-password"
                            value={formik.values.current_password}
                            onChange={formik.handleChange}
                            error={formik.touched.current_password && formik.errors.current_password ? formik.errors.current_password : null}
                        />
                        <Input
                            className={cx("group-control")}
                            type="password"
                            id="new_password"
                            name="new_password"
                            placeholder="New Password"
                            autoComplete="new-password"
                            value={formik.values.new_password}
                            onChange={formik.handleChange}
                            error={formik.touched.new_password && formik.errors.new_password ? formik.errors.new_password : null}
                        />
                        <Input
                            className={cx("group-control")}
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            autoComplete="confirm-password"
                            value={formik.values.password_confirmation}
                            onChange={formik.handleChange}
                            error={formik.touched.password_confirmation && formik.errors.password_confirmation ? formik.errors.password_confirmation : null}
                        />
                    </div>
                    <div className={cx('submit')}>
                        <Button five type='submit'>Save Password</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default User;
