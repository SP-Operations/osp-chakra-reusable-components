import { Box, Flex, Table } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { H4, Small, Body, Checkbox } from "st-peter-ui";
import type { CheckedPlan, PhLapsedPlan } from "./reinstatement.types";
import { RITableRow } from "./ri-table-row";

export function ReinstatementForm({
  lapsedPlans,
  onCheckedPlansChange,
}: {
  lapsedPlans: PhLapsedPlan[];
  onCheckedPlansChange?: (checked: CheckedPlan[]) => void;
}) {
  const [checkedPlans, setCheckedPlans] = useState<CheckedPlan[]>([]);

  const indeterminate =
    checkedPlans.length > 0 && checkedPlans.length < lapsedPlans.length;

  const TotalAmountDue = useRef<HTMLSpanElement>(null);
  const TotalRIPayment = useRef<HTMLSpanElement>(null);
  const TotalRIFee = useRef<HTMLSpanElement>(null);

  // -----------------------------
  // 1. Child row change handler
  // -----------------------------
  const handleCheckedChange = (checked: boolean, values: CheckedPlan) => {
    setCheckedPlans((prev) => {
      if (checked) {
        if (!prev.some((p) => p.lpaNo === values.lpaNo)) {
          return [...prev, values];
        }
        return prev;
      }
      return prev.filter((p) => p.lpaNo !== values.lpaNo);
    });
  };

  // -----------------------------
  // 2. Parent callback is ALWAYS here
  // -----------------------------
  useEffect(() => {
    onCheckedPlansChange?.(checkedPlans);
  }, [checkedPlans]);

  // -----------------------------
  // 3. Update totals
  // -----------------------------
  useEffect(() => {
    let totalDue = 0;
    let totalRIPayment = 0;
    let totalRIFee = 0;

    checkedPlans.forEach((plan) => {
      totalRIPayment += plan.reinstatementPayment;
      totalRIFee += plan.reinstatementFee;
      totalDue += plan.reinstatementFee + plan.reinstatementPayment;
    });

    if (TotalRIPayment.current) {
      TotalRIPayment.current.innerText = totalRIPayment.toLocaleString(
        undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      );
    }
    if (TotalRIFee.current) {
      TotalRIFee.current.innerText = totalRIFee.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    if (TotalAmountDue.current) {
      TotalAmountDue.current.innerText = totalDue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }, [checkedPlans]);

  return (
    <Box py={3}>
      <Flex justify="space-between">
        <Box>
          <H4>Lapsed Plans</H4>
          <Small mb="4" fontStyle="italic">
            Kindly select plans you want to reinstate.
          </Small>
        </Box>
        <Box textAlign="right">
          <Body fontSize="sm" fontStyle="italic">
            No. of plans selected:
          </Body>
          <H4>
            {checkedPlans.length}/{lapsedPlans.length}
          </H4>
        </Box>
      </Flex>

      <Table.ScrollArea maxH="450px">
        <Table.Root size="sm" stickyHeader interactive>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader w={6}>
                <Checkbox
                  checked={
                    indeterminate ? "indeterminate" : checkedPlans.length > 0
                  }
                  onCheckedChange={(changes) => {
                    if (changes.checked) {
                      const all: CheckedPlan[] = lapsedPlans.map((plan) => ({
                        lpaNo: plan.lpaNo,
                        planType: plan.planType,
                        isFullyPaid: false,
                        reinstatementFee: 500,
                        reinstatementPayment: parseFloat(plan.newInstAmt),
                      }));
                      setCheckedPlans(all);
                    } else {
                      setCheckedPlans([]);
                    }
                  }}
                />
              </Table.ColumnHeader>

              <Table.ColumnHeader>LPA Number</Table.ColumnHeader>
              <Table.ColumnHeader>Plan Type</Table.ColumnHeader>
              <Table.ColumnHeader>Mode</Table.ColumnHeader>
              <Table.ColumnHeader>Due Date</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {lapsedPlans.length === 0 ? (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan={6} py={5}>
                  No lapsed plans available for reinstatement.
                </Table.Cell>
              </Table.Row>
            ) : (
              lapsedPlans.map((plan) => (
                <RITableRow
                  key={plan.lpaNo}
                  plan={plan}
                  checked={checkedPlans.some(
                    (pln) => pln.lpaNo === plan.lpaNo
                  )}
                  onChanged={handleCheckedChange}
                />
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      {/* Totals */}
      <Box
        width="full"
        p={2}
        bg="gray.subtle"
        display="flex"
        alignItems="center"
        borderBottomLeftRadius="sm"
        borderBottomEndRadius="sm"
        justifyContent={{ base: "flex-end", mdDown: "space-between" }}
      >
        <Box>
          <Body mr={5}>Reinstatement Payment:</Body>
          <Body mr={5}>Reinstatement Fee:</Body>
          <Body mr={5}>Total Amount Due:</Body>
        </Box>
        <Box>
          <Body fontWeight="bold" mr={5} textAlign="right">
            ₱ <span ref={TotalRIPayment}>0.00</span>
          </Body>
          <Body fontWeight="bold" mr={5} textAlign="right">
            ₱ <span ref={TotalRIFee}>0.00</span>
          </Body>
          <Body fontWeight="bold" mr={5} textAlign="right">
            ₱ <span ref={TotalAmountDue}>0.00</span>
          </Body>
        </Box>
      </Box>
    </Box>
  );
}
