import { Box, Container, Separator, Steps } from "@chakra-ui/react";
import { RIProps } from "./reinstatement.types";
import { Body, H3 } from "st-peter-ui";
import { useState } from "react";
import { ReinstatementForm } from "./reinstatement-form";
import { lapsedPlans } from "./data";

const steps = ["Select Lapsed Plan", "Review Reinstatement", "Payment"]

export function ReinstatementPage({onClickHome, onClickTrack} : RIProps){
    const [step, setStep] = useState(0)
    
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
            >
                <Steps.List>
                    {steps.map((step, index) => (
                    <Steps.Item key={index} index={index} title={step}>
                        <Steps.Indicator
                        _current={{
                            backgroundColor: "var(--chakra-colors-primary-disabled)/50",
                            borderColor: "var(--chakra-colors-primary)",
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
                    <ReinstatementForm lapsedPlans={lapsedPlans}/>
                </Steps.Content>
            </Steps.Root>
        </Box>
    );
}