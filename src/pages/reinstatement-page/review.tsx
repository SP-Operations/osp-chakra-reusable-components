"use client";
import { 
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuReceiptText } from "react-icons/lu";

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
    <Box px={10}>
        <Heading size="md" textAlign="center" mb={10}>
          Review Reinstatement
        </Heading>
        {selectedPlans.map((plan) => (
            <Box
                key={plan.lpaNo}
                borderBottom="1px solid"
                borderColor="gray.200"
                mb={6}
                pb={4}
            >
                <Box>
                    <Text fontWeight="bold" mb={2}>
                        LPA NO.: {plan.lpaNo}
                    </Text>

                    <Flex justify="space-between" mb={2}>
                        <Text color="gray.600">Plan Type</Text>
                        <Text>{plan.planType}</Text>
                    </Flex>

                    <Flex justify="space-between" mb={2}>
                        <Text color="gray.600">Reinstatement Payment</Text>
                        <Text>
                        ₱{" "}
                        {plan.reinstatementPayment.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" mb={2}>
                        <Text color="gray.600">Reinstatement Fee</Text>
                        <Text>
                        ₱{" "}
                        {plan.reinstatementFee.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        </Text>
                    </Flex>
                    <Flex justify="space-between" mb={2}>
                        <Text color="gray.600">Full Payment</Text>
                        <Text>{plan.isFullyPaid ? "Yes" : "No"}</Text>
                    </Flex>
                </Box>
            </Box>
            ))
        }
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

            <Text fontWeight="bold">
                ₱{" "}
                {totalDue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })}
            </Text>
        </Flex>
    </Box>
    
    



    // <Card.Root w="full" p={6} borderRadius="lg" shadow="md">
    //   <CardBody>
    //     <Heading size="md" textAlign="center" mb={10}>
    //       Review Reinstatement
    //     </Heading>

    //     {riPlans.map((plan) => (
    //       <Box
    //         key={plan.lpaNo}
    //         borderBottom="1px solid"
    //         borderColor="gray.200"
    //         mb={6}
    //         pb={4}
    //       >
    //         <Box>
    //           <Text fontWeight="bold" mb={2}>
    //             LPA NO.: {plan.lpaNo}
    //           </Text>

    //           <Flex justify="space-between" mb={2}>
    //             <Text color="gray.600">Plan Type</Text>
    //             <Text>{plan.planType}</Text>
    //           </Flex>

    //           <Flex justify="space-between" mb={2}>
    //             <Text color="gray.600">Reinstatement Payment</Text>
    //             <Text>
    //               ₱{" "}
    //               {plan.reinstatementPayment.toLocaleString("en-US", {
    //                 minimumFractionDigits: 2,
    //                 maximumFractionDigits: 2,
    //               })}
    //             </Text>
    //           </Flex>

    //           <Flex justify="space-between" mb={2}>
    //             <Text color="gray.600">Reinstatement Fee</Text>
    //             <Text>
    //               ₱{" "}
    //               {plan.reinstatementFee.toLocaleString("en-US", {
    //                 minimumFractionDigits: 2,
    //                 maximumFractionDigits: 2,
    //               })}
    //             </Text>
    //           </Flex>
    //         </Box>
    //       </Box>
    //     ))}

    //     {/* Total Payable */}
    //     <Flex
    //       borderTop="1px solid"
    //       borderColor="gray.200"
    //       pt={5}
    //       mt={10}
    //       justify="space-between"
    //       align="center"
    //     >
    //       <Flex align="center" fontWeight="bold" color="gray.700">
    //         <LuReceiptText style={{ marginRight: 8 }} />
    //         Total Payable Amount
    //       </Flex>

    //       <Text fontWeight="bold">
    //         ₱{" "}
    //         {totalDue.toLocaleString("en-US", {
    //           minimumFractionDigits: 2,
    //           maximumFractionDigits: 2,
    //         })}
    //       </Text>
    //     </Flex>
    //   </CardBody>
    // </Card.Root>
  );
}
