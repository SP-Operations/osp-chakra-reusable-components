import FloatingLabelInput from "./ui/floating-label-input";
import { Body, H4 } from "st-peter-ui";
import type { IEmployment } from "../../../types/planholder";
import { useState } from "react";
import { Field, SimpleGrid, Span, VStack } from "@chakra-ui/react";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const civilStatusOptions = [
  { value: "single", label: "Single" },
  { value: "in_relationship", label: "In a Relationship" },
];

const Employment = (props: IEmployment) => {
  const [formData, setFormData] = useState<IEmployment>({
    occupation: props.occupation ?? "",
    employerName: props.employerName ?? "",
    employmentStatus: props.employmentStatus ?? "",
    officeAddress: props.officeAddress ?? "",
    TIN: props.TIN ?? "",
    SSS: props.SSS ?? "",
    sourceOfIncome: props.sourceOfIncome ?? "",
  });
  return (
    <>
      <VStack align="stretch" gap={4} mb={4}>
        <Body>
          <Span fontWeight="bold">Employment</Span>
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root>
          <FloatingLabelInput
            id="occupation"
            label="Occupation"
            value={formData.occupation}
            onChange={(e) => {
              setFormData({ ...formData, occupation: e.target.value });
            }}
          />
        </Field.Root>
        <Field.Root>
          <FloatingLabelInput
            id="employerName"
            label="Employer Name"
            value={formData.employerName}
            onChange={(e) => {
              setFormData({ ...formData, employerName: e.target.value });
            }}
          />
        </Field.Root>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root>
          <FloatingLabelInput
            id="employmentStatus"
            label="Employment Status"
            value={formData.employmentStatus}
            onChange={(e) => {
              setFormData({ ...formData, employmentStatus: e.target.value });
            }}
          />
        </Field.Root>
        <Field.Root>
          <FloatingLabelInput
            id="officeAddress"
            label="Office Address"
            value={formData.officeAddress}
            onChange={(e) => {
              setFormData({ ...formData, officeAddress: e.target.value });
            }}
          />
        </Field.Root>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root>
          <FloatingLabelInput
            id="tin"
            label="TIN"
            value={formData.TIN}
            onChange={(e) => {
              setFormData({ ...formData, TIN: e.target.value });
            }}
          />
        </Field.Root>
        <Field.Root>
          <FloatingLabelInput
            id="sssGsis"
            label="SSS"
            value={formData.SSS}
            onChange={(e) => {
              setFormData({ ...formData, SSS: e.target.value });
            }}
          />
        </Field.Root>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root w="100%">
          <FloatingLabelInput
            id="otherSourceOfFund"
            label="Other Source of Fund"
            value={formData.sourceOfIncome}
            onChange={(e) => {
              setFormData({ ...formData, sourceOfIncome: e.target.value });
            }}
          />
        </Field.Root>
      </SimpleGrid>
    </>
  );
};

export default Employment;
