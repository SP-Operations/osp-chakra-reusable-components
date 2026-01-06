"use client";

import {
  Box,
  Heading,
  ListItem,
  Flex,
  Text,
  List,
  Collapsible,
  Dialog,
  HStack,
  Portal,
  CloseButton,
  Steps,
  Center,
  Button,
  FileUpload,
  Grid,
  Breadcrumb,
  GridItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { RopPlanListForm } from "../../components/forms/RopPlanListForm";
import { RopSearchFormSchema } from "../../models/schema/RopSchema";
import type { IRopSchema, ISearchRopForm } from "../../models/types/rop.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mock, stepper } from "../../models/schema/RopMock";
// import { FileUpload } from "../../components/others/FileUpload";
import {
  Body,
  DynamicButton,
  H2,
  H3,
  H4,
  InputFloatingLabel,
  PrimaryMdButton,
  PrimaryMdFlexButton,
  Small,
} from "st-peter-ui";
import { FloatingInput } from "../../components/others/FloatingInput";
import { UploadFile } from "../../components/others/UploadFile";
import { HiUpload } from "react-icons/hi";

type RopPageProps = {
  onClick: () => void;
};

export const RopPage = ({ onClick }: RopPageProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ISearchRopForm>({
    resolver: zodResolver(RopSearchFormSchema),
    defaultValues: {
      lpaNo: "", // <--- initialize as empty string
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "", // string, not undefined
    },
  });

  const [data, setData] = useState<IRopSchema[]>(mock);
  const [isAlert, setAlert] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const onSubmit = async (values: ISearchRopForm) => {
    // simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newRecord: IRopSchema = {
      requestNo: "CNT-2025-0001",
      planType: "ST. DOROTHY",
      emailAddress: "sample@email.com",
      mobileNo: "09123456789",
      lotNumber: "1234",
      street: "Mabini Street",
      province: "Cavite",
      city: "Dasmariñas",
      district: "District 1",
      zipCode: "4114",
      brangay: "San Agustin",
      ropSched: "1st",
      ropDate: "10-08-2025",
      totalAmt: "6000.00",
      payoutChannel: "GCash",
      payoutAccount: "09981234567",
      status: "Pending",
      ...values,
    };

    setData((prev) => [...prev, newRecord]);
    reset();
    setAlert(true);
  };

  return (
    <Box maxW={"7xl"} my={2} px={0} w="full">
      <Box mb="4">
        <H3>Return of Premium</H3>
        <Body>File Your Premium, Quick & Simple</Body>
      </Box>
      <Steps.Root
        defaultStep={0}
        count={stepper.length}
        mb="8"
        colorPalette={"green"}
      >
        <Steps.List>
          {stepper.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title display={{ base: "block", mdDown: "none" }}>
                {step.title}
              </Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
      </Steps.Root>

      {/* Instructions */}

      <Box mb="6">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          Select Plan
        </Text>
        {/* <Text textStyle="sm"> */}
        <Heading size="md" mb="2">
          <Body>
            {" "}
            Please prepare a scanned copy of the following required documents
          </Body>
        </Heading>
        <List.Root textStyle="sm" ml="4">
          <ListItem>
            <Body>One (1) valid Government issued ID with signature</Body>
          </ListItem>
          <ListItem>
            <Body>
              Three (3) Specimen Signatures or right thumbmark, if unable to
              write
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              {" "}
              Proof of account must contain your account name, account number,
              and bank name
            </Body>
            <List.Root ml="6" mt="1">
              <ListItem>
                <Body>
                  Bank Account validated cash/cheque deposit slip at least six
                  (6) months from the last date of transaction
                </Body>
              </ListItem>
              <ListItem>
                <Body>
                  eWallet screenshot of mobile app account. Fully verified
                  account with profile picture is required
                </Body>
              </ListItem>
            </List.Root>
          </ListItem>
        </List.Root>
        {/* </Text> */}
      </Box>

      {/* Plan List */}
      <Box mb={6}>
        <RopPlanListForm data={data} onClick={onClick} />
      </Box>

      {/* Search Collapsible */}
      <Box>
        <Flex
          align="left"
          cursor="pointer"
          color="blue.600"
          onClick={() => setShowSearch((prev) => !prev)}
          mb={2}
        >
          <Body>Plan not in the list?</Body>
        </Flex>
        <Box my={4}>
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            ROP Application
          </Text>
          <Body>Search Your Planholder Record for ROP Application</Body>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(2, 1fr)" gap="8px 25px">
            {/* Left: File Upload */}

            {/* <FileUpload
                  id="govId"
                  label="Government issued ID with signature"
                /> */}
            {/* <UploadFile />
             */}

            {/* <Box flex="1" minW="300px"> */}
            <Box>
              <FloatingInput
                label="LPA Number"
                {...register("lpaNo")}
                error={errors.lpaNo?.message}
                disabled={isSubmitting}
              />
              <Text textStyle="xs" color="red">
                {errors.lpaNo?.message}
              </Text>
            </Box>

            <FileUpload.Root justifyContent={"center"}>
              <FileUpload.HiddenInput />

              <FileUpload.Context>
                {({ acceptedFiles }) => (
                  <Box
                    asChild
                    width="100%"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="sm"
                    textAlign="start"
                    boxSizing="border-box"
                    cursor="pointer"
                    p={2}
                    _hover={{ borderColor: "gray.400" }}
                    fontSize="sm"
                  >
                    <FileUpload.Trigger>
                      {/* Hide Small when file exists */}
                      {acceptedFiles.length === 0 ? (
                        <Text>Upload Valid ID Here</Text>
                      ) : (
                        <FileUpload.FileText />
                      )}
                    </FileUpload.Trigger>
                  </Box>
                )}
              </FileUpload.Context>
            </FileUpload.Root>

            <FloatingInput
              label="First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
              disabled={isSubmitting}
            />
            <FloatingInput
              label="Middle Name"
              {...register("middleName")}
              error={errors.middleName?.message}
              disabled={isSubmitting}
            />
            <FloatingInput
              label="Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
              disabled={isSubmitting}
            />
            <FloatingInput
              type="date"
              label="Birth Date"
              {...register("birthDate")}
              error={errors.birthDate?.message}
              disabled={isSubmitting}
            />
            <GridItem colSpan={2} textAlign="right">
              <DynamicButton
                mt="4"
                type="submit"
                disabled={isSubmitting}
                label={isSubmitting ? "Submitting..." : "Search"}
              />
            </GridItem>
          </Grid>
        </form>
      </Box>

      {/* Alert Modal */}
      <HStack>
        <Dialog.Root
          open={isAlert}
          onOpenChange={(details) => setAlert(details.open)}
          size="md"
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Success</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text>Search completed successfully</Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Close</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </HStack>
    </Box>
  );
};
