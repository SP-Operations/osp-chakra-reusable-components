import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Body, Small } from "st-peter-ui";

interface SummaryLabelProps {
  label: string;
  value?: string | number;
}
interface SummaryLabelListProps {
  label: string;
  value: string[];
}
export function SummaryLabel({
  label = "label",
  value = "value",
}: SummaryLabelProps) {
  return (
    <Stack direction="column" gap={1}>
      <Text fontSize="sm" color="gray.500">
        {label}
      </Text>
      <Text fontWeight="medium">{value}</Text>
    </Stack>
  );
}

export function SummaryLabelList({
  label = "label",
  value = [],
}: SummaryLabelListProps) {
  return (
    <Stack direction="column" gap={1} align="start" minW={0}>
      <Small color="gray.500">{label}</Small>

      <Stack direction="column" gap={1} align="start" minW={0}>
        {value.map((item, key) => (
          <Body fontWeight="semibold" key={key}>
            {item}
          </Body>
        ))}
      </Stack>
    </Stack>
  );
}
