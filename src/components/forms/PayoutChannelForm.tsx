"use client";

import { useState } from "react";
import { CheckCircle, CreditCard, Smartphone } from "lucide-react";
import {
  Box,
  Flex,
  Heading,
  Text,
  RadioGroup,
  Stack,
  Select,
  Input,
  Image,
  Button,
  Portal,
  createListCollection,
  Grid,
} from "@chakra-ui/react";
import type { PayoutChannelFormProps } from "../../models/types/rop.types";
import { FileUpload } from "../others/FileUpload";
import { PrimaryMdFlexButton } from "st-peter-ui";
import { UploadFile } from "../others/UploadFile";
import { FloatingInput } from "../others/FloatingInput";

export default function PayoutChannelForm({
  mode,
  setMode,
  document,
  isShowButton = true,
}: PayoutChannelFormProps) {
  const [payoutChannel, setPayoutChannel] = useState("");

  const existingPayout = {
    channel: "Gcash",
    account: "09171234567",
    depositSlip:
      "https://getcash.ph/wp-content/uploads/2021/02/Gcash-account-number.jpg",
    govID:
      "https://philsys.gov.ph/wp-content/uploads/2022/11/PhilID-specimen-Front_highres1-768x432.png",
    signature:
      "https://img.freepik.com/free-vector/hand-drawn-signature-element_23-2150907973.jpg?w=360",
  };

  const channelIcon =
    existingPayout.channel === "Gcash" || existingPayout.channel === "Maya" ? (
      <Smartphone color="#3182CE" size={20} />
    ) : (
      <CreditCard color="#38A169" size={20} />
    );

  const payout = createListCollection({
    items: [
      { label: "Bank", value: "Bank" },
      { label: "GCash", value: "GCash" },
      { label: "Maya", value: "Maya" },
    ],
  });

  return (
    <Box as="form" p={4} maxW="7xl" w="full" mx="auto">
      {/* Mode toggle */}
      {setMode && (
        <RadioGroup.Root mb={6} defaultValue="existing">
          <Stack direction="row">
            <RadioGroup.Item
              value="existing"
              onChange={() => setMode("existing")}
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>
                Use Existing Payout Channel
              </RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="new" onChange={() => setMode("new")}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>
                Register New Payout Channel
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          </Stack>
        </RadioGroup.Root>
      )}

      {/* Existing payout */}
      {mode === "existing" && (
        <Box borderWidth={1} borderRadius="md" p={4} w="full" mx="auto">
          <Flex justify="space-between" align="center" mb={4}>
            <Flex align="center">
              <Box mr={3}>{channelIcon}</Box>
              <Box>
                <Heading size="md">{existingPayout.channel} Payout</Heading>
                <Text fontSize="sm" color="gray.500">
                  Active Registered Channel
                </Text>
              </Box>
            </Flex>
            <CheckCircle color="#38A169" size={18} />
          </Flex>

          <Flex justify="space-between" mb={4}>
            <Box>
              <Text fontSize="sm" color="gray.500">
                Payout Account
              </Text>
              <Text>{existingPayout.account}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">
                Channel Type
              </Text>
              <Text>
                {existingPayout.channel === "Gcash" ? "E-Wallet" : "Bank"}
              </Text>
            </Box>
          </Flex>

          <Flex gap={4} flexWrap="wrap">
            {[
              {
                label: "Deposit Slip / Screenshot",
                src: existingPayout.depositSlip,
              },
              { label: "Government ID", src: existingPayout.govID },
              { label: "Specimen Signature", src: existingPayout.signature },
            ].map((item, idx) => (
              <Box
                key={idx}
                borderWidth={1}
                borderRadius="md"
                overflow="hidden"
                maxW="240px"
                alignItems="center"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fit="contain"
                  boxSize="220px"
                />
                <Box p={2} position="relative" bottom="0.5">
                  <Text fontSize="sm" textAlign="center" verticalAlign="middle">
                    {item.label}
                  </Text>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {/* New payout registration */}
      {(mode === "new" || mode == null) && (
        <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={6}>
          <Box my="8px">
            {/* <Text mb={1}>Payout Channel</Text> */}

            <Select.Root
              variant={"outline"}
              key={"outline"}
              collection={payout}
              onChange={(e) =>
                setPayoutChannel((e.target as HTMLSelectElement).value)
              }
            >
              <Select.HiddenSelect />
              {/* <Select.Label>Select Payout Channel</Select.Label> */}
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select Payout Channel" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {payout.items.map((payout) => (
                      <Select.Item item={payout} key={payout.value}>
                        {payout.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Box>

          <Box>
            <FloatingInput
              //   placeholder="Enter account number or wallet ID"
              label={"Payout Account"}
            />
          </Box>

          <Flex direction="column" gap={2}>
            <UploadFile />
            {/* {document?.map((item) => (
              <FileUpload id={item.id} label={item.label} key={item.id} />
            ))} */}
          </Flex>
        </Grid>
      )}

      {(mode === "new" || mode == null) && isShowButton && (
        <PrimaryMdFlexButton type="submit" mt="2">
          Register Payout Channel
        </PrimaryMdFlexButton>
      )}
    </Box>
  );
}
