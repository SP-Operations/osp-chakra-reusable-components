// Author: Jimwell Arvin L. Ocsio

import { HoverCardPropsProvider } from "@chakra-ui/react";

export type Claimant = {
    index: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    suffix?: string;
    email: string;
    mobile?: string;
    relToPh: string;
    payoutChannel: string;
}

export type PhClaimant = {
    index: number;
    lpaNumber: string;
    incidentDate: string;
    causeOfIncident: string;
}

export type ClaimantHoverCardParams = {
    claimant: Claimant;
    setClaimant: (value: Claimant) => void;
    setPayoutChannel: (value: string[]) => void;
    setRelToPh: (value: string[]) => void;
    onContinueClick: () => void;
}

export type ClaimantFormParams = {
    value: Claimant[];
    onClaimantEvent: (value: Claimant[]) => void;
}

export type PlanholderFormParams = {
    benefitText: React.ReactNode;
    value: PhClaimant;
    onValueChange: (value: PhClaimant) => void;
}
