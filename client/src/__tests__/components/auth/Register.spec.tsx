import React from 'react';
import { Register } from "../../../components/auth/Register";
import { cleanup, render, fireEvent, waitForElement } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { INVALID_EMAIL_MESSAGE, MIN_PASSWORD_MESSAGE, PASSWORD_NOT_MATCH_MESSAGE, NO_PASSWORD_MESSAGE, NO_CONFIRM_PASSWORD_MESSAGE, NO_NAME_MESSAGE, NO_EMAIL_MESSAGE } from '../../../components/auth/auth.contants';

const server = setupServer(
    rest.post('/api/user', (req, res, ctx) => {
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

const registerEmail: string = "puneet@gmail.com";
const registerPassword: string = "123456";

const checkAlertMessage = (alerts: HTMLElement[], message: string): boolean => {
    let present = false;
    alerts.forEach(alert => {
        if (alert.textContent === message) {
            present = true;
        }
    });
    return present;
}

describe("Register Component Test", () => {
    it("should check Register form for is visible to the user", () => {
        const { getByTestId } = render(<Register />);
        expect((getByTestId('name') as HTMLInputElement).value).toBe("");
        expect((getByTestId('email') as HTMLInputElement).value).toBe("");
        expect((getByTestId('password') as HTMLInputElement).value).toBe("");
        expect((getByTestId('password2') as HTMLInputElement).value).toBe("");
        expect(getByTestId('submit-button')).toBeInTheDocument();
    });

    it("should show error on entering invalid values", async () => {
        const { getByTestId, getAllByRole } = render(<Register />);
        fireEvent.change(getByTestId("name"), {
            target: { value: "test" }
        });
        fireEvent.change(getByTestId("email"), {
            target: { value: "test" }
        });
        fireEvent.change(getByTestId("password"), {
            target: { value: "123" }
        });
        fireEvent.change(getByTestId("password2"), {
            target: { value: "125" }
        });
        const alerts: HTMLElement[] = await waitForElement(() => getAllByRole("alert"));
        expect(checkAlertMessage(alerts, INVALID_EMAIL_MESSAGE)).toBeTruthy();
        expect(checkAlertMessage(alerts, MIN_PASSWORD_MESSAGE)).toBeTruthy();
        expect(checkAlertMessage(alerts, PASSWORD_NOT_MATCH_MESSAGE)).toBeTruthy();
    });

    it("it should show alert as User already exists", async () => {
        server.use(
            rest.post('/api/user', (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({
                    msg: "User already exits"
                }));
            })
        );
        const { getByTestId, container, getByText } = render(<Register />);
        fireEvent.change(getByTestId("email"), {
            target: { value: registerEmail }
        });
        fireEvent.change(getByTestId("password"), {
            target: { value: registerPassword }
        });
        expect((getByTestId('email') as HTMLInputElement).value).toBe(registerEmail);
        expect((getByTestId('password') as HTMLInputElement).value).toBe(registerPassword);
        // fireEvent.click(getByTestId("submit"));
        /* let messages = await waitForElement(() => getByText("Invalid Credentials"));
        console.log(messages); */
        /* TODO:
        Check for invalid credentials message alert */
    });

    it("should able to Register the user with right credentials", async () => {

        /* TODO:
        Check the fucntionality of location update */
    });

});