import { Card, Flex, Icon, Span, VStack } from "@chakra-ui/react";
import React from "react";
import { LuReceiptText } from "react-icons/lu";
import { Body, Box, H4, Small } from "st-peter-ui";

export const InfoItem = ({
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

export const GrandSummary = ({
    label,
    value,
} : {
    label: string;
    value: string;
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
          {value}
        </Body>
    </Flex>
);

export const SummarySection = ({
  icon,
  title,
  grandSummary,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  grandSummary?: React.ReactElement<typeof GrandSummary>
  children: React.ReactNode;
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
        {children}
    </Card.Body>
    {grandSummary && <Card.Footer borderTopWidth="1px" pt={4}>
        <Box width={"full"}>
            {grandSummary}
        </Box>
    </Card.Footer>}
  </Card.Root>
);