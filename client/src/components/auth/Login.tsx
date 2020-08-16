import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { Store } from 'antd/lib/form/interface';
import ThemeContext from '../../context/theme/ThemeContext';
import { DARK_THEME } from '../../app.constants';
import { INVALID_EMAIL_MESSAGE, NO_PASSWORD_MESSAGE } from './auth.contants';
import AuthContext from '../../context/auth/AuthContext';
import { AuthContextType } from '../../context/auth/interface';
import { Loader } from '../common/Loader';
import './auth.scss';

export const Login = () => {

    const { theme } = useContext(ThemeContext);

    const authContext: AuthContextType = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (authContext.error) {
            message.error(authContext.error, 50, authContext.clearErrors);
        }
        if (authContext.isAuthenticated) {
            history.push("/");
        }
        setLoading(authContext.loading);
    }, [authContext.isAuthenticated, authContext.loading, authContext.error, authContext.clearErrors, history]);

    const onFinish = (values: Store) => {
        if (authContext.authenticateUser) {
            if (authContext.updateLoading) {
                authContext.updateLoading(true);
            }
            authContext.authenticateUser({
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
                        name='email'
                        label={<h3 className={`form-label ${theme === DARK_THEME ? "dark" : ""}`}>Email</h3>}
                        rules={[{ required: true, message: INVALID_EMAIL_MESSAGE, type: 'email' }]}>
                        <Input data-testid="email" className={`form-input ${theme === DARK_THEME ? "dark" : ""}`} />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label={<h3 className={`form-label ${theme === DARK_THEME ? "dark" : ""}`}>Password</h3>}
                        rules={[{ required: true, message: NO_PASSWORD_MESSAGE }]}>
                        <Input type="password" data-testid="password" className={`form-input ${theme === DARK_THEME ? "dark" : ""}`} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            data-testid="submit"
                            className={`register-button ${theme === DARK_THEME ? "dark" : ""}`}
                            htmlType="submit">
                            {loading ? <Loader /> : 'Login'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
