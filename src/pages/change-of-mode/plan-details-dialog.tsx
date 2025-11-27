"use client";
import {
  Dialog,
  Portal,
  HStack,
  RadioCard,
  Flex,
  Heading,
  Box,
  SimpleGrid,
  Stack,
  CloseButton,
} from "@chakra-ui/react";
import { InputFloatingLabel } from "st-peter-ui";
import type { PlanDetails } from "./change-mode.types";
import { PlanTypes } from "./data";
import { useEffect, useMemo, useRef, useState } from "react";

const modes = ["Monthly", "Quarterly", "Semi-Annual", "Annual"];

export function PlanDetailsDialog( {plan} : {plan: PlanDetails} ) {
    const [value, setValue] = useState(plan.mode);
    const plans = useMemo(
        () => PlanTypes.filter((type) => type.description === plan.plan_type),
        [plan.plan_type]
    );

    const prevPlan = useMemo(
        () => PlanTypes.filter((type) => type.description === plan.plan_type).findLast((type) => type.mode === plan.mode),
        [plan.plan_type]
    );

    const [newMode, setNewMode] = useState(plan.mode);
    const [newInstNo, setNewInstNo] = useState(plan.installment_no);
    const [newBalance, setNewBalance] = useState(plan.balance);
    const [newInstAmt, setNewInstAmt] = useState(plan.installment_amount);
    const [newTAP, setNewTAP] = useState(plan.total_amount_paid + newBalance);

    useEffect(() => {
        const selected = plans.findLast((type) => type.mode === value) ?? plans[0];

        const _oldInstNo = 
            plan.mode === "Monthly" ? 60 - plan.installment_no : 
            plan.mode === "Quarterly" ? 20 - plan.installment_no : 
            plan.mode === "Semi-Annual" ? 10 - plan.installment_no : 
            plan.mode === "Annual" ? 5 - plan.installment_no : 0;
            console.log("oldInstNo: ", _oldInstNo, plan.installment_no);
        const _newMode = 
            selected?.mode === "Monthly" ? 1 :    
            selected?.mode === "Quarterly" ? 3 :    
            selected?.mode === "Semi-Annual" ? 6 :    
            selected?.mode === "Annual" ? 12 : 0;
            console.log("newMode: ", _newMode);
        const _newInstNo = _oldInstNo / _newMode; 
            console.log("newInstNo: ", _newInstNo);
        const _newRemInstNo = selected?.mop ?? 0 - _newInstNo;
            console.log("newRemInstNo: ", _newRemInstNo);
        const _newInstAmt = selected?.installment_amount;
            console.log("newInstAmt: ", _newInstAmt);
        const _newBalance = _newInstAmt?? 0 * _newRemInstNo;
            console.log("newBal: ", _newBalance);
        const _newTap = plan.total_amount_paid + _newBalance;
            console.log("newTAP: ", _newTap);

        setNewMode(selected?.mode ?? "");
        setNewInstNo(selected?.installment_no ?? 0 - _newInstNo);
        setNewInstAmt(_newInstAmt?? 0);
        setNewBalance(_newBalance);  
        setNewTAP(_newTap);
    }, [value, plans]);

    return (
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Plan Details</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        {/* Mode selector */}
                        <RadioCard.Root
                        variant="subtle"
                        value={value}
                        onValueChange={(e) => setValue(e.value ?? "")}
                        mx={1}
                        mb={5}
                        >
                        <RadioCard.Label>Mode of Payment</RadioCard.Label>
                        <HStack align="stretch">
                            {modes.map((item, index) => (
                            <RadioCard.Item key={index} value={item} disabled={(prevPlan?.mop ?? 0) > index}>
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl
                                _checked={{
                                    backgroundColor:
                                    "var(--chakra-colors-primary-disabled)/50",
                                    borderColor: "var(--chakra-colors-primary)",
                                    borderWidth: "1px",
                                    color: "var(--chakra-colors-primary-hover)",
                                }}
                                _disabled={{
                                    borderColor: "dangerHover",
                                    backgroundColor: "dangerDisabled",
                                    color: "danger",
                                    _checked: {
                                        backgroundColor:
                                        "var(--chakra-colors-primary-disabled)/50",
                                        borderColor: "var(--chakra-colors-primary)",
                                        borderWidth: "1px",
                                        color: "var(--chakra-colors-primary-hover)",
                                    }
                                }}
                                >
                                <RadioCard.ItemText>{item}</RadioCard.ItemText>
                                <RadioCard.ItemIndicator
                                    _checked={{
                                    color: "var(--chakra-colors-primary)",
                                    borderColor: "var(--chakra-colors-primary)",
                                    }}
                                />
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                            ))}
                        </HStack>
                        </RadioCard.Root>

                        {/* Plan details layout */}
                        <Stack direction={{ base: "column", md: "row" }} pt={3}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} px={1} w="full">
                            {/* LEFT COLUMN */}
                            <Box px={3} pt={3}>
                            <Heading size="lg" textAlign="center">
                                Current Mode
                            </Heading>

                            <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                gap={2}
                            >
                                <PlanDetailRow label="Mode" value={plan.mode} />
                                <PlanDetailRow
                                label="Total Amount Payable"
                                value={formatMoney(plan.total_amount_payable)}
                                />
                            </Flex>
                            <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                gap={2}
                            >
                                <PlanDetailRow
                                label="Total Amount Paid"
                                value={formatMoney(plan.total_amount_paid)}
                                />
                                <PlanDetailRow
                                label="Installment No."
                                value={String(plan.installment_no)}
                                />
                            </Flex>
                            <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                gap={2}
                            >
                                <PlanDetailRow
                                label="Balance"
                                value={formatMoney(plan.balance)}
                                />
                                <PlanDetailRow
                                label="Installment Amount"
                                value={formatMoney(plan.installment_amount)}
                                />
                            </Flex>
                            </Box>

                            {/* RIGHT COLUMN */}
                            <Box
                            px={3}
                            pt={3}
                            bg="gray.50"
                            border="1px solid #ddd"
                            borderRadius="md"
                            >
                            <Heading size="lg" textAlign="center">
                                After Change of Mode
                            </Heading>

                            <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                gap={2}
                            >
                                <PlanDetailRow label="New Mode" value={newMode} />
                                <PlanDetailRow
                                label="New TAP"
                                value={formatMoney(newTAP)}
                                />
                            </Flex>
                            <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                gap={2}
                            >
                                <PlanDetailRow
                                label="Total Amount Paid"
                                value={formatMoney(plan.total_amount_paid)}
                                />
                                <PlanDetailRow
                                label="New Installment No."
                                value={String(newInstNo)}
                                />
                            </Flex>
                            <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                gap={2}
                            >
                                <PlanDetailRow
                                label="New Balance"
                                value={formatMoney(newBalance)}
                                />
                                <PlanDetailRow
                                label="New Installment Amount"
                                value={formatMoney(newInstAmt)}
                                />
                            </Flex>
                            </Box>
                        </SimpleGrid>
                        </Stack>
                    </Dialog.Body>

                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    );
}

function PlanDetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Flex justify="space-between" my={3} gap={2}>
      <InputFloatingLabel name="" label={label} value={value} readOnly />
    </Flex>
  );
}

function formatMoney(num: number) {
  return (
    "₱ " +
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
