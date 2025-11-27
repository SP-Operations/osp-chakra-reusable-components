"use client";
import {
  Box,
  Dialog,
  Container,
  Flex,
  Heading,
  Portal,
  SimpleGrid,
  Stack,
  Steps,
  Text,
  VStack,
  CloseButton,
  RadioCard,
  HStack,
  Breadcrumb,
  Separator,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  ListItem,
  ListItemColumn,
  ListItemColumnButton,
  ListItemColumnDialog
} from "../../components/list-item/list-item";
import type { PlanDetails } from "./change-mode.types";
// import { InputFloatingLabel } from "../components/input/input-floating-label";
import { PHPlans } from "./data";
import { PlanDetailsDialog } from "./plan-details-dialog";
import { Body, H3, H4, Small } from "st-peter-ui";

export function ChangeModePage() {
  const [phPlans] = useState<PlanDetails[]>(PHPlans);
  const [checkedPlans, setCheckedPlans] = useState<PlanDetails[]>([]);
  const [step, setStep] = useState(0);

  const handleCheckedChange = (checked: boolean, values: PlanDetails) => {
    setCheckedPlans((prev) => {
      if (checked) {
        if (!prev.some((p) => p.lpa_no === values.lpa_no)) {
          return [...prev, values];
        }
        return prev;
      }

      return prev.filter((p) => p.lpa_no !== values.lpa_no);
    });
  };

  return (
    <Box maxW={"7xl"} mx={"auto"} my={0} px={0}>
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Plan Management</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Change of Mode</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Box mb={4} mt={6}>
        <H3>
          Change of Mode Application
        </H3>
        <Body color="gray.600" mt={1}>
          Switch your payment mode anytime—Quarterly, Semi-Annual, or Annual.
        </Body>
      </Box>

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

        <Separator variant={"solid"} />

        {/* Step 1: Select Lapsed Plans */}
        <Steps.Content key={1} index={0}>
          <Box py={6} >
            <Flex justify={"space-between"}>
              <Box>
                <H4>Active Plans</H4>
                <Small mb="4" fontStyle={"italic"}>
                  Kindly select plans you want to change mode.
                </Small>
              </Box>
              <Box textAlign={"right"}>
                <Text fontSize="sm" fontStyle={"italic"}>
                  No. of plans selected:
                </Text>
                <Heading size="lg">
                  {checkedPlans.length}/{phPlans.length}
                </Heading>
              </Box>
            </Flex>
            {phPlans.length === 0 ? (
              <Text
                textAlign={"center"}
                border={"1px solid #ddd"}
                p={10}
                borderRadius={"md"}
                fontStyle={"italic"}
                color={"gray-500"}
              >
                No plans available for change of mode.
              </Text>
            ) : (
              phPlans.map((plan, index) => (
                <ListItem
                key={index}
                selectable
                onCheckChange={(checked) => handleCheckedChange(checked, plan)}
                dialog={
                    <ListItemColumnDialog>
                        <PlanDetailsDialog plan={plan} />
                    </ListItemColumnDialog>
                }
                >
                    <ListItemColumn label="LPA Number" value={plan.lpa_no} triggerDialog />
                    <ListItemColumn label="Plan Type" value={plan.plan_type} triggerDialog />
                    <ListItemColumn label="Mode" value={plan.mode} triggerDialog />
                    <ListItemColumnButton label="Select Mode" triggerDialog />
                </ListItem>
              ))
            )}
          </Box>
          <Box
            width={"full"}
            padding={2}
            bg={"gray.100"}
            display={"flex"}
            alignItems={"center"}
            borderBottomLeftRadius={"md"}
            borderBottomEndRadius={"md"}
            justifyContent={"flex-end"}
          >
            <Box>
              <Text mr={5}>Installment Payment:</Text>
              <Text mr={5}>Change Mode Fee:</Text>
              <Text mr={5}>Total Amount Due:</Text>
            </Box>
            {/* <Box>
              <Heading size={"lg"} mr={5} textAlign={"right"}>
                ₱ <span ref={TotalRIPayment}>0.00</span>
              </Heading>
              <Heading size={"lg"} mr={5} textAlign={"right"}>
                ₱ <span ref={TotalRIFee}>0.00</span>
              </Heading>
              <Heading size={"lg"} mr={5} textAlign={"right"}>
                ₱ <span ref={TotalAmountDue}>0.00</span>
              </Heading>
            </Box> */}
          </Box>
        </Steps.Content>
      </Steps.Root>
    </Box>
  );
}

const steps = ["Select Plan", "Review Application", "Payment"];
