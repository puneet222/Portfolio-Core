import React, { useContext } from 'react'
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import ThemeContext from '../../context/theme/ThemeContext';
import './auth.scss';
import { DARK_THEME } from '../../app.constants';
import {
    INVALID_EMAIL_MESSAGE,
    NO_PASSWORD_MESSAGE,
} from './auth.contants';

export const Login = () => {

    const { theme } = useContext(ThemeContext);

    const onFinish = (values: Store) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <div>
            <div className="app-title-div">
                <span className={`app-title ${theme === DARK_THEME ? "dark" : ""}`}>Portfolio Core</span>
            </div>
            <div className="form-container">
                <Form
                    layout="vertical"
                    name="basic"
                    form={form}
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name='email'
                        label={<h3 className={`form-label ${theme === DARK_THEME ? "dark" : ""}`}>Email</h3>}
                        rules={[{ required: true, message: INVALID_EMAIL_MESSAGE, type: 'email' }]}
                    >
                        <Input className={`form-input ${theme === DARK_THEME ? "dark" : ""}`} />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label={<h3 className={`form-label ${theme === DARK_THEME ? "dark" : ""}`}>Password</h3>}
                        rules={[{ required: true, message: NO_PASSWORD_MESSAGE }]}
                    >
                        <Input type="password" className={`form-input ${theme === DARK_THEME ? "dark" : ""}`} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            className={`register-button ${theme === DARK_THEME ? "dark" : ""}`}
                            htmlType="submit"
                        >
                            Login
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
