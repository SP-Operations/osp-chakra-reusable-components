"use client";
import { 
  Box,
  Flex,
  Text,
  Card,
  VStack,
  Span,
  Icon,
  Grid,
  Separator,
} from "@chakra-ui/react";
import React from "react";
import { LuClipboardCheck, LuReceiptText } from "react-icons/lu";
import { Body, H4, Small } from "st-peter-ui";
import type { CheckedPlanType } from "./change-mode.types";

interface CheckedPlan {
  lpaNo: string;
  planType: string;
  isFullyPaid: boolean;
  reinstatementFee: number;
  reinstatementPayment: number;
}

interface RevRIProps {
  selectedPlans: CheckedPlanType[] | undefined;
  onSubmit: () => void;
  onBack: () => void;
}

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <VStack gap={1} align="start" minW={0}>
    <Small color="gray.500">{label}</Small>
    <Body>
      <Span fontWeight="semibold">{value}</Span>
    </Body>
  </VStack>
);

const SectionCardHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <Flex align="center" gap={2}>
    <Icon boxSize={5}>{icon}</Icon>
    <H4>{title}</H4>
  </Flex>
);

export function ChangeModeSummaryPage({
  selectedPlans,
  onSubmit,
  onBack,
}: RevRIProps) {
  if (!selectedPlans) return;
  const totalCMFee = selectedPlans.reduce((sum) => sum + 100, 0);
  const totalInstPayment = selectedPlans.reduce((sum, p) => sum + p.new_installment_amount + p.pending_installment_amount, 0);
  const totalDue = totalCMFee + totalInstPayment;

  console.log("Selected Plans in Review Page:", selectedPlans);

  return (
    <Box px={0}>
        <Card.Root
        bg="white"
        shadow="sm"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
      >
        <Card.Header py={4} px={6} borderBottomWidth="1px">
            <SectionCardHeader
                icon={<LuClipboardCheck />}
                title="Reinstatement Summary"
            />
            </Card.Header>
            <Card.Body px={6} py={5}>
                {selectedPlans.map((plan, index) => (
                    <React.Fragment key={plan.lpa_no}>
                    <Grid my={2} templateColumns={{ base: "1fr", md: "repeat(4,1fr)" }} gap={6}>
                        <InfoItem label="LPA Number" value={plan.lpa_no} />  
                        <InfoItem label="Plan Code" value={plan.new_plan_code} />
                        <InfoItem label="Installment Payment" value={`₱ ${plan.new_installment_amount.toLocaleString()}`} />
                        <InfoItem label="Change Mode Fee" value={`₱ 100`} />
                        {plan.pending_installment != 0 && <>
                        <InfoItem label="Pending Installment" value={plan.pending_installment} />
                        <InfoItem label="Pending Installment Amount" value={`₱ ${plan.pending_installment_amount.toLocaleString()}`} />
                        </>}
                    </Grid>
                    {index < selectedPlans.length -1 && <Separator/>}
                    </React.Fragment>
                ))}
                {/* Total Payable */}
                <Flex
                    borderTop="1px solid"
                    borderColor="gray.200"
                    pt={5}
                    mt={0}
                    justify="space-between"
                    align="center"
                >
                    <Flex align="center" fontWeight="bold" color="gray.700">
                        <LuReceiptText style={{ marginRight: 8 }} />
                        Total Payable Amount
                    </Flex>

                    <Text fontWeight="bold" color={"gray.800"}>
                        ₱{" "}
                        {totalDue.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        })}
                    </Text>
                </Flex>
            </Card.Body>
        </Card.Root>
    </Box>
  );
}
