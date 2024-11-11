import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import Input from "../../components/Input"
import { useEffect, useState } from 'react';
import * as userService from '../../services/userService.js'
import * as identifyService from '../../services/identifyService.js'


import { useFormik } from 'formik';
import * as Yup from 'yup';
const cx = classNames.bind(styles);

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [data, setData] = useState({
        name: '',
        email: '',
    });
    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Required')
            .email('Invalid email address'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (value) => {
            if (value.email == data.email) {
                const email = value.email;
                const fetchApi = async () => {
                    try {
                        const res = await identifyService.requestCodeByEmail({
                            email: email,
                        });
                        alert(res.message);
                        setEmail(email);
                    } catch (error) {
                        console.log(error);
                    }
                }
                fetchApi();
            }
            else {
                console.log('error');
            }
        }
    })

    const formik1 = useFormik({
        initialValues: {
            code: '',
        },
        onSubmit: (value) => {
            const idCode = value.code;
            const fetchApi = async () => {
                try {
                    const res = await identifyService.vertifyCode(idCode);
                    alert(res.message);
                    setCode(idCode);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchApi();
        }
    })
    const validationSchema2 = Yup.object({
        password: Yup.string()
            .required('Required')
            .min(5, 'Must be less 5 characters'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match') // Validation for confirm password
            .required('Required')
    });
    const formik2 = useFormik({
        initialValues: {
            password: '',
            password_confirmation: '',
        },
        validationSchema: validationSchema2,
        onSubmit: (value) => {
            const newPassword = value.password;
            const gmail = email;
            const username = data.name;

            const fetchApi = async () => {
                try {
                    const res = await identifyService.updatePasswordAfterVerify({
                        username: username,
                        email: gmail,
                        newPassword: newPassword,
                    })
                    alert(res.message);
                    window.location.href = "../login";
                } catch (error) {
                    console.log(error);
                }
            }
            fetchApi();
        }
    })
    const validationSchema3 = Yup.object({
        username: Yup.string()
            .required('Required')
    });

    const formik3 = useFormik({
        initialValues: {
            username: '',
        },
        validationSchema: validationSchema3,
        onSubmit: (value) => {
            const userName = value.username;
            const fetchApi = async () => {
                try {
                    const res = await userService.getUserByUsername(userName);
                    // console.log(res);
                    setData({
                        name: res.name,
                        email: res.email
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            fetchApi();
        }
    })
    return (
        <div className={cx('wrapper')}>
            {!data.name &&
                <form action="" className={cx("signup")} onSubmit={formik3.handleSubmit}>
                    <i className={`fa-sharp fa-solid fa-arrow-left ${cx('xmark')}`} onClick={() => {
                        window.location.href = '../login';
                    }}></i>
                    <img src="https://png.pngtree.com/png-clipart/20230925/original/pngtree-comicstyle-login-icon-with-password-access-and-padlock-splash-vector-png-image_12861184.png" className={cx('test')}></img>
                    <h2 className={cx("signup-title")}>Find your account </h2>
                    <p>Please enter account.</p>
                    <div className={cx('group-control')}>
                        <Input className={cx("signup-control")}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            autoComplete="username"
                            value={formik3.values.username}
                            onChange={formik3.handleChange}
                            onBlur={formik3.handleBlur}
                            error={formik3.touched.username && formik3.errors.username ? formik3.errors.username : null}
                        />
                    </div>
                    <button className={cx("signup-submit")} type='submit'>Request</button>
                </form>
            }
            {!email && data.name &&
                <form action="" className={cx("signup")} onSubmit={formik.handleSubmit}>
                    {/* <i className={`fa-sharp fa-solid fa-arrow-left ${cx('xmark')}`} onClick={() => {
                        window.location.href = '../login';
                    }}></i>
                    <img src="https://png.pngtree.com/png-clipart/20230925/original/pngtree-comicstyle-login-icon-with-password-access-and-padlock-splash-vector-png-image_12861184.png" className={cx('test')}></img> */}
                    <h2 className={cx("signup-title")}>Find your email </h2>
                    <p>Please enter your email.</p>
                    <div className={cx('group-control')}>
                        <Input className={cx("signup-control")}
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="username"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                        />
                    </div>
                    <button className={cx("signup-submit")} type='submit'>Request</button>
                </form>
            }


            {email && !code &&
                <form action="" className={cx("signup")} onSubmit={formik1.handleSubmit}>
                    <h2 className={cx("signup-title")}>Get code from email </h2>
                    <p>The code will expire after 30s.</p>
                    <div className={cx('group-control')}>
                        <Input className={cx("signup-control")}
                            type="text"
                            id="code"
                            name="code"
                            placeholder="code"
                            value={formik1.values.code}
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                            error={formik1.touched.code && formik1.errors.code ? formik1.errors.code : null}
                        />
                    </div>
                    <button className={cx("signup-submit")} type='submit'>Send</button>
                </form>
            }

            {code &&
                <form action="" className={cx("signup")} onSubmit={formik2.handleSubmit}>
                    <h2 className={cx("signup-title")}>New password </h2>
                    <p>Enter to password</p>
                    <div className={cx('group-control')}>
                        <Input className={cx("signup-control")}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            value={formik2.values.password}
                            onChange={formik2.handleChange}
                            onBlur={formik2.handleBlur}
                            error={formik2.touched.password && formik2.errors.password ? formik2.errors.password : null}
                        />
                    </div>

                    <div className={cx('group-control')}>
                        <Input className={cx("signup-control")}
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            value={formik2.values.password_confirmation}
                            onChange={formik2.handleChange}
                            onBlur={formik2.handleBlur}
                            error={formik2.touched.password_confirmation && formik2.errors.password_confirmation ? formik2.errors.password_confirmation : null}
                        />
                    </div>
                    <button className={cx("signup-submit")} type='submit'>Confirm</button>
                </form>
            }
        </div>
    );
}

export default ForgotPassword;