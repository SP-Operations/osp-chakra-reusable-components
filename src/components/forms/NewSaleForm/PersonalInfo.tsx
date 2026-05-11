import {
  Box,
  createListCollection,
  Field,
  Grid,
  Input,
  Select,
  Separator,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Body } from "st-peter-ui";
import FloatingLabelInput from "./ui/floating-label-input";
import type { IPersonalInfo } from "../../../types/planholder";
const PersonalInfo = (props: IPersonalInfo) => {
  const idCollection = createListCollection({
    items: [
      { label: "Passport", value: "passport" },
      { label: "Driver's License", value: "driver_license" },
      { label: "Philippine Identification Card", value: "national_id" },
    ],
  });
  const [formData, setFormData] = useState<IPersonalInfo>({
    firstName: props.firstName ?? "",
    middleName: props.middleName ?? "",
    lastName: props.lastName ?? "",
    suffix: props.suffix ?? "",
    birthDate: props.birthDate ?? "",
    idType: props.idType ?? "",
    idNumber: props.idNumber ?? "",
    height: props.height ?? 0,
    weight: props.weight ?? 0,
    gender: props.gender ?? "",
    civilStatus: props.civilStatus ?? "",
    nationality: props.nationality ?? "",
    mobileNumber: props.mobileNumber ?? "",
    emailAddress: props.emailAddress ?? "",
    mailingAddress: props.mailingAddress ?? "",
    landLineNumber: props.landLineNumber ?? "",
    // addressLine1: initialData?.addressLine1 ?? "",
  });
  return (
    <>
      <VStack mb={4} align="stretch">
        <Body fontWeight="bold">Identification</Body>
      </VStack>
      {/* <Button onClick={() => console.log("Current formData:", formData)}>
        Log Form Data
      </Button> */}
      <VStack gap={6} align="stretch" w="full">
        {/* Identification Section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Select.Root
            collection={idCollection}
            value={formData.idType ? [formData.idType] : []}
            onValueChange={(details) =>
              setFormData({ ...formData, idType: details.value[0] ?? "" })
            }
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select ID Type" />
                {formData.idType && (
                  <Box fontSize="sm" color="fg.default" hidden>
                    {
                      idCollection.items.find(
                        (item) => item.value === formData.idType,
                      )?.label
                    }
                  </Box>
                )}
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {idCollection.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        </Grid>

        <Separator />

        {/* Full Name Section */}
        <Body fontWeight="bold">Full Name</Body>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="lastName"
              type="text"
              label="Last Name"
              value={formData.lastName || ""}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="firstName"
              type="text"
              label="First Name"
              value={formData.firstName || ""}
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="middleName"
              type="text"
              label="Middle Name"
              value={formData.middleName || ""}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="suffix"
              type="text"
              label="Suffix (Optional)"
              value={formData.suffix || ""}
            />
          </Field.Root>
        </Grid>

        <Separator />

        {/* Personal Data Section */}
        <Body fontWeight="bold">Personal Details</Body>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <Field.Label>Date of Birth</Field.Label>

            <Input
              id="dateOfBirth"
              type="date"
              value={formData.birthDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Date of Neutralization</Field.Label>

            <Input id="dateOfNeutralization" type="date" />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              id="height"
              label="Height (ft)"
              // value={stateOcrValue?.height}
              onChange={(e) =>
                setFormData({ ...formData, height: parseFloat(e.target.value) })
              }
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="weight"
              label="Weight (lbs)"
              // value={stateOcrValue?.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: parseFloat(e.target.value) })
              }
            />
          </Field.Root>
        </Grid>

        <Separator />

        {/* Demographics Section */}
        <Body fontWeight="bold">Demographics</Body>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2 , 1fr)" }} gap={8}>
          <Field.Root>
            <Select.Root
              collection={createListCollection({
                items: [
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ],
              })}
            >
              <Select.HiddenSelect id="gender" />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Gender" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {createListCollection({
                    items: [
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ],
                  }).items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Field.Root>
          <Field.Root>
            <Select.Root
              collection={createListCollection({
                items: [
                  { label: "Single", value: "single" },
                  { label: "Married", value: "married" },
                  { label: "Widowed", value: "widowed" },
                  { label: "Divorced", value: "divorced" },
                  { label: "Separated", value: "separated" },
                  { label: "Annulled", value: "annulled" },
                ],
              })}
            >
              <Select.HiddenSelect id="civilStatus" />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Civil Status" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {createListCollection({
                    items: [
                      { label: "Single", value: "single" },
                      { label: "Married", value: "married" },
                      { label: "Widowed", value: "widowed" },
                      { label: "Divorced", value: "divorced" },
                      { label: "Separated", value: "separated" },
                      { label: "Annulled", value: "annulled" },
                    ],
                  }).items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="nationality"
              type="text"
              label="Nationality"
              onChange={(e) =>
                setFormData({ ...formData, nationality: e.target.value })
              }
            />
          </Field.Root>
        </Grid>

        <Separator />

        {/* Basic Contact Info */}
        <Body fontWeight="bold">Contact Information</Body>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="mobileNumber"
              type="text"
              label="Mobile Number"
              onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value })
              }
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="landlineNumber"
              type="text"
              label="Landline Number"
              onChange={(e) =>
                setFormData({ ...formData, landLineNumber: e.target.value })
              }
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="email"
              type="email"
              label="Email Address"
              onChange={(e) =>
                setFormData({ ...formData, emailAddress: e.target.value })
              }
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="mailingAddress"
              type="text"
              label="Mailing Address"
              onChange={(e) =>
                setFormData({ ...formData, mailingAddress: e.target.value })
              }
            />
          </Field.Root>
        </Grid>

        <Separator />

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="insurability"
              type="text"
              label="Insurability"
              value="Insurable"
              readOnly
            />
          </Field.Root>
        </Grid>
      </VStack>
    </>
  );
};

export default PersonalInfo;
