// Author: Jimwell Arvin L. Ocsio

import React from 'react'
import { type Claimant, type PhClaimant } from '../../models/types/claim.types';
import { Box, Button, CloseButton, Container, Dialog, FieldRoot, FileUpload, Flex, Grid, GridItem, Heading, Icon, Portal, Stack, Steps, Table, Text, useDisclosure } from '@chakra-ui/react';
import { LuUpload, LuUserRound } from 'react-icons/lu';
import { PlanholderForm } from '../../components/forms/PlanholderForm';
import SuccessPage from '../success-page/SuccessPage';
import { ClaimantCard } from '../../components/cards/ClaimantCard';
import { PrimaryMdButton, PrimarySmButton, SecondaryMdButton, SecondarySmButton } from 'st-peter-ui';
import { ClaimantPopUpForm } from '../../components/forms/ClaimantPopUpForm';

export const FileClaimPage = () => {
    // Summary:
    //      The variable responsible for the claimants list.
    const [claimantList, setClaimantList] = React.useState<Claimant[]>([]);

    // Summary:
    //      The variable resposible for the page number of the page.
    const [pageNumber, setPageNumber] = React.useState<number>(1);

    // Summary:
    //      Responsible for the changing of page number
    const onNextBtnClick = () => {
        if(pageNumber === 4)
        {
            setStepNumber(3);
            setOpenSubmitDialog(true); // open the dialog.
            return;
        }

        setPageNumber(pageNumber + 1);
        return;
    }

    // Summary:
    //      Responsible for the change of page number.
    const onPrevBtnClick = () => {
        if(pageNumber === 1)
            return;

        setPageNumber(pageNumber - 1);
    }

    // Summary:
    //      Responsible for the onclick event of submit button.
    const onSubmitBtnClick = () => {
        setStepNumber(4);
        setOpenSubmitDialog(false);
        Steps.CompletedContent;
        setPageNumber(5);
    }

    // Summary:
    //      Get the death of date into a readable for the user
    function getPhDeathDate()
    {
        let date = new Date(planholder.incidentDate);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric"
        });
    }

    // Summary:
    //      The title of the steps.
    const stepTitles = [
        "Documents",
        "Planholder",
        "Claimant's",
        "Review & Submit"
    ];

    // Summary:
    //      Responsible for the changing of status of steps.
    const [stepNumber, setStepNumber] = React.useState<number>(0);

    // Summary:
    //      Responsible for the closing and opening of the submit dialog
    const [openSubmitDialog, setOpenSubmitDialog] = React.useState<boolean>(false);

    // Summary:
    //      Variable that hold all the name of claims. This should be an API call and not a static
    const claimTypeList = ["Cash Assistance", "Extended Cash Assistance", "Accidental Death", "Unrendered Service"];

    // Summary:
    //      Resposible for the changing of the current benefits.
    const [currBenefitList, setCurrBenefitList] = React.useState<string[]>([]);

    // Summary:
    //      The container for the rendering of the current benefits in the form.
    const [currBenefitText, setCurrBenefitText] = React.useState<React.ReactNode>("");

    // Summary:
    //      The variable responsible for the data of Planholder.
    const [planholder, setPlanholder] = React.useState<PhClaimant>({lpaNumber: "", incidentDate: "1990/01/01", causeOfIncident: "", index: 0});

    // Summary:
    //      This variable is just for presentation purposes.
    const randomLpaList:string[] = [
        "L22676596I", "L226276595I", "L22852786H", "L24852786H",
        "L20626139I"
    ]

    // Summary:
    //      This function is just for presentation purposes only.
    const genRandomPh = () => {
        let randIndex = Math.floor(Math.random() * (randomLpaList.length - 1 - 0 + 1)) + 0;
        let randLpa = randomLpaList[randIndex] ?? "";
        
        let startDate = new Date('2023/01/01');
        let endDate = new Date('2025/11/11');
        let startTime = startDate.getTime();
        let endTime = endDate.getTime();
        let randomTime = startTime + Math.random() * (endTime - startTime);
        let randomDate = new Date(randomTime);
        setPlanholder({...planholder, incidentDate: `${randomDate.getFullYear()}-${(randomDate.getMonth() + 1).toString().padStart(2,'0')}-${randomDate.getDate().toString().padStart(2, '0')}`, lpaNumber: randLpa})
    }

    // Summary:
    //      As of now generate a random claims benefit for presentation. But this should be computed manually.
    const genRandomClaimBen = () => {
        let indexResult: number[] = [];
        for(let i = 0; i < claimTypeList.length; i++)
        {
            let randIndex = Math.floor(Math.random() * (claimTypeList.length - 1 - 0 + 1)) + 0;
            indexResult = [...indexResult, randIndex];
        }

        let benefits: string[] = [];
        claimTypeList.map((item, index) => {
            if(indexResult.includes(index))
                benefits = [...benefits, item];
        })

        let maxIndex: number = benefits.length - 1;
        let result: React.ReactNode = "";
        benefits.map((item, index) => {
            if(index === maxIndex)
                result = result?.toLocaleString().length === 0 ? <strong>{item} Benefit</strong> : <>{result}, and <strong>{item} Benefits</strong></>
            else
                result = result?.toLocaleString().length === 0 ? <strong>{item}</strong> : <>{result}, <strong>{item}</strong></>
        })

        setCurrBenefitList([...benefits]);
        setCurrBenefitText(result);
        return;
    }

    // Summary:
    //      Call the generate in the useEffect
    React.useEffect(() => {
        genRandomClaimBen();
        genRandomPh();
    }, []);


    const [claimantModel, setClaimantModel] = React.useState<Claimant>({
        index: 0,
        firstName: "",
        lastName: "",
        email: "",
        relToPh: "",
        payoutChannel: "",
        middleName: "",
        mobile: "",
        suffix: ""
    });

    const {open, onOpen, onClose} = useDisclosure();

    return (
        <Container
            display="flex" flexDirection="column" 
            height="fit-content" maxW="7xl" width="100%"
            gap="20px" padding="20px"
        >
            <Steps.Root defaultStep={0} count={stepTitles.length} step={stepNumber} onStepChange={(e) => setStepNumber(e.step)}>
                {(pageNumber < 5) && (
                    <>
                        <Container centerContent padding="0">
                            <Text textStyle="2xl" fontWeight="semibold">Claim Application</Text>
                        </Container>

                        <Container>
                            <Steps.List>
                                {stepTitles.map((step, index) => (
                                    <Steps.Item key={index} index={index} title={step} colorPalette="green">
                                        <Steps.Indicator />
                                        <Steps.Title display={{base:"block", mdDown:"none"}}>{step}</Steps.Title>
                                        <Steps.Separator />
                                    </Steps.Item> 
                                ))}
                            </Steps.List>
                        </Container>
                    </>
                )}

                <Container display="flex" flexDirection="column" gap="20px">
                    {(pageNumber === 1) && (
                        <>
                            <Box>
                                <Text textStyle="xl" fontWeight="semibold">Start Your Claim</Text>

                                <Text textStyle="md">
                                    Before submitting your application, please prepare the following documentation for your convenience in the next steps.
                                </Text>
                            </Box>

                            <Box padding="5px">
                                <Text textStyle="lg" fontWeight="semibold">Requirements:</Text>

                                <Container textStyle="md">
                                    <Box as="ol" listStyle="decimal" display="flex" flexDirection="column" gap="5px">
                                        <li>Registered Death Certificate with seal and issued by the Local Civil Registrar or Philippine Statistics Authority (PSA)</li>
                                        <li>Photocopy of Valid IDs of the Planholder (Government-issued ID's)</li>
                                        <li>Statement of Claimant Form</li>
                                        <li>Photocopy of Valid IDs of the Beneficiaries / Claimants (Government-issued ID's)</li>
                                        <li>Marriage Contract (If Claimant is the spouse or if the Planholder's daughter is already married)</li>
                                        <li>Medical History (If plan is less than 1 year or if cause of death is accident)</li>
                                        <li>Attending Physician's Statement</li>
                                    </Box>
                                </Container>

                                <Container display="flex" flexDirection="column" gap="10px" marginTop="10px" padding="20px 0">
                                    <Flex gap="15px">
                                        <Box width="100%">
                                            <Text textStyle="lg" fontWeight="semibold">Upload Documents</Text>
                                            <Box textStyle="md">Please upload the required documents listed in the previous step.</Box>
                                            <FileUpload.Root alignItems="stretch">
                                                <FileUpload.HiddenInput />
                                                <FileUpload.Dropzone>
                                                    <Icon size="md" color="fg.muted">
                                                        <LuUpload />
                                                    </Icon>

                                                    <FileUpload.DropzoneContent>
                                                        <Box>Drag and drop files here.</Box>
                                                        <Box color="fg.muted">
                                                            Upload the required documents in PDF.
                                                        </Box>
                                                    </FileUpload.DropzoneContent>
                                                </FileUpload.Dropzone>
                                                <FileUpload.List clearable />
                                            </FileUpload.Root>
                                        </Box>

                                        <FieldRoot></FieldRoot>
                                    </Flex>
                                </Container>
                            </Box>
                        </>
                    )}

                    {(pageNumber === 2) && (
                        <PlanholderForm value={planholder} onValueChange={setPlanholder} benefitText={currBenefitText} />
                    )}

                    {(pageNumber === 3) && (
                        <>
                            {/* <ClaimantForm onClaimantEvent={setClaimantList} value={claimantList} /> */}
                            <Box>
                                <Heading size="xl" fontWeight="bold">Claimant(s)</Heading>
                                <Text fontSize="sm" fontStyle={"italic"}>
                                    Provide the necessary details of the claimant(s) who will be receiving the claim benefits on behalf of the planholder.
                                </Text>

                                <Stack direction="column" gap="10px" padding="5px">
                                    <Box display="flex" gap="5px" justifyContent="space-between" alignItems="center" width="100%">
                                        <Text textStyle={"md"} fontWeight="semibold">
                                            Record(s): {claimantList.length}
                                        </Text>

                                        <Dialog.Root open={open} size="xl" placement="center">
                                            <Dialog.Trigger asChild>
                                                <SecondarySmButton onClick={onOpen}>Add Claimant</SecondarySmButton>
                                            </Dialog.Trigger>

                                            <Portal>
                                                <Dialog.Backdrop />
                                                <Dialog.Positioner>
                                                    <Dialog.Content>
                                                        <Dialog.Body>
                                                            <ClaimantPopUpForm value={claimantModel}
                                                                onCancel={() => {
                                                                    setClaimantModel({
                                                                        index: 0,
                                                                        firstName: "",
                                                                        lastName: "",
                                                                        email: "",
                                                                        relToPh: "",
                                                                        payoutChannel: "",
                                                                        middleName: "",
                                                                        mobile: "",
                                                                        suffix: ""
                                                                    });
                                                                    onClose();
                                                                }}  

                                                                onSubmit={(value) => {
                                                                    const maxIndex = claimantList.length > 0 ? Math.max(...claimantList.map(item => item.index)) + 1 : 1;
                                                                    const newClaimantList = [...claimantList, {...value, index: maxIndex}];
                                                                    setClaimantList(newClaimantList);
                                                                    setClaimantModel(
                                                                        {
                                                                        index: 0,
                                                                        firstName: "",
                                                                        lastName: "",
                                                                        email: "",
                                                                        relToPh: "",
                                                                        payoutChannel: "",
                                                                        middleName: "",
                                                                        mobile: "",
                                                                        suffix: ""
                                                                    });
                                                                    onClose();
                                                                }}
                                                            />
                                                        </Dialog.Body>
                                                    </Dialog.Content>
                                                </Dialog.Positioner>
                                            </Portal>
                                        </Dialog.Root>
                                    </Box>

                                    {claimantList.length === 0 ? (
                                        <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column" minHeight="200px" 
                                            borderRadius="4px" background="gray.50" boxShadow="sm"
                                        >
                                            <LuUserRound size="40px" color="#a1a1aa" />
                                            <Text textStyle="sm" color="#a1a1aa">No claimant's added.</Text>
                                        </Box>
                                    )
                                    : (
                                        <Stack direction="column" gap="5px">
                                            {claimantList.map((item, index) => (
                                                <ClaimantCard key={index} value={item} onValueChange={(e)=> {
                                                    let filteredList = claimantList.filter((item, i) => item.index !== e.index);
                                                    let newList = [...filteredList, e];
                                                    let sortedList = newList.sort((a, b) => a.index - b.index);
                                                    setClaimantList(sortedList);
                                                }}/>
                                            ))}
                                        </Stack>
                                    )}
                                </Stack>
                            </Box>
                        </>
                    )}

                    {(pageNumber === 4) && (
                        <>
                            <Stack direction="column" gap="0">
                                <Box textStyle="xl" fontWeight="bold" w="100%">Claim Summary</Box>

                                <Box as="div" padding="5px">
                                    <Text textStyle="md" fontWeight="semibold" borderBottom="1px solid #a1a1aa" paddingBottom="5px" marginBottom="10px">Planholder Details</Text>

                                    <Box display="flex" flexDirection="column" gap="1" padding="5px">
                                        <Grid templateColumns="repeat(2, 1fr)" gap="5">
                                            <GridItem>
                                                <Stack gap="2" direction="row">
                                                    <Text textStyle="sm" fontWeight="semibold">LPA Number:</Text>
                                                    <Text textStyle="sm">{planholder.lpaNumber}</Text>
                                                </Stack>
                                            </GridItem>

                                            <GridItem>
                                                <Stack gap="2" direction="row">
                                                    <Text textStyle="sm" fontWeight="semibold">Date of Death:</Text>
                                                    <Text textStyle="sm">{getPhDeathDate()}</Text>
                                                </Stack>
                                            </GridItem>
                                        </Grid>

                                        <Grid templateColumns="repeat(2, 1fr)" gap="5">
                                            <GridItem>
                                                <Stack gap="2" direction="row">
                                                    <Text textStyle="sm" fontWeight="semibold" flexShrink={0}>Cause of Death:</Text>
                                                    <Text textStyle="sm">{planholder.causeOfIncident}</Text>
                                                </Stack>
                                            </GridItem>

                                            <GridItem>
                                                <Stack gap="2" direction="row">
                                                    <Text textStyle="sm" fontWeight="semibold" flexShrink={0}>Claim Benefits:</Text>
                                                    <Box as="ul" display="flex" flexDirection="column" gap="1px">
                                                        {currBenefitList.map((item, index) => (
                                                            <li key={index}>{item} Benefit</li>
                                                        ))}
                                                    </Box>
                                                </Stack>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                </Box>

                                <Box as="div" padding="5px">
                                    <Box 
                                        borderBottom="1px solid #a1a1aa" 
                                        paddingBottom="5px" marginBottom="15px"
                                        display="flex" justifyContent="space-between">
                                        <Text textStyle="md" fontWeight="semibold">
                                            Claimant(s)
                                        </Text>

                                        <Text textStyle="md" fontWeight="initial">
                                            Record(s): {claimantList.length}
                                        </Text>
                                    </Box>
                                    
                                    <Box padding="5px">
                                        <Table.Root size="lg" variant="outline">
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.ColumnHeader></Table.ColumnHeader>
                                                    <Table.ColumnHeader textAlign="center">Contacts</Table.ColumnHeader>
                                                    <Table.ColumnHeader textAlign="center">Payout Channel</Table.ColumnHeader>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                {claimantList.map((model) => (
                                                    <Table.Row key={model.index}>
                                                        <Table.Cell>
                                                            <Stack gap="0" textAlign="center">
                                                                <Text textStyle="sm" fontWeight="semibold">{model.firstName} {model.middleName ?? ""} {model.lastName} {model.suffix ?? ""}</Text>
                                                                <Text textStyle="xs">{model.relToPh}</Text>
                                                            </Stack>
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            <Text textStyle="xs" textAlign="center">{model.email} {(model.mobile == "" || model.mobile == null) ? "" : "- " + model.mobile}</Text>
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            <Text textStyle="xs" textAlign="center">{model.payoutChannel}</Text>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table.Root>
                                    </Box>
                                </Box>
                            </Stack>

                        </>
                    )}

                    {(pageNumber === 5) && (
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Box>
                                <SuccessPage title="Thank You!" description={`
                                    Your application has been completed successfully. We will notify you via email when there is an update.
                                `
                                } 
                                transactionId={`CL-${Math.floor(Math.random() * 1000000000)}`}
                                dateTime={new Date().toLocaleString()} />
                            </Box>
                        </Box>
                    )}

                    <Box display="flex" gap="10px" flexDirection="row" justifyContent="space-between" marginTop="auto">
                        <Steps.PrevTrigger asChild>
                            <SecondaryMdButton onClick={onPrevBtnClick} visibility={(pageNumber > 1 && pageNumber < 5) ? "visible" : "hidden"}>Previous</SecondaryMdButton>
                        </Steps.PrevTrigger>

                        {(pageNumber < 5) && (
                            <Steps.NextTrigger asChild>
                                <PrimaryMdButton onClick={onNextBtnClick}>{(pageNumber) >= 4 ? "Submit" : "Next"}</PrimaryMdButton>
                            </Steps.NextTrigger>
                        )}
                    </Box>
                </Container>
            </Steps.Root>

            <Dialog.Root lazyMount open={openSubmitDialog} onOpenChange={(e) => {setOpenSubmitDialog(e.open)}}>
                <Dialog.Trigger asChild>
                    <Button variant="outline" size="sm" visibility="hidden" position="absolute" zIndex={-1}>
                        Open Dialog
                    </Button>
                </Dialog.Trigger>

                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Confirm Submission</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Text>
                                    You have reached the end of the form. Submitting will finalize
                                    all the information you provided. Would you like to submit the claim?
                                </Text>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline" onClick={() => setStepNumber(3)}>Cancel</Button>
                                </Dialog.ActionTrigger>

                                <Button onClick={onSubmitBtnClick}>Submit</Button>
                            </Dialog.Footer>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" onClick={() => setStepNumber(3)} />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Container>
    )
}
