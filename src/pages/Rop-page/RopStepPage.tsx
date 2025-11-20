"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Dialog,
  Flex,
  Heading,
  HStack,
  Portal,
  Steps,
  StepsCompletedContent,
  Text,
  VStack,
} from "@chakra-ui/react";
import type {
  ButtonParams,
  DocumentItem,
  IRopSchema,
} from "../../models/types/rop.types";
import PayoutChannelForm from "../../components/forms/PayoutChannelForm";
import ROPApplicationDetails from "../../components/others/RopApplicationDetails";
import { PrimaryMdButton } from "st-peter-ui";
import { stepper } from "../../models/schema/RopMock";

export function RopStepPage({ children, onClick }: ButtonParams) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<IRopSchema[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedRows");
    if (stored) setSelectedRows(JSON.parse(stored));
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const docs: DocumentItem[] = [
    { id: "deposit", label: "Deposit Slip/ E-wallet" },
    { id: "govID", label: "Government-issued ID" },
    { id: "signature", label: "Specimen Signature" },
  ];

  return (
    <Box
      maxW="3xl"
      w="full"
      mx="auto"
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="sm"
    >
      <Steps.Root defaultStep={1} count={stepper.length} size="sm">
        <Steps.List mb="8">
          {stepper.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        {/* Step 1: Payout Channel */}
        {step === 1 && (
          <VStack align="start">
            <Heading size="md">
              {mode === "existing"
                ? "Select Payout Channel"
                : "Register Payout Channel"}
            </Heading>
            {mode === "new" && (
              <Text
                fontSize="sm"
                color="gray.500"
                borderBottom="1px solid"
                borderColor="gray.200"
                display="block"
                w="full"
                pb={2}
              >
                Kindly upload the required documents and register your preferred
                payout channel.
              </Text>
            )}
            <PayoutChannelForm mode={mode} setMode={setMode} document={docs} />
            {mode === "existing" && (
              <Flex justify="flex-end" w="full" px="4">
                <Steps.NextTrigger asChild>
                  <PrimaryMdButton onClick={nextStep}>Next</PrimaryMdButton>
                </Steps.NextTrigger>
              </Flex>
            )}
          </VStack>
        )}

        {/* Step 2: ROP Application Details */}
        {step === 2 && (
          <VStack align="start">
            <ROPApplicationDetails
              data={selectedRows}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            {!isEditing && (
              <Flex justify="space-between" w="full" pt={4}>
                <Steps.PrevTrigger asChild>
                  <Button colorScheme="gray" onClick={prevStep}>
                    Back
                  </Button>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      //   setIsSuccessModalOpen(true);
                    }}
                  >
                    Submit
                  </Button>
                </Steps.NextTrigger>
              </Flex>
            )}
          </VStack>
        )}

        {/* Step 3: Success/Confirmation */}
        {step === 3 && (
          <Flex justify="center" align="center" w="full" py={10}>
            <Box
              bg="white"
              p={8}
              maxW="md"
              w="full"
              textAlign="center"
              borderRadius="md"
              shadow="md"
            >
              <Heading size="md" mb={4}>
                Please Check your email
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={1}>
                Thank you for submitting your return of premium application.
              </Text>
              <Text fontSize="sm" color="gray.600" mb={6}>
                We will evaluate this and notify you about the status via email
                and SMS.
              </Text>
              <Box mb={6}>
                <Text fontSize="sm" fontWeight="medium" color="gray.800">
                  ROP Application No.:
                </Text>
                <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                  ROPESTORE2025123456
                </Text>
              </Box>
              <Button colorScheme="gray" onClick={onClick}>
                Go to Home Page
              </Button>
            </Box>
          </Flex>
        )}

        {/* Alert Modal */}
        <HStack>
          <Dialog.Root open={isSuccessModalOpen} size="md">
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Request Submitted!</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Text>
                      Your Return of premium request has been successfully
                      submitted.
                    </Text>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline" onClick={onClick}>
                        Close
                      </Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </HStack>
      </Steps.Root>
    </Box>
  );
}
