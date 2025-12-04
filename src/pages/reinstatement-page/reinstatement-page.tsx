import { Box, Container, Flex, Separator, Steps } from "@chakra-ui/react";
import type { CheckedPlan } from "./reinstatement.types";
import { Body, H3, NextButton, PreviousButton } from "st-peter-ui";
import { useState } from "react";
import { ReinstatementForm } from "./reinstatement-form";
import { lapsedPlans } from "./data";
import { ReinstatementSummaryPage } from "./ri-summary";
import PaymentPage from "./payment";

const steps = ["Select Lapsed Plan", "Review Reinstatement", "Payment"]

export function ReinstatementPage({onSuccess} : {onSuccess: (transactionId: string, transactionAmount: number) => void}){
    const [checkedPlans, setCheckedPlans] = useState<CheckedPlan[]>([])
    const [step, setStep] = useState(0)
    
    const totalRIFee = checkedPlans.reduce((sum, p) => sum + p.reinstatementFee, 0);
    const totalRIPayment = checkedPlans.reduce((sum, p) => sum + p.reinstatementPayment, 0);
    const totalDue = totalRIFee + totalRIPayment;

    return(
        <Box maxW={"7xl"} mx={"auto"} py={3}>
            <Container px={0}>
                <H3>Reinstatement Application</H3>
                <Body mt={1}>
                    Quickly bring your plan back on track by reactivating a lapsed plan.
                </Body>
            </Container>
            <Steps.Root
            step={step}
            onStepChange={(e) => setStep(e.step)}
            count={steps.length}
            my={5}
            onStepComplete={() => onSuccess("RI-12345", totalDue)}
            >
                <Steps.List>
                    {steps.map((step, index) => (
                    <Steps.Item key={index} index={index} title={step}>
                        <Steps.Indicator
                        _current={{
                            backgroundColor: "var(--chakra-colors-primary-disabled)/50",
                            borderColor: "var(--chakra-colors-primary)",
                            color: "var(--chakra-colors-primary-hover)"
                        }}
                        _complete={{
                            backgroundColor: "var(--chakra-colors-primary)",
                            borderColor: "var(--chakra-colors-primary)",
                        }}
                        />
                        <Steps.Title display={{ base: "block", mdDown: "none" }}>
                        {step}
                        </Steps.Title>
                        <Steps.Separator
                        _complete={{
                            backgroundColor: "var(--chakra-colors-primary)",
                        }}
                        />
                    </Steps.Item>
                    ))}
                </Steps.List>

                <Separator />
            
                <Steps.Content index={0}>
                    <ReinstatementForm lapsedPlans={lapsedPlans} onCheckedPlansChange={(selected) => {
                        setCheckedPlans(selected);
                    }}/>
                </Steps.Content>
                <Steps.Content index={1}>
                    <ReinstatementSummaryPage selectedPlans={checkedPlans} onSubmit={() => {}} onBack={() => {}} />
                </Steps.Content>
                <Steps.Content index={2}>
                    <PaymentPage/>
                </Steps.Content>
                <Steps.CompletedContent>
                    
                </Steps.CompletedContent>

                <Flex justifyContent={"space-between"}>
                    <Steps.PrevTrigger asChild>
                        {step < 3 && <PreviousButton />}
                    </Steps.PrevTrigger>
                    <Steps.NextTrigger asChild>
                        {step < 2 && (
                            <NextButton disabled={step === 0 && checkedPlans.length === 0}/>
                        )}
                    </Steps.NextTrigger>
                </Flex>
            </Steps.Root>
        </Box>
    );
}