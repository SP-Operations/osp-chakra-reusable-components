"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
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
import {
  CancelButton,
  H2,
  H3,
  H4,
  NextButton,
  PreviousButton,
  PrimaryMdButton,
  SecondaryMdButton,
  Small,
  SubmitButton,
} from "st-peter-ui";
import { stepper } from "../../models/schema/RopMock";
import { SuccessPage } from "../success-page/SuccessPage";
import type { PageParams } from "../../models/types/claim.types";

export function RopStepPage({ onClickHome, onClickTrack }: PageParams) {
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
    <Box maxW="7xl" w="full" mx="auto">
      {step < 3 && (
        <Box mb="4">
          <Text fontSize={"2xl"} fontWeight={"semibold"}>
            Return of Premium
          </Text>
          <Small>File Your Premium, Quick & Simple</Small>
        </Box>
      )}
      <Steps.Root defaultStep={1} count={stepper.length} colorPalette={"green"}>
        {step < 3 && (
          <Steps.List mb="8">
            {stepper.map((step, index) => (
              <Steps.Item key={index} index={index} title={step.title}>
                <Steps.Indicator />
                <Steps.Title display={{ base: "block", mdDown: "none" }}>
                  {step.title}
                </Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
        )}

        {/* Step 1: Payout Channel */}
        {step === 1 && (
          <VStack align="start">
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              {mode === "existing"
                ? "Select Payout Channel"
                : "Register Payout Channel"}
            </Text>

            {mode === "new" ? (
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
            ) : (
              <Box
                color="gray.500"
                borderBottom="1px solid"
                borderColor="gray.200"
                display="block"
                w="full"
                pb={2}
              ></Box>
            )}
            <PayoutChannelForm mode={mode} setMode={setMode} document={docs} />
            {mode === "existing" && (
              <Flex justify="space-between" w="full" px="4">
                <PreviousButton onClick={() => window.history.back()} />

                <Steps.NextTrigger asChild>
                  <NextButton onClick={nextStep} />
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
                  <PreviousButton onClick={prevStep} />
                </Steps.PrevTrigger>
                <SubmitButton
                  onClick={() => {
                    setIsSuccessModalOpen(true);
                  }}
                  // onClick={nextStep}
                />
                {/* <Steps.NextTrigger asChild></Steps.NextTrigger> */}
              </Flex>
            )}
          </VStack>
        )}
      </Steps.Root>
      {/* Step 3: Success/Confirmation */}
      {step === 3 && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <SuccessPage
            title="ROP Successfully Submitted"
            description="Your application has been completed successfully. We will notify you via email or sms when there is an update."
            transactionId={"ROP" + Math.floor(Math.random() * 1000000000)}
            dateTime={new Date().toLocaleString()}
            variant="application"
            onClickHome={onClickHome}
            onClickProceed={onClickTrack}
          />
        </Box>
      )}

      {/* Alert Modal */}
      <HStack>
        <Dialog.Root
          open={isSuccessModalOpen}
          role="alertdialog"
          onOpenChange={(e) => setIsSuccessModalOpen(e.open)}
          size="md"
          placement={"center"}
        >
          <Portal>
            <Dialog.Backdrop zIndex={0} />
            <Dialog.Positioner zIndex={1}>
              <Dialog.Content zIndex={1}>
                <Dialog.Header>
                  <Dialog.Title>Notification!</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text>Would you like to Submit?</Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <CancelButton
                      onClick={() => setIsSuccessModalOpen(false)}
                    />
                  </Dialog.ActionTrigger>

                  <PrimaryMdButton
                    // onClick={onClick}
                    onClick={() => {
                      nextStep();
                      setIsSuccessModalOpen(false);
                    }}
                  >
                    Yes
                  </PrimaryMdButton>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </HStack>
    </Box>
  );
}
