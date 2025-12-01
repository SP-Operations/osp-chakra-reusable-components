"use client"
import { Box, Flex, Table } from "@chakra-ui/react";
import { useState } from "react";
import { H4, Small, Body, Checkbox, SecondarySmButton } from "st-peter-ui";
import { CheckedPlan, PhLapsedPlan } from "./reinstatement.types";

export function ReinstatementForm({ lapsedPlans }: { lapsedPlans: PhLapsedPlan[] }) {
    const [checkedPlans, setCheckedPlans] = useState<CheckedPlan[]>([{
        lpaNo: "L23956088F",
        planType: "St. Gregory",
        isFullyPaid: false,
        reinstatementFee: 500,
        reinstatementPayment: 1100
    }])
    const indeterminate = checkedPlans.length > 0 && checkedPlans.length < lapsedPlans.length

    return (
        <Box py={3}>
            <Flex justify={"space-between"}>
                <Box>
                    <H4>Lapsed Plans</H4>
                    <Small mb="4" fontStyle={"italic"}>
                        Kindly select plans you want to reinstate.
                    </Small>
                </Box>
                <Box textAlign={"right"}>
                  <Body fontSize="sm" fontStyle={"italic"}>
                    No. of plans selected:
                  </Body>
                  <H4>
                    {checkedPlans.length}/{lapsedPlans.length}
                  </H4>
                </Box>
            </Flex>
            <Table.ScrollArea maxH={"350px"}>
                <Table.Root size={"sm"} stickyHeader interactive>
                    <Table.Header>
                        <Table.Row bg={"bg.subtle"}>
                            <Table.ColumnHeader w={6}>
                                <Checkbox 
                                checked={indeterminate ? "indeterminate" : checkedPlans.length > 0} 
                                onCheckedChange={(changes) => {

                                }} />
                            </Table.ColumnHeader>
                            <Table.ColumnHeader>LPA Number</Table.ColumnHeader>
                            <Table.ColumnHeader>Plan Type</Table.ColumnHeader>
                            <Table.ColumnHeader>Mode</Table.ColumnHeader>
                            <Table.ColumnHeader>Due Date</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign={"end"}>Actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {lapsedPlans.length === 0 ? (
                            <Table.Row>
                                <Table.Cell textAlign={"center"} colSpan={6} py={5}>No lapsed plans available for reinstatement.</Table.Cell>
                            </Table.Row>
                        ) : (
                            lapsedPlans.map((plan, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <Checkbox 
                                        checked={checkedPlans.filter((chk) => chk.lpaNo === plan.lpaNo).length > 0}
                                        onCheckedChange={(changes) => {
                                            setCheckedPlans(prev => {
                                                if (changes.checked) {
                                                    if (!prev.some(p => p.lpaNo === plan.lpaNo)) {
                                                        return [...prev, plan];
                                                    }
                                                    return prev;
                                                }

                                                return prev.filter(p => p.lpaNo !== values.lpaNo);
                                            });
                                        }} />
                                    </Table.Cell>
                                    <Table.Cell>{plan.lpaNo}</Table.Cell>
                                    <Table.Cell>{plan.planType}</Table.Cell>
                                    <Table.Cell>{plan.mop}</Table.Cell>
                                    <Table.Cell>{plan.duedate}</Table.Cell>
                                    <Table.Cell textAlign={"end"}><SecondarySmButton>View Details</SecondarySmButton></Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        </Box>
    );
}