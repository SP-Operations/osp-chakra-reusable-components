import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

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
    <Stack direction="column" gap={1}>
      <Text fontSize="sm" color="gray.500">
        {label}
      </Text>

      <Stack direction="column" gap={1}>
        {value.map((item, key) => (
          <Text fontWeight="medium" key={key}>
            {item}
          </Text>
        ))}
      </Stack>
    </Stack>
  );
}
