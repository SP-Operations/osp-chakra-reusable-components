"use client";

import React, { useState } from "react";
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
  const uniqueData = [
    ...new Map(data.map((item) => [item.requestNo, item])).values(),
  ];

  const ropForm = useForm<{ items: IRopSchema[] }>({
    defaultValues: { items: uniqueData },
  });

  const handleSave = (values: { items: IRopSchema[] }) => {
    onEdit?.(values.items);
    setIsEditing(false);
  };

  const onSubmit = ropForm.handleSubmit(handleSave);

  return (
    <Box maxW="7xl" w="full" p={4}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="md">
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
        <Heading size="sm" mb={2} mt={4}>
          Plan Details
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          <Box>
            <Text fontSize="xs" color="gray.500">
              Contract Number
            </Text>
            {data.map((item, i) => (
              <Text key={i} fontWeight="medium">
                {item.lpaNo ?? "—"}
              </Text>
            ))}
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.500">
              Plan Type
            </Text>
            {data.map((item, i) => (
              <Text key={i} fontWeight="medium">
                {item.planType ?? "—"}
              </Text>
            ))}
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.500">
              ROP Amount
            </Text>
            {data.map((item, i) => (
              <Text key={i} fontWeight="medium">
                {item.totalAmt ?? "—"}
              </Text>
            ))}
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.500">
              Email Address
            </Text>
            {uniqueData.map((item, i) => (
              <Text key={i} fontWeight="medium">
                {item.emailAddress ?? "—"}
              </Text>
            ))}
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.500">
              Contact Number
            </Text>
            {uniqueData.map((item, i) => (
              <Text key={i} fontWeight="medium">
                {item.mobileNo ?? "—"}
              </Text>
            ))}
          </Box>
        </Grid>

        {/* PlanHolder Address */}
        <Heading size="sm" mb={2} mt={6}>
          PlanHolder Address
        </Heading>
        {uniqueData.map((item, index) =>
          !isEditing ? (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={4}
              mb={4}
              key={index}
            >
              <Box>
                <Text fontSize="xs" color="gray.500">
                  Lot#
                </Text>
                <Text fontWeight="medium">{item.lotNumber ?? "—"}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500">
                  Street
                </Text>
                <Text fontWeight="medium">{item.street ?? "—"}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500">
                  Barangay
                </Text>
                <Text fontWeight="medium">{item.brangay ?? "—"}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500">
                  District
                </Text>
                <Text fontWeight="medium">{item.district ?? "—"}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500">
                  City
                </Text>
                <Text fontWeight="medium">{item.city ?? "—"}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500">
                  Province
                </Text>
                <Text fontWeight="medium">{item.province ?? "—"}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500">
                  Zip Code
                </Text>
                <Text fontWeight="medium">{item.zipCode ?? "—"}</Text>
              </Box>
            </Grid>
          ) : (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={4}
              mb={4}
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
        <Heading size="sm" mb={2} mt={6}>
          Payout Details
        </Heading>
        {uniqueData.map((item, index) => (
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={4}
            mb={4}
            key={index}
          >
            <Box>
              <Text fontSize="xs" color="gray.500">
                Payout Channel
              </Text>
              <Text fontWeight="medium">{item.payoutChannel ?? "—"}</Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500">
                Account Number
              </Text>
              <Text fontWeight="medium">{item.payoutAccount ?? "—"}</Text>
            </Box>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
