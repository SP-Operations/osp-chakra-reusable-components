"use client";

import React, { useEffect, useState } from "react";
import { Edit2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Input,
  Stack,
  Dialog,
  Portal,
  CloseButton,
  useDisclosure,
  HStack,
  Icon,
  VStack,
  Span,
  Card,
} from "@chakra-ui/react";
import type { IRopSchema } from "../../models/types/rop.types";
import { FloatingInput } from "./FloatingInput";
import { mock } from "../../models/schema/RopMock";
import { SummaryLabel, SummaryLabelList } from "./SummaryLabel";
import {
  Body,
  EditButton,
  H2,
  H3,
  H4,
  InputFloatingLabel,
  PrimarySmButton,
  SecondarySmButton,
  Small,
} from "st-peter-ui";
import { register } from "module";
import { FaRegAddressCard } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiContactsBook3Fill } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import { BiSolidCreditCardAlt } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";

export default function ROPApplicationDetails({
  data,
  onEdit,
  isEditing,
  setIsEditing,
}: {
  data: IRopSchema[];
  onEdit?: (values: IRopSchema[]) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const uniqueData = [
  //   ...new Map(data.map((item) => [item.requestNo, item])).values(),
  // ];
  const uniqueData = data?.length
    ? [...new Map(data.map((item) => [item.requestNo, item])).values()]
    : [...new Map(mock.map((item) => [item.requestNo, item])).values()]; // for demo purpose get mock data if no data has been passed

  const ropForm = useForm<{ items: IRopSchema[] }>({
    defaultValues: { items: uniqueData },
  });

  const handleSave = (values: { items: IRopSchema[] }) => {
    onEdit?.(values.items);
    setIsEditing(false);
  };
  // useEffect(() => {
  //   const finalData = data?.length
  //     ? [...new Map(data.map((item) => [item.requestNo, item])).values()]
  //     : mock;

  //   ropForm.reset({ items: finalData });
  // }, [data, ropForm]);

  const onSubmit = ropForm.handleSubmit(handleSave);
  const [open, setOpen] = useState(false);

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
      <Text fontSize={"lg"} fontWeight={"semibold"}>
        {title}
      </Text>
    </Flex>
  );

  return (
    <Box maxW="7xl" w="full" p={4}>
      <Box mb="3">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          Review Details
        </Text>
      </Box>
      {/* Header */}
      <Card.Root
        mb={8}
        bg="white"
        shadow="sm"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
      >
        <Card.Header py={4} px={6} borderBottomWidth="1px">
          <Flex justify={"space-between"}>
            {uniqueData.map((item, i) => (
              <SectionCardHeader
                key={i}
                icon={<FaRegAddressCard />}
                title={[item.firstName, item.middleName, item.lastName]
                  .filter(Boolean)
                  .join(" ")}
              ></SectionCardHeader>
            ))}
            <Text fontSize={"lg"} fontWeight={"semibold"} color="gray.500">
              Request#: CNT-2025-0001
            </Text>
          </Flex>
        </Card.Header>
      </Card.Root>

      {/* Form */}
      <Box as="form" onSubmit={ropForm.handleSubmit(handleSave)}>
        {/* Plan Details */}
        <Card.Root
          mb={8}
          bg="white"
          shadow="sm"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
        >
          <Card.Header py={4} px={6} borderBottomWidth="1px">
            <SectionCardHeader icon={<TbListDetails />} title="Plan Details" />
          </Card.Header>
          <Card.Body px={6} py={5}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}
              gap={6}
            >
              {data.length ? (
                <SummaryLabelList
                  label="Contract Number"
                  value={data.map((item) => item.lpaNo)}
                />
              ) : (
                mock.map((item, i) => (
                  <Text key={i} fontWeight="medium">
                    {item.lpaNo ?? "—"}
                  </Text>
                ))
              )}
              {data.length ? (
                <SummaryLabelList
                  label="Plan Type"
                  value={data.map((item) => item.planType)}
                />
              ) : (
                mock.map((item, i) => (
                  <Text key={i} fontWeight="medium">
                    {item.planType ?? "—"}
                  </Text>
                ))
              )}
            </Grid>
          </Card.Body>
        </Card.Root>
        {/* Contact Details */}
        <Card.Root
          mb={8}
          bg="white"
          shadow="sm"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
        >
          <Card.Header py={4} px={6} borderBottomWidth="1px">
            <SectionCardHeader
              icon={<RiContactsBook3Fill />}
              title="Contact Information"
            />
          </Card.Header>
          <Card.Body px={6} py={5}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}
              gap={6}
            >
              {uniqueData.map((item, i) => (
                <InfoItem
                  key={i}
                  label="Email Address"
                  value={item.emailAddress ?? "—"}
                />
              ))}
              {uniqueData.map((item, i) => (
                <InfoItem
                  key={i}
                  label="Contact Number"
                  value={item.mobileNo ?? "-"}
                />
              ))}
            </Grid>
          </Card.Body>
        </Card.Root>

        {/* PlanHolder Address */}
        <Card.Root
          mb={8}
          bg="white"
          shadow="sm"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
        >
          <Card.Header py={4} px={6} borderBottomWidth="1px">
            <Flex justify={"space-between"}>
              <SectionCardHeader
                icon={<ImLocation2 />}
                title="Planholder Address"
              />
              <EditButton onClick={() => setOpen(true)} />
            </Flex>
          </Card.Header>
          <Card.Body px={6} py={5}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}
              gap={6}
            >
              {uniqueData.map((item, i) => (
                <InfoItem key={i} label="Lot#" value={item.lotNumber ?? "—"} />
              ))}
              {uniqueData.map((item, i) => (
                <InfoItem key={i} label="Street" value={item.street ?? "—"} />
              ))}
              {uniqueData.map((item, i) => (
                <InfoItem
                  key={i}
                  label="Barangay"
                  value={item.brangay ?? "—"}
                />
              ))}
              {uniqueData.map((item, i) => (
                <InfoItem
                  key={i}
                  label="District"
                  value={item.district ?? "-"}
                />
              ))}
              {uniqueData.map((item, i) => (
                <InfoItem key={i} label="City" value={item.city ?? "—"} />
              ))}
              {uniqueData.map((item, i) => (
                <InfoItem
                  key={i}
                  label="Province"
                  value={item.province ?? "-"}
                />
              ))}
              {uniqueData.map((item, i) => (
                <InfoItem
                  key={i}
                  label="Zip Code"
                  value={item.zipCode ?? "-"}
                />
              ))}
            </Grid>
          </Card.Body>
        </Card.Root>

        {/* Payout Details */}
        <Card.Root
          mb={8}
          bg="white"
          shadow="sm"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
        >
          <Card.Header py={4} px={6} borderBottomWidth="1px">
            <SectionCardHeader
              icon={<BiSolidCreditCardAlt />}
              title="Payout Details"
            />
          </Card.Header>
          <Card.Body px={6} py={5}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}
              gap={6}
            >
              {uniqueData.map((item, i) => (
                <InfoItem
                  key={i}
                  label="Payout Channel"
                  value={item.payoutChannel ?? "—"}
                />
              ))}
              {uniqueData.map((item, i) => (
                <InfoItem
                  key={i}
                  label="Account Number"
                  value={item.payoutAccount ?? "—"}
                />
              ))}
            </Grid>
          </Card.Body>
        </Card.Root>
      </Box>

      <Dialog.Root
        lazyMount
        open={open}
        role="alertdialog"
        onOpenChange={(e) => setOpen(e.open)}
        size={{ mdDown: "full", md: "lg" }}
        placement="center"
      >
        <Dialog.Trigger asChild></Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop zIndex={1000} />
          <Dialog.Positioner zIndex={1001}>
            <Dialog.Content zIndex={1001} onClick={(e) => e.preventDefault()}>
              <Dialog.Header py={4} px={6} borderBottomWidth="1px">
                <Dialog.Title>
                  <Text fontSize={"lg"} fontWeight={"semibold"}>
                    Edit Planholder Address
                  </Text>
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body m="2" borderBottomWidth="1px">
                {uniqueData.map((item, index) => (
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={4}
                    pb="4"
                    key={index}
                  >
                    <FloatingInput
                      label="Lot#"
                      {...ropForm.register(`items.${index}.lotNumber`)}
                    />

                    <FloatingInput
                      label="Street"
                      {...ropForm.register(`items.${index}.street`)}
                    />

                    <FloatingInput
                      label={"Barangay"}
                      {...ropForm.register(`items.${index}.brangay`)}
                    />

                    <FloatingInput
                      label={"District"}
                      {...ropForm.register(`items.${index}.district`)}
                    />

                    <FloatingInput
                      label={"City"}
                      {...ropForm.register(`items.${index}.city`)}
                    />

                    <FloatingInput
                      label={"province"}
                      {...ropForm.register(`items.${index}.province`)}
                    />

                    <FloatingInput
                      label={"Zip Code"}
                      {...ropForm.register(`items.${index}.zipCode`)}
                    />
                  </Grid>
                ))}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
