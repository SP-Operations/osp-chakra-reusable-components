import * as react_jsx_runtime from 'react/jsx-runtime';

interface LoginPageProps {
    onLogin: (email: string, password: string) => void;
    onSignUp: (email: string, password: string, firstname: string, lastname: string, middlename: string, contactnumber: string) => void;
    forgotPasswordLink?: string;
}
declare function LoginPage({ onLogin, onSignUp, forgotPasswordLink, }: LoginPageProps): react_jsx_runtime.JSX.Element;

interface CheckedPlan {
    lpaNo: string;
    planType: string;
    reinstatementFee: number;
    reinstatementPayment: number;
}
interface PhLapsedPlan {
    lpaNo: string;
    phName: string;
    planType: string;
    mop: string;
    status: string;
    totalAmtPayable: string;
    totalAmtPaid: string;
    balance: string;
    instAmt: string;
    newLpaNo: string;
    newStatus: string;
    newTotalAmtPayable: string;
    newTotalAmtPaid: string;
    newBalance: string;
    newInstAmt: string;
    duedate: string;
}
interface RIProps {
    initialPlans: PhLapsedPlan[];
    onSubmit: (selectedPlans: CheckedPlan[]) => void;
}
declare function ReinstatementPage({ initialPlans, onSubmit, }: RIProps): react_jsx_runtime.JSX.Element;

export { LoginPage, ReinstatementPage };
