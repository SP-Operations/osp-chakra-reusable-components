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
} from "@chakra-ui/react";
import type { IRopSchema } from "../../models/types/rop.types";
import { FloatingInput } from "./FloatingInput";
import { mock } from "../../models/schema/RopMock";
import { SummaryLabel, SummaryLabelList } from "./SummaryLabel";

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

  return (
    <Box maxW="7xl" w="full" p={4}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading textStyle="2xl">
            {uniqueData.map((item, i) => (
              <Text key={i}>
                {[item.firstName, item.middleName, item.lastName]
                  .filter(Boolean)
                  .join(" ")}
              </Text>
            ))}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Request#: CNT-2025-0001
          </Text>
        </Box>
        {/* <Box>
          <Text color="gray.500">ROP Amount</Text>
          {data.length
            ? data.map((item, i) => (
                <Text key={i} fontWeight="medium">
                  {item.totalAmt ?? "—"}
                </Text>
              ))
            : mock.map((item, i) => (
                <Text key={i} fontWeight="medium">
                  {item.totalAmt ?? "—"}
                </Text>
              ))}
        </Box> */}
        <Flex gap={2}>
          {!isEditing ? (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              {/* <Edit2 size={16} /> */}
              Edit
            </Button>
          ) : (
            <>
              <Button colorScheme="green" size="sm" onClick={onSubmit}>
                <Save size={16} />
                Save
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  ropForm.reset();
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {/* Form */}
      <Box as="form" onSubmit={ropForm.handleSubmit(handleSave)}>
        {/* Plan Details */}
        <Heading size="lg" mb={2} mt={4}>
          Plan Details
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={4}
          // borderBottom="1px solid"
          // borderColor="gray.200"
          mb="2"
        >
          <Box>
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
          </Box>

          <Box>
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
          </Box>
        </Grid>
        {/* Contact Details */}
        <Heading size="lg" mb={2} mt={2}>
          Contact Information
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={4}
          // borderBottom="1px solid"
          // borderColor="gray.200"
          pb="2"
        >
          <Box>
            <Text fontSize="xs" color="gray.500"></Text>
            {uniqueData.map((item, i) => (
              <SummaryLabel
                key={i}
                label="Email Address"
                value={item.emailAddress ?? "—"}
              />
              // <Text key={i} fontWeight="medium">
              //   {item.emailAddress ?? "—"}
              // </Text>
            ))}
          </Box>

          <Box>
            {uniqueData.map((item, i) => (
              <SummaryLabel
                key={i}
                label=" Contact Number"
                value={item.mobileNo ?? "—"}
              ></SummaryLabel>
            ))}
          </Box>
        </Grid>
        {/* PlanHolder Address */}
        <Heading size="lg" mb={2} mt={2}>
          Planholder Address
        </Heading>
        {uniqueData.map((item, index) =>
          !isEditing ? (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={1}
              // borderBottom="1px solid"
              // borderColor="gray.200"
              pb="2"
              key={index}
            >
              <Box>
                <SummaryLabel label="Lot#" value={item.lotNumber ?? "—"} />
              </Box>
              <Box>
                <SummaryLabel label="Street" value={item.street ?? "—"} />
              </Box>
              <Box>
                <SummaryLabel label="Barangay" value={item.brangay ?? "—"} />
              </Box>
              <Box>
                <SummaryLabel label="District" value={item.district ?? "—"} />
              </Box>
              <Box>
                <SummaryLabel label="City" value={item.city ?? "—"} />
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500">
                  Province
                </Text>
                <SummaryLabel label="Province" value={item.province ?? "—"} />
              </Box>
              <Box>
                <SummaryLabel label="Zip Code" value={item.zipCode ?? "—"} />
              </Box>
            </Grid>
          ) : (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={1}
              borderBottom="1px solid"
              borderColor="gray.200"
              mb="2"
              key={index}
            >
              <FloatingInput
                label="Lot#"
                {...ropForm.register(`items.${index}.lotNumber`)}
              />

              <FloatingInput
                label={"Street"}
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
          )
        )}

        {/* Payout Details */}
        <Heading size="lg" mb={2} mt={2}>
          Payout Details
        </Heading>
        {uniqueData.map((item, index) => (
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={4}
            borderBottom="1px solid"
            borderColor="gray.200"
            pb="2"
            key={index}
          >
            <Box>
              <SummaryLabel
                label="Payout Channel"
                value={item.payoutChannel ?? "—"}
              />
            </Box>
            <Box>
              <SummaryLabel
                label="Account Number"
                value={item.payoutAccount ?? "—"}
              />
            </Box>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
