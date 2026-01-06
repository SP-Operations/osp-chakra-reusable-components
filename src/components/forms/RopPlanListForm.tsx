import React, { useState } from "react";
import {
  Box,
  Flex,
  Table,
  Checkbox,
  Text,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import type { IRopSchema } from "../../models/types/rop.types";
import {
  ApplyButton,
  Body,
  DynamicButton,
  H4,
  PrimarySmButton,
  SecondarySmButton,
  Small,
} from "st-peter-ui";
import { ListItem, ListItemColumn } from "../list-item/list-item";

type RopPlanListProps = {
  data: IRopSchema[];
  onClick: () => void; // passed from consumer
};

export function RopPlanListForm({ data, onClick }: RopPlanListProps) {
  const [selected, setSelected] = useState<string[]>([]);

  // Toggle single row
  const toggleSelect = (id: string) => {
    console.log(id);
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
    // <Box bg="white" borderWidth="1px" borderRadius="md" p={4} shadow="sm"></Box>
    <Box bg="white">
      {/* Header actions */}
      <Flex align="center" mb={3}>
        <Box>
          <H4>List of fully paid plan</H4>
          <Box fontStyle="italic">
            <Small>Kindly select plans you want to request.</Small>
          </Box>
        </Box>

        <Spacer />
        <Box textAlign={"right"}>
          <Body fontStyle="italic">No. of plans selected:</Body>
          <Box>
            <H4>
              {selected.length}/ {data.length}
            </H4>
          </Box>
        </Box>
        {/* <SecondarySmButton disabled>
          Selected Plan ({selected.length})
        </SecondarySmButton> */}
      </Flex>

      {/* Table */}
      <Box overflowX="auto">
        <Table.Root size="sm" minW="full" stickyHeader interactive>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader w={6}>
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
              <Table.ColumnHeader>Amount</Table.ColumnHeader>
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
                <Table.Cell>{item.totalAmt}</Table.Cell>
                <Table.Cell>{item.ropDate}</Table.Cell>
                <Table.Cell>{item.ropSched}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Footer button */}
      <Flex justify="flex-end" mt={4}>
        <ApplyButton disabled={selected.length === 0} onClick={onSubmit} />
        {/* Apply ROP
        </ApplyButton> */}
      </Flex>
    </Box>

    // <Box
    //   p="6"
    //   border={"1px solid #ddd"}
    //   borderTopLeftRadius={"md"}
    //   borderTopEndRadius={"md"}
    // >
    //   <Text fontSize={"xl"} fontWeight={"semibold"}>
    //     List of Fully Paid Plans
    //   </Text>
    //   <Box mb={"4"} fontStyle={"italic"}>
    //     <Small>Kindly select plans you want to request.</Small>
    //   </Box>
    //   {data.map((item) => (
    //     <ListItem
    //       selectable={true}
    //       key={item.lpaNo}
    //       // isChecked={selected.includes(item.lpaNo)}
    //       onCheckChange={() => toggleSelect(item.lpaNo)}
    //     >
    //       <ListItemColumn label={"Contract No."} value={item.lpaNo} />
    //       <ListItemColumn
    //         label={"Full Name"}
    //         value={item.firstName + " " + item.middleName + " " + item.lastName}
    //       />
    //       <ListItemColumn label={"Plan Type"} value={item.planType} />
    //       <ListItemColumn label={"Amount"} value={item.totalAmt} />
    //       <ListItemColumn label={"Schedule Date"} value={item.ropDate} />
    //       <ListItemColumn label={"Inst. Schedule"} value={item.ropSched} />
    //     </ListItem>
    //   ))}
    //   <Flex justify="flex-end" mt={4}>
    //     <DynamicButton
    //       // disabled={selected.length === 0}
    //       label="Apply ROP"
    //       onClick={onSubmit}
    //     />
    //   </Flex>
    // </Box>
  );
}
