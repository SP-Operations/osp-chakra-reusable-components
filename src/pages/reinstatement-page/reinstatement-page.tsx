import { Box, Container, Flex, Separator, Steps } from "@chakra-ui/react";
import type { CheckedPlan, RIProps } from "./reinstatement.types";
import { Body, H3, NextButton, PreviousButton } from "st-peter-ui";
import { useState } from "react";
import { ReinstatementForm } from "./reinstatement-form";
import { lapsedPlans } from "./data";
import { ReinstatementSummaryPage } from "./ri-summary";
import PaymentPage from "./payment";
import { SuccessPage } from "../success-page/SuccessPage";

const steps = ["Select Lapsed Plan", "Review Reinstatement", "Payment"]

export function ReinstatementPage({onClickHome, onClickTrack} : RIProps){
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
                    Bring your plan back on track with ease. The Reinstatement option
                    lets you reactivate a lapsed plan so you can continue enjoying your
                    benefits and resume payments smoothly.
                </Body>
            </Container>
            <Steps.Root
            step={step}
            onStepChange={(e) => setStep(e.step)}
            count={steps.length}
            my={5}
            onStepComplete={() => alert("Reinstatement Applications Successfully Submitted")}
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
                    <SuccessPage
                    title="Reinstatement Successfully Submitted"
                    description="Your application has been successfully submitted."
                    transactionId={`RI-${Math.floor(Math.random() * 1000000000)}`}
                    totalAmount={"₱ " + totalDue.toLocaleString()}
                    dateTime={new Date().toLocaleString()}
                    variant="payment"
                    onClickHome={onClickHome}
                    onClickProceed={onClickTrack}
                    />
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