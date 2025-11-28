"use client";
import { 
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  Heading,
  Button,
  VStack,
  Span,
  Icon,
  Grid,
  Separator,
} from "@chakra-ui/react";
import { LuClipboardCheck, LuReceiptText } from "react-icons/lu";
import { SummaryLabel } from "../../components/others/SummaryLabel";
import { Body, H4, Small } from "st-peter-ui";

interface CheckedPlan {
  lpaNo: string;
  planType: string;
  isFullyPaid: boolean;
  reinstatementFee: number;
  reinstatementPayment: number;
}

interface RevRIProps {
  selectedPlans: CheckedPlan[];
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

export function ReviewReinstatementPage({
  selectedPlans,
  onSubmit,
  onBack,
}: RevRIProps) {
  const totalRIFee = selectedPlans.reduce((sum, p) => sum + p.reinstatementFee, 0);
  const totalRIPayment = selectedPlans.reduce((sum, p) => sum + p.reinstatementPayment, 0);
  const totalDue = totalRIFee + totalRIPayment;

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
                    <>
                    <Grid my={1} templateColumns={{ base: "1fr", md: "repeat(5,1fr)" }} gap={6}>
                        <InfoItem label="LPA Number" value={plan.lpaNo} />  
                        <InfoItem label="Plan Type" value={plan.planType} />
                        <InfoItem label="Reinstatement Payment" value={`₱ ${plan.reinstatementPayment.toLocaleString()}`} />
                        <InfoItem label="Reinstatement Fee" value={`₱ ${plan.reinstatementFee.toLocaleString()}`} />
                        <InfoItem label="Fully Paid" value={plan.isFullyPaid ? "Yes" : "No"} />
                    </Grid>
                    {index < selectedPlans.length -1 && <Separator/>}
                    </>
                ))}
                {/* Total Payable */}
                <Flex
                    borderTop="1px solid"
                    borderColor="gray.200"
                    pt={5}
                    mt={10}
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
