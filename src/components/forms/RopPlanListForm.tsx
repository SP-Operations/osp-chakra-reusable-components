import React, { useState } from "react";
import { Box, Flex, Table, Checkbox, Text } from "@chakra-ui/react";
import type { IRopSchema } from "../../models/types/rop.types";
import { PrimarySmButton, SecondarySmButton } from "st-peter-ui";

type RopPlanListProps = {
  data: IRopSchema[];
  onClick: () => void; // passed from consumer
};

export function RopPlanListForm({ data, onClick }: RopPlanListProps) {
  const [selected, setSelected] = useState<string[]>([]);

  // Toggle single row
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allSelected = selected.length === data.length;

  const toggleSelectAll = () => {
    setSelected(allSelected ? [] : data.map((x) => x.lpaNo));
  };

  const onSubmit = () => {
    const selectedRows = data.filter((x) => selected.includes(x.lpaNo));
    sessionStorage.setItem("selectedRows", JSON.stringify(selectedRows));
    console.log(selectedRows);
    onClick();
  };

  return (
    <Box bg="white" borderWidth="1px" borderRadius="md" p={4} shadow="sm">
      {/* Header actions */}
      <Flex align="center" justify="space-between" mb={3}>
        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
          List of fully paid plan
        </Text>

        <SecondarySmButton disabled={true}>
          Selected Plan ({selected.length})
        </SecondarySmButton>
      </Flex>

      {/* Table */}
      <Box overflowX="auto">
        <Table.Root size="sm" minW="full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>
                <Checkbox.Root
                  checked={allSelected}
                  onCheckedChange={toggleSelectAll}
                  variant="solid"
                  colorPalette="green"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
              </Table.ColumnHeader>
              <Table.ColumnHeader>Contract No.</Table.ColumnHeader>
              <Table.ColumnHeader>Full Name</Table.ColumnHeader>
              <Table.ColumnHeader>Plan Type</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
              <Table.ColumnHeader>Schedule Date</Table.ColumnHeader>
              <Table.ColumnHeader>Inst. Schedule</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((item) => (
              <Table.Row
                key={item.lpaNo}
                bg={selected.includes(item.lpaNo) ? "blue.50" : "transparent"}
                _hover={{ bg: "gray.50" }}
                transition="background 0.2s"
              >
                <Table.Cell>
                  <Checkbox.Root
                    checked={selected.includes(item.lpaNo)}
                    onCheckedChange={() => toggleSelect(item.lpaNo)}
                    variant="solid"
                    colorPalette="green"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.Cell>
                <Table.Cell fontWeight="medium">{item.lpaNo}</Table.Cell>
                <Table.Cell>
                  {item.firstName}{" "}
                  {item.middleName ? item.middleName + " " : ""}
                  {item.lastName}
                </Table.Cell>
                <Table.Cell>{item.planType}</Table.Cell>
                <Table.Cell textAlign="right">{item.totalAmt}</Table.Cell>
                <Table.Cell>{item.ropDate}</Table.Cell>
                <Table.Cell>{item.ropSched}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Footer button */}
      <Flex justify="flex-end" mt={4}>
        <PrimarySmButton disabled={selected.length === 0} onClick={onSubmit}>
          Apply ROP
        </PrimarySmButton>
      </Flex>
    </Box>
  );
}
