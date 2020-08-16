import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, message } from 'antd';
import ThemeContext from '../../context/theme/ThemeContext';
import AuthContext from '../../context/auth/AuthContext';
import './auth.scss';
import { DARK_THEME } from '../../app.constants';
import {
    NO_NAME_MESSAGE,
    INVALID_EMAIL_MESSAGE,
    NO_PASSWORD_MESSAGE,
    NO_CONFIRM_PASSWORD_MESSAGE,
    PASSWORD_NOT_MATCH_MESSAGE,
    MIN_PASSWORD_MESSAGE
} from './auth.contants';
import { Store } from 'antd/lib/form/interface';
import { AuthContextType } from '../../context/auth/interface';
import { useHistory } from 'react-router-dom';
import { Loader } from '../common/Loader';

export const Register = () => {

    const { theme } = useContext(ThemeContext);

    const authContext: AuthContextType = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (authContext.error) {
            message.error(authContext.error, 2, authContext.clearErrors);
        }
        if (authContext.isAuthenticated) {
            history.push("/");
        }
        setLoading(authContext.loading);
    }, [authContext.isAuthenticated, authContext.loading, authContext.error, authContext.clearErrors, history]);

    const onFinish = (values: Store) => {
        if (authContext.registerUser) {
            if (authContext.updateLoading) {
                authContext.updateLoading(true);
            }
            authContext.registerUser({
                ...values
            });
        }
    };

    return (
        <div>
            <div className="app-title-div">
                <span className={`app-title ${theme === DARK_THEME ? "dark" : ""}`}>Portfolio Core</span>
            </div>
            <div className="form-container">
                <Form
                    layout="vertical"
                    name="basic"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='name'
                        label={<h3 className={`form-label ${theme === DARK_THEME ? "dark" : ""}`}>Name</h3>}
                        rules={[{ required: true, message: NO_NAME_MESSAGE }]}>
                        <Input className={`form-input ${theme === DARK_THEME ? "dark" : ""}`} />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label={<h3 className={`form-label ${theme === DARK_THEME ? "dark" : ""}`}>Email</h3>}
                        rules={[{ required: true, message: INVALID_EMAIL_MESSAGE, type: 'email' }]}>
                        <Input className={`form-input ${theme === DARK_THEME ? "dark" : ""}`} />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label={<h3 className={`form-label ${theme === DARK_THEME ? "dark" : ""}`}>Password</h3>}
                        hasFeedback
                        rules={[
                            { required: true, message: NO_PASSWORD_MESSAGE },
                            { type: "string", min: 6, message: MIN_PASSWORD_MESSAGE }
                        ]}>
                        <Input type="password" className={`form-input ${theme === DARK_THEME ? "dark" : ""}`} />
                    </Form.Item>
                    <Form.Item
                        name='password2'
                        label={<h3 className={`form-label ${theme === DARK_THEME ? "dark" : ""}`}>Confirm Password</h3>}
                        dependencies={['password']}
                        hasFeedback
                        rules={
                            [
                                { required: true, message: NO_CONFIRM_PASSWORD_MESSAGE },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(PASSWORD_NOT_MATCH_MESSAGE);
                                    },
                                })]}>
                        <Input type="password" className={`form-input ${theme === DARK_THEME ? "dark" : ""}`} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            className={`register-button ${theme === DARK_THEME ? "dark" : ""}`}
                            htmlType="submit">
                            {loading ? <Loader /> : 'Register'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
