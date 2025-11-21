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
  Stack,
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
import { SuccessPage } from "../success-page/SuccessPage";

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
      <Steps.Root defaultStep={1} count={stepper.length} colorPalette={"green"}>
        {step < 3 && (
          <Steps.List mb="8">
            {stepper.map((step, index) => (
              <Steps.Item key={index} index={index} title={step.title}>
                <Steps.Indicator />
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
        )}

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
                    // onClick={() => {
                    //   //   setIsSuccessModalOpen(true);
                    // }}
                    onClick={nextStep}
                  >
                    Submit
                  </Button>
                </Steps.NextTrigger>
              </Flex>
            )}
          </VStack>
        )}
      </Steps.Root>
      {/* Step 3: Success/Confirmation */}
      {step === 3 && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box>
            <SuccessPage
              title="ROP Successfully Submitted"
              content={
                <>
                  <Text>
                    Your ROP Transaction has been successfully submitted.
                  </Text>
                  <Text wordBreak="break-word">
                    The reference number for your ROP is{" "}
                    <strong>ROP{Math.floor(Math.random() * 1000000000)}</strong>
                    . Please keep this number safe, as you will need it for any
                    future inquiries, updates, or correspondence regarding this
                    ROP. You may also use it to track the status of your ROP
                    through our customer service or online portal.
                  </Text>
                </>
              }
              footer={
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Stack direction="row" gap="10px">
                    <Button variant="outline">Home</Button>
                    <Button variant="solid">Track</Button>
                  </Stack>
                </Box>
              }
            />
          </Box>
        </Box>
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
    </Box>
  );
}
