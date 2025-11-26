import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface SummaryLabelProps {
  label?: string;
  value?: string | number;
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
