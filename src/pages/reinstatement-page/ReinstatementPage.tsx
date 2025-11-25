"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Checkbox,
  Input,
  Button,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

interface CheckedPlan {
  lpaNo: string;
  planType: string;
  reinstatementFee: number;
  reinstatementPayment: number;
}

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

interface RIProps {
  initialPlans: PhLapsedPlan[];
  onSubmit: (selectedPlans: CheckedPlan[]) => void;
}

export function ReinstatementPagee({
  initialPlans,
  onSubmit,
}: RIProps) {
  const RIFee = useRef<HTMLSpanElement>(null);
  const RIPayment = useRef<HTMLSpanElement>(null);
  const TotalAmountDue = useRef<HTMLSpanElement>(null);

  const [reinstateFullyPaid, setReinstateFullyPaid] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [checkedPlans, setCheckedPlans] = useState<CheckedPlan[]>([]);
  const [phLapsedPlans] = useState<PhLapsedPlan[]>(initialPlans || []);

  const selectedPlanData = phLapsedPlans?.find(
    (plan) => plan.lpaNo === selectedPlan
  );

  const {
    open: isErrorModalOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();

  const handleSelect = (plan: PhLapsedPlan, checked: boolean) => {
    if (checked) {
      const newItem: CheckedPlan = {
        lpaNo: plan.lpaNo,
        planType: plan.planType,
        reinstatementFee: 500,
        reinstatementPayment: reinstateFullyPaid
          ? plan.newBalance
            ? parseFloat(plan.newBalance)
            : 0
          : plan.newInstAmt
          ? parseFloat(plan.newInstAmt)
          : 0,
      };
      setCheckedPlans((prev) => [...prev, newItem]);
    } else {
      setCheckedPlans((prev) => prev.filter((p) => p.lpaNo !== plan.lpaNo));
    }
  };

  const handleReinstateFullyPaidChange = (checked: boolean) => {
    setReinstateFullyPaid(checked);
    setCheckedPlans((prev) =>
      prev.map((element) => {
        const plan = phLapsedPlans.find((p) => p.lpaNo === element.lpaNo);
        return {
          ...element,
          reinstatementPayment: checked
            ? plan?.newBalance
              ? parseFloat(plan.newBalance)
              : 0
            : plan?.newInstAmt
            ? parseFloat(plan.newInstAmt)
            : 0,
        };
      })
    );
  };

  useEffect(() => {
    const totalRIFee = checkedPlans.reduce(
      (sum, plan) => sum + plan.reinstatementFee,
      0
    );
    const totalRIPayment = checkedPlans.reduce(
      (sum, plan) => sum + plan.reinstatementPayment,
      0
    );
    const totalDue = totalRIFee + totalRIPayment;

    if (RIFee.current) RIFee.current.innerText = totalRIFee.toFixed(2);
    if (RIPayment.current) RIPayment.current.innerText =
      totalRIPayment.toFixed(2);
    if (TotalAmountDue.current)
      TotalAmountDue.current.innerText = totalDue.toFixed(2);
  }, [checkedPlans, reinstateFullyPaid]);

  const btnReinstate_OnClick = () => {
    if (checkedPlans.length === 0) onErrorOpen();
    else onSubmit(checkedPlans);
  };

  return (
    <Card.Root maxW="6xl" mx="auto" p={6} shadow="lg">
      <CardHeader textAlign="center">
        <Heading size="lg">Reinstatement</Heading>
        <Text color="gray.600" mt={2}>
          Bring your plan back on track with ease. The Reinstatement option lets
          you reactivate a lapsed plan so you can continue enjoying your benefits
          and resume payments smoothly.
        </Text>
      </CardHeader>

      <CardBody>
        {/* Plan Summary */}
        <Box
          borderWidth="1px"
          borderRadius="md"
          mb={6}
          bg="gray.50"
          maxH="150px"
          overflowY="auto"
        >
          {phLapsedPlans.length === 0 ? (
            <Text p={4} textAlign="center">
              No Lapsed Plan
            </Text>
          ) : (
            phLapsedPlans.map((plan) => (
              <HStack
                key={plan.lpaNo}
                p={3}
                justify="space-around"
                borderBottom="1px solid"
                borderColor="gray.200"
                cursor="pointer"
                bg={selectedPlan === plan.lpaNo ? "var(--chakra-colors-primary)/15" : "white"}
                _hover={{ bg: "gray.100" }}
                onClick={() => setSelectedPlan(plan.lpaNo)}
              >
                {/* <Checkbox.Control
                  onChange={(e) => handleSelect(plan, e.target.checked)}
                /> */}
                <Checkbox.Root colorPalette={"green"}>
                    <Checkbox.HiddenInput onChange={(e: any) => handleSelect(plan, e.target.checked)}/>
                    <Checkbox.Control></Checkbox.Control>
                </Checkbox.Root>
                <Text>{plan.lpaNo}</Text>
                <Text>{plan.phName}</Text>
                <Text>Mode: {plan.mop}</Text>
                <Text>Due: {plan.duedate}</Text>
              </HStack>
            ))
          )}
        </Box>

        <Stack direction={{ base: "column", md: "row" }} p={6}>
          {/* Current Plan */}
          <Box flex="1">
            <Heading size="md" textAlign="center" mb={4}>
              Current Plan
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} p={4}>
              <FormField label="LPA No." value={selectedPlanData?.lpaNo} />
              <FormField
                label="Account Status"
                value={selectedPlanData?.status}
              />
              <FormField
                label="Total Amount Payable"
                value={selectedPlanData?.totalAmtPayable}
              />
              <FormField
                label="Total Amount Paid"
                value={selectedPlanData?.totalAmtPaid}
              />
              <FormField label="Balance" value={selectedPlanData?.balance} />
              <FormField
                label="Installment Amount"
                value={selectedPlanData?.instAmt}
              />
            </SimpleGrid>

            <Checkbox.Root mt={4} colorPalette={"green"}>
                <Checkbox.HiddenInput onChange={(e: any) => handleReinstateFullyPaidChange(e.target.checked)}/>
                <Checkbox.Control ></Checkbox.Control>
                <Checkbox.Label {...( { children: null } as any )}>Reinstate Fully Paid</Checkbox.Label>
            </Checkbox.Root>
          </Box>

          {/* After Reinstatement */}
          <Box flex="1">
            <Heading size="md" textAlign="center" mb={4}>
              After Reinstatement
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} p={4}>
              <FormField label="LPA No." value={selectedPlanData?.newLpaNo} />
              <FormField
                label="New Account Status"
                value={selectedPlanData?.newStatus}
              />
              <FormField
                label="New Total Amount Payable"
                value={selectedPlanData?.newTotalAmtPayable}
              />
              <FormField
                label="Total Amount Paid"
                value={selectedPlanData?.newTotalAmtPaid}
              />
              <FormField
                label="Balance"
                value={selectedPlanData?.newBalance}
              />
              <FormField
                label="New Installment Amount"
                value={selectedPlanData?.newInstAmt}
              />
            </SimpleGrid>
          </Box>
        </Stack>

        {/* Payment Summary */}
        <Box
          mt={8}
          borderWidth="1px"
          borderColor={"var(--chakra-colors-primary)"}
          borderRadius="lg"
          p={5}
          bg={"var(--chakra-colors-primary)/15"}
          color="gray.700"
        >
          <Text>
            Applying for reinstatement requires the following payments:
          </Text>
          <VStack align="start" p={1} mt={2}>
            <Text>
              Reinstatement Fee: <strong>₱ <span ref={RIFee}>0</span></strong>
            </Text>
            <Text>
              Reinstatement Payment:{" "}
              <strong>₱ <span ref={RIPayment}>0</span></strong>
            </Text>
          </VStack>
          <Text fontWeight="bold" mt={3}>
            Total Amount Due: ₱ <span ref={TotalAmountDue}>0</span>
          </Text>
        </Box>

        <Button
          mt={6}
          colorScheme="blue"
          w="full"
          size="lg"
          onClick={btnReinstate_OnClick}
        >
          Reinstate
        </Button>
      </CardBody>
    </Card.Root>
  );
}

/** Reusable Input Field */
function FormField({
  label,
  value,
}: {
  label: string;
  value?: string | undefined;
}) {
  return (
    <Box m={1}>
      <Text fontSize="sm" color="gray.600" mb={1}>
        {label}
      </Text>
      <Input value={value || ""} readOnly bg="white" />
    </Box>
  );
}
