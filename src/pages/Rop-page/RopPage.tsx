"use client";

import {
  Card,
  Box,
  Heading,
  ListItem,
  Flex,
  Button,
  Text,
  List,
  Collapsible,
  Dialog,
  HStack,
  Portal,
  CloseButton,
  Steps,
} from "@chakra-ui/react";
import { useState } from "react";
import { RopPlanListForm } from "../../components/forms/RopPlanListForm";
import { RopSearchFormSchema } from "../../models/schema/RopSchema";
import type { IRopSchema, ISearchRopForm } from "../../models/types/rop.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mock, stepper } from "../../models/schema/RopMock";
import { FileUpload } from "../../components/others/FileUpload";
import { H2, PrimaryMdFlexButton } from "st-peter-ui";
import { FloatingInput } from "../../components/others/FloatingInput";

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
    <Card.Root maxW="5xl" p="4" boxShadow="sm" colorPalette={"green"}>
      <Card.Body>
        <Steps.Root defaultStep={0} count={stepper.length} mb="8">
          <Steps.List>
            {stepper.map((step, index) => (
              <Steps.Item key={index} index={index} title={step.title}>
                <Steps.Indicator />
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
        </Steps.Root>

        {/* Instructions */}
        <Box mb="4">
          <H2>RETURN OF PREMIUM</H2>
        </Box>
        <Box mb="6">
          {/* <Text textStyle="sm"> */}
          <Heading size="md" mb="2">
            Please prepare a scanned copy of the following required documents
          </Heading>
          <List.Root textStyle="sm" ml="4">
            <ListItem>
              One (1) valid Government issued ID with signature
            </ListItem>
            <ListItem>
              Three (3) Specimen Signatures or right thumbmark, if unable to
              write
            </ListItem>
            <ListItem>
              Proof of account must contain your account name, account number,
              and bank name
              <List.Root ml="6" mt="1">
                <ListItem>
                  Bank Account validated cash/cheque deposit slip at least six
                  (6) months from the last date of transaction
                </ListItem>
                <ListItem>
                  eWallet (GCash) screenshot of mobile app account. Fully
                  verified account with profile picture is required
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
            <Text ml={2}>Plan not in the list?</Text>
          </Flex>

          <Collapsible.Root open={showSearch}>
            <Flex gap="8" flexWrap="wrap">
              {/* Left: File Upload */}
              <Box flex="1" minW="300px">
                <Text mb="4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
                <FileUpload
                  id="govId"
                  label="Government issued ID with signature"
                />
              </Box>

              {/* Right: ROP Form */}
              <Box flex="1" minW="300px">
                <Heading size="md" mb="2">
                  ROP Application
                </Heading>
                <Text mb="4">
                  Search Your Planholder Record for ROP Application
                </Text>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <FloatingInput
                    label="LPA Number"
                    {...register("lpaNo")}
                    error={errors.lpaNo?.message}
                    disabled={isSubmitting}
                  />
                  <Text textStyle="xs" color="red">
                    {errors.lpaNo?.message}
                  </Text>
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

                  <PrimaryMdFlexButton
                    mt="4"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Search"}
                  </PrimaryMdFlexButton>
                </form>
              </Box>
            </Flex>
          </Collapsible.Root>
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
      </Card.Body>
    </Card.Root>
  );
};
