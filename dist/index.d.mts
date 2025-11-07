import * as react_jsx_runtime from 'react/jsx-runtime';

interface LoginPageProps {
    onLogin: (email: string, password: string) => void;
    onSignUp: (email: string, password: string, firstname: string, lastname: string, middlename: string, contactnumber: string) => void;
    forgotPasswordLink?: string;
}
declare function LoginPage({ onLogin, onSignUp, forgotPasswordLink, }: LoginPageProps): react_jsx_runtime.JSX.Element;

declare function ReinstatementPage(): react_jsx_runtime.JSX.Element;

export { LoginPage, ReinstatementPage };
