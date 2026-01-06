import { Card, Flex, Grid, Icon, Span, VStack } from "@chakra-ui/react";
import React from "react";
import { LuReceiptText } from "react-icons/lu";
import { Body, Box, H4, Small } from "st-peter-ui";

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <VStack gap={1} align="start" minW={0}>
    <Small color="gray.500">{label}</Small>
    <Body>
      <Span fontWeight="semibold">{value}</Span>
    </Body>
  </VStack>
);

export const GrandSummary = ({
    label,
    value,
    type = "string"
} : {
    label: string,
    value: string | number | Date | boolean,
    type?: "string" | "number" | "currency" | "date" | "boolean"
}) => (
    <Flex
        py={1}
        mt={0}
        justify="space-between"
        align="center"
    >
        <Flex align="center" fontWeight="bold" color="gray.700">
          <LuReceiptText style={{ marginRight: 8 }} />
          {label}
        </Flex>

        <Body fontWeight="bold" color={"gray.800"}>
          {formatValue(value, type)}
        </Body>
    </Flex>
);

export interface SummaryItems {
  label: string,
  value: string | number | Date | boolean,
  type?: "string" | "number" | "currency" | "date" | "boolean"
}

const formatValue = (value: string | number | Date | boolean, type: string) : string => {
  switch(type) {
    case "string" : return value.toString();
    case "number" : return value.toLocaleString();
    case "currency" : return `₱ ${value.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    case "date" : return value.toLocaleString();
    case "boolean" : return value == true ? "Yes" : "No";
    default : return value.toString();
  }
}

export const SummarySection = ({
  icon,
  title,
  grandSummary,
  columns = 4,
  items,
  children
}: {
  icon?: React.ReactNode;
  title: string;
  grandSummary?: React.ReactElement<typeof GrandSummary>
  columns: 1 | 2 | 3 | 4 | 5;
  items?: SummaryItems[];
  children?: React.ReactNode
}) => (
  <Card.Root
    bg="white"
    shadow="sm"
    borderWidth="1px"
    rounded="lg"
    overflow="hidden"
  >
    <Card.Header py={4} px={6} borderBottomWidth="1px">
        <Flex align="center" gap={2}>
            {icon && <Icon boxSize={5}>{icon}</Icon>}
            <H4>{title}</H4>
        </Flex>
    </Card.Header>
    <Card.Body px={6} py={5}>
        {items && <Grid my={2} gap={6} templateColumns={{ base: "1fr", md: `repeat(${columns}, 1fr)` }}>
          {items.map((item, index) => (
            <InfoItem key={item.label + index} label={item.label} value={formatValue(item.value, item.type ?? "string")}/>
          ))}
        </Grid>}
        {children}
    </Card.Body>
    {grandSummary && <Card.Footer borderTopWidth="1px" pt={4}>
        <Box width={"full"}>
            {grandSummary}
        </Box>
    </Card.Footer>}
  </Card.Root>
);