import React from 'react';
import { Login } from "../../../components/auth/Login";
import { cleanup, render, fireEvent, waitForElement } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { INVALID_EMAIL_MESSAGE } from '../../../components/auth/auth.contants';

const server = setupServer(
    rest.post('/api/auth', (req, res, ctx) => {
        return res(ctx.json({ token: 'xyz' }))
    })
);

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

beforeAll(() => server.listen());

afterEach(() => {
    server.resetHandlers();
    cleanup;
});

afterAll(() => server.close());

const loginEmail: string = "puneet@gmail.com";
const loginPassword: string = "123456";

const checkAlertMessage = (alerts: HTMLElement[], message: string): boolean => {
    let present = false;
    alerts.forEach(alert => {
        if (alert.textContent === message) {
            present = true;
        }
    });
    return present;
}

describe("Login Component Test", () => {
    it("should check Login for is visible to the user", () => {
        const { getByTestId } = render(<Login />);
        expect((getByTestId('email') as HTMLInputElement).value).toBe("");
        expect((getByTestId('password') as HTMLInputElement).value).toBe("");
        expect(getByTestId('submit')).toBeInTheDocument();
    });

    it("should able to login the user with right credentials", async () => {
        const { getByTestId } = render(<Login />);
        fireEvent.change(getByTestId("email"), {
            target: { value: loginEmail }
        });
        fireEvent.change(getByTestId("password"), {
            target: { value: loginPassword }
        });
        expect((getByTestId('email') as HTMLInputElement).value).toBe(loginEmail);
        expect((getByTestId('password') as HTMLInputElement).value).toBe(loginPassword);
        fireEvent.click(getByTestId("submit"));
        /* TODO:
        Check the fucntionality of location update */
    });

    it("it should show alert as Invalid credentials", async () => {
        server.use(
            rest.post('/api/auth', (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({
                    msg: "Invalid Credentials"
                }));
            })
        );
        const { getByTestId, container, getByText } = render(<Login />);
        fireEvent.change(getByTestId("email"), {
            target: { value: loginEmail }
        });
        fireEvent.change(getByTestId("password"), {
            target: { value: loginPassword }
        });
        expect((getByTestId('email') as HTMLInputElement).value).toBe(loginEmail);
        expect((getByTestId('password') as HTMLInputElement).value).toBe(loginPassword);
        fireEvent.click(getByTestId("submit"));
        /* let messages = await waitForElement(() => getByText("Invalid Credentials"));
        console.log(messages); */
        /* TODO:
        Check for invalid credentials message alert */
    });

    it("should show error on entering invalid email", async () => {
        const { getByTestId, getByText, rerender, getAllByRole } = render(<Login />);
        fireEvent.change(getByTestId("email"), {
            target: { value: "test" }
        });
        const alerts: HTMLElement[] = await waitForElement(() => getAllByRole("alert"));
        expect(checkAlertMessage(alerts, INVALID_EMAIL_MESSAGE)).toBeTruthy();
    });
});