import { Text, Box, Card, Heading, Steps, Button, Stack, Container } from "@chakra-ui/react"
import { PrimaryMdButton, SecondaryMdButton } from "st-peter-ui"
import {RIPlanItem} from "./ri-item"
import { useRef, useEffect, useState } from "react";
import { LuCheck, LuFileText, LuFilePenLine, LuCreditCard } from "react-icons/lu";
import { ReviewReinstatementPage } from "./review";
import PaymentPage from "./payment";
import { SuccessPage } from "../success-page/SuccessPage";

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

interface CheckedPlan {
    lpaNo: string;
    planType: string;
    isFullyPaid: boolean;
    reinstatementFee: number;
    reinstatementPayment: number;
    }

interface RIProps {
  initialPlans: PhLapsedPlan[];
  onSubmit: (selectedPlans: CheckedPlan[]) => void;
}

export function RIPage({initialPlans, onSubmit}: RIProps) {
    const [phLapsedPlans] = useState<PhLapsedPlan[]>(initialPlans || []);
    const [checkedPlans, setCheckedPlans] = useState<CheckedPlan[]>([]);
    const TotalAmountDue = useRef<HTMLSpanElement>(null);
    const step1Next = useRef<HTMLButtonElement>(null);

    const handleCheckedChange = (checked: boolean, values: CheckedPlan) => {
        setCheckedPlans(prev => {
            if (checked) {
                if (!prev.some(p => p.lpaNo === values.lpaNo)) {
                    return [...prev, values];
                }
                return prev;
            }

            return prev.filter(p => p.lpaNo !== values.lpaNo);
        });
    };

    useEffect(() => {
        let totalDue = 0;
        checkedPlans.forEach(plan => {
            totalDue += plan.reinstatementFee + plan.reinstatementPayment;
        });
        if (TotalAmountDue.current)
            TotalAmountDue.current.innerText = totalDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if(step1Next.current)
            step1Next.current.disabled = checkedPlans.length === 0;
    }, [checkedPlans]);

    return (
      <Card.Root
        maxW={"7xl"}
        mx="auto"
        my="8"
        boxShadow={"sm"}
        boxShadowColor={"bg.muted"}
      >
        <Steps.Root defaultStep={1} count={4}>
          <Card.Header>
            <Card.Title fontSize={"2xl"} mx={"auto"}>
              Reinstatement Application
            </Card.Title>
            <Steps.List mt={2}>
              <Steps.Item
                index={1}
                title="reinstatement"
                colorPalette={"green"}
              >
                <Steps.Indicator>
                  <Steps.Status
                    incomplete={<LuFileText />}
                    complete={<LuCheck />}
                  />
                </Steps.Indicator>
                <Steps.Title>Select Lapsed Plans</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
              <Steps.Item index={2} title="review" colorPalette={"green"}>
                <Steps.Indicator>
                  <Steps.Status
                    incomplete={<LuFilePenLine />}
                    complete={<LuCheck />}
                  />
                </Steps.Indicator>
                <Steps.Title>Review Reinstatement</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
              <Steps.Item index={3} title="success" colorPalette={"green"}>
                <Steps.Indicator>
                  <Steps.Status
                    incomplete={<LuCreditCard />}
                    complete={<LuCheck />}
                  />
                </Steps.Indicator>
                <Steps.Title>Payment</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            </Steps.List>
            <Steps.Content index={1}>
              <Card.Description mx={"auto"} textAlign={"center"}>
                Bring your plan back on track with ease. The Reinstatement
                option lets you reactivate a lapsed plan so you can continue
                enjoying your benefits and resume payments smoothly.
              </Card.Description>
            </Steps.Content>
          </Card.Header>
          <Card.Body>
            <Steps.Content index={1}>
              <Box
                p="6"
                bg="gray.50"
                border={"1px solid #000"}
                borderRadius="md"
              >
                <Heading size="lg">Lapsed Plans</Heading>
                <Text fontSize="sm" mb="4" fontStyle={"italic"}>
                  Kindly select plans you want to reinstate.
                </Text>
                {phLapsedPlans.length === 0 ? (
                  <Text>No lapsed plans available for reinstatement.</Text>
                ) : (
                  phLapsedPlans.map((plan) => (
                    <RIPlanItem
                      key={plan.lpaNo}
                      plan={plan}
                      onChange={(checked, values) =>
                        handleCheckedChange(checked, values)
                      }
                    />
                  ))
                )}
              </Box>
            </Steps.Content>
            <Steps.Content index={2}>
              <ReviewReinstatementPage
                selectedPlans={checkedPlans}
                onBack={() => {}}
                onSubmit={() => {}}
              />
            </Steps.Content>
            <Steps.Content index={3}>
              <PaymentPage />
              {/* <ReviewReinstatementPage selectedPlans={checkedPlans} onBack={() => {}} onSubmit={() => {}}/> */}
            </Steps.Content>
            <Steps.CompletedContent width={"100%"}>
              <Container p={8} centerContent>
                <SuccessPage
                title="Claims Successfully Submitted"
                content={
                  <>
                    <Text>
                      Your Reinstatement Application has been successfully submitted.
                    </Text>
                    <Text wordBreak="break-word">
                      The reference number for your application is{" "}
                      <strong>
                        RI-{Math.floor(Math.random() * 1000000000)}
                      </strong>
                      . Please keep this number safe, as you will need it for
                      any future inquiries, updates, or correspondence regarding
                      this application. You may also use it to track the status of
                      your application through our customer service or online portal.
                    </Text>
                  </>
                }
                footer={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Stack direction="row" gap="10px">
                      <Button variant="outline">Home</Button>
                      <Button variant="solid">Track</Button>
                    </Stack>
                  </Box>
                }
              />
              </Container>
            </Steps.CompletedContent>
          </Card.Body>
          <Card.Footer>
            <Box
              width={"full"}
              padding={2}
              bg={"gray.200"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <Steps.Content index={1}>
                <Text mr={5}>Total Amount Due:</Text>
              </Steps.Content>
              <Steps.Content index={1}>
                <Heading size={"lg"} mr={5}>
                  ₱ <span ref={TotalAmountDue}>0.00</span>
                </Heading>
              </Steps.Content>
              <Steps.Content index={1}>
                <Steps.NextTrigger asChild>
                  <Button ref={step1Next}>Next</Button>
                </Steps.NextTrigger>
              </Steps.Content>
              <Steps.Content index={2}>
                <Steps.PrevTrigger asChild>
                  <SecondaryMdButton bg={"red"} mr={3}>
                    Back
                  </SecondaryMdButton>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                  <PrimaryMdButton>Proceed to Payment</PrimaryMdButton>
                </Steps.NextTrigger>
              </Steps.Content>
              <Steps.Content index={3}>
                <Steps.PrevTrigger asChild>
                  <SecondaryMdButton mr={3}>Back</SecondaryMdButton>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                  <PrimaryMdButton>Submit</PrimaryMdButton>
                </Steps.NextTrigger>
              </Steps.Content>
            </Box>
          </Card.Footer>
        </Steps.Root>
      </Card.Root>
    );
}