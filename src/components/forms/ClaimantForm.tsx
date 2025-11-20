// Author By: Jimwell Arvin L. Ocsio

import React from 'react'
import type { Claimant, ClaimantFormParams } from '../../models/types/claim.types'
import { Box, Button, createListCollection, FileUpload, Grid, GridItem, Icon, Portal, Select, Text } from '@chakra-ui/react'
import { InputFloatingLabel } from 'st-peter-ui';
import { LuUpload, LuUserRound } from 'react-icons/lu'
import { ClaimantHoverCard } from '../cards/ClaimantHoverCard';

export const ClaimantForm = (params: ClaimantFormParams) => {
    // Summary:
    //      The list of relationship that will be used in teh selection of claimant relationship
    const relationship = createListCollection({
        items: [
            "Auntie", "Brother", "Brother-In-Law", "Common-Law", "Cousin", "Daughter", "Daughter-In-Law",
            "Father", "Father-In-Law", "Friend", "Granddaughter", "Grandfather", "Grandmother",
            "Grandson", "Guardian", "Husband", "Mother", "Mother-In-Law", "Nephew", "Niece", "Sister", "Sister-In-Law",
            "Son", "Son-In-Law", "Spouse", "Uncle", "Wife", "Not Applicable"
        ]
    });

    // Summary:
    //      The list of all payout channels.
    const payoutChannels = createListCollection({
        items: ["Bank Transfer", "Check", "Mobile Wallet"]
    });

    // Summary:
    //      Responsible for the updating of value of claimant
    const [claimant, setClaimant] = React.useState<Claimant>({
        index: 0,
        firstName: "",
        lastName: "",
        email: "",
        relToPh: "",
        payoutChannel: "",
        middleName: "",
        mobile: "",
        suffix: ""
    })

    // Summary:
    //      Responsible for updating the value of claimant list.
    const [claimantList, setClaimantList] = React.useState<Claimant[]>([...params.value]);

    // Summary:
    //      Responsible for updating the value of payout channel.
    const [payoutChannel, setPayoutChannel] = React.useState<string[]>([]);

    // Summary:
    //      Responsible for updating relationship to planholder.
    const [relToPh, setRelToPh] = React.useState<string[]>([]);

    // Summary:
    //      Responsible for reseting the form.
    const resetForm = () => {
        setClaimant({
            index: 0,
            firstName: "",
            lastName: "",
            middleName: "",
            suffix: "",
            relToPh: "",
            payoutChannel: "",
            email: "",
            mobile: ""
        });

        setRelToPh([]);
        setPayoutChannel([]);
    }

    // Summary:
    //      Responsible for updating the value of Claimant list.
    const updateClaimantList = () => {
        
        // Note:
        //      If the claimant index is zero(0) this means that the claimant
        //      is for adding in the list.
        if(claimant.index === 0)
        {
            const maxIndex = claimantList.length > 0 ? Math.max(...claimantList.map(item => item.index)) + 1 : 1;
            const newClaimantList = [...claimantList, {...claimant, index: maxIndex}];
            setClaimantList(newClaimantList);
            params.onClaimantEvent(newClaimantList);
            resetForm();
            return;
        }

        // Note:
        //      If the index of the claimant is not zero(0) it means
        //      that the claiant is for editing.
        const tmpClaimantList = claimantList.filter((item) => item.index !== claimant.index); // We remove the claimant for editing in the list.

        // We add the updated claimant value in the list.
        const newClaimantList = [...tmpClaimantList, claimant]; 

        // We sort the list to make there is no changes in the UI.
        const newClaimantListSort = newClaimantList.sort((a, b) => a.index - b.index); 
        
        // We update the claimant list.
        setClaimantList(newClaimantListSort);

        // Update the parent variable.
        params.onClaimantEvent(newClaimantListSort);

        resetForm();
        return;
    }

  return (
    <>
        <Box>
            <Text textStyle="md" fontWeight="semibold">Claimant's Information</Text>
            <Box textStyle="sm">Please provide the following information.</Box>
        </Box>

        <Grid templateColumns="1fr 250px">
            <GridItem padding="10px" display="flex" flexDirection="column" gap="10px">
                <Box display="flex" gap="15px">
                    <InputFloatingLabel name="lastName" label="Last Name" value={claimant.lastName} onChange={(e) => setClaimant({...claimant, lastName: e.target.value })} />
                    <InputFloatingLabel name="firstName" label="First Name" value={claimant.firstName} onChange={(e) => setClaimant({...claimant, firstName: e.target.value})} />
                    <InputFloatingLabel name="middleName" label="Middle Name" value={claimant.middleName} onChange={(e) => setClaimant({...claimant, middleName: e.target.value})} />

                    <Box maxW="100px" flexShrink={0}>
                        <InputFloatingLabel name="suffix" label="Suffix" value={claimant.suffix} onChange={(e) => setClaimant({...claimant, suffix: e.target.value})} />
                    </Box>
                </Box>

                <Box display="flex" gap="15px">
                    <InputFloatingLabel name="email" label="Email Address" value={claimant.email} onChange={(e) => setClaimant({...claimant, email: e.target.value})} />
                    <InputFloatingLabel name="mobile" label="Mobile Number" value={claimant.mobile} onChange={(e) => setClaimant({...claimant, mobile: e.target.value})} />
                </Box>

                <Box display="flex" gap="15px">
                    <Select.Root collection={relationship} onValueChange={(e) => {
                        const value = e.value[0] ?? "";
                        setRelToPh([value]);
                        setClaimant({...claimant, relToPh: value})
                    }} value={relToPh}>
                        <Select.HiddenSelect />
                        <Select.Label>Relationship to Planholder</Select.Label>
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder='Select Relationship' />
                            </Select.Trigger>

                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>

                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {relationship.items.map((rel) => (
                                            <Select.Item item={rel} key={rel}>
                                                {rel}
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Control>
                    </Select.Root>
                    <Select.Root collection={payoutChannels} onValueChange={(e) =>{
                        const value = e.value[0] ?? '';
                        setPayoutChannel(e.value as string[]);
                        setClaimant({...claimant, payoutChannel: value})
                    }} value={payoutChannel}>
                        <Select.HiddenSelect />
                        <Select.Label>Payout Channel</Select.Label>
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Select Payout Channel" />
                            </Select.Trigger>

                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>

                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {payoutChannels.items.map((channel) => (
                                        <Select.Item item={channel} key={channel}>
                                            {channel}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </Box>

                <Box display="flex" gap="15px">
                    <FileUpload.Root alignItems="stretch">
                        <FileUpload.HiddenInput />
                        <FileUpload.Label>Upload Supporting Document</FileUpload.Label>
                        <FileUpload.Dropzone>
                            <Icon size="md" color="fg.muted">
                                <LuUpload />
                            </Icon>

                            <FileUpload.DropzoneContent>
                                <Box>Drage and drop files here.</Box>
                                <Box color="fg.muted">
                                    Upload the required documents in PDF.
                                </Box>
                            </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                        <FileUpload.List clearable />
                    </FileUpload.Root>
                </Box>

                <Box display="flex" gap="10px" justifyContent="flex-end" marginTop="auto">
                    <Button variant="ghost" color="red" onClick={resetForm}>Clear</Button>
                    <Button variant="outline" onClick={updateClaimantList}>{claimant.index === 0 ? "Add" : "Save"}</Button>
                </Box>
            </GridItem>

            <GridItem 
                padding="7px 10px" 
                borderColor="border" borderWidth="1px" borderStyle="solid" borderRadius="3px" 
                background="bg.muted"
                colorPalette="teal"
            >
                {claimantList.length !== 0 && (
                    <Box display="flex" alignItems="center" padding="10px 0" marginBottom="10px" borderBottomColor="border" borderBottomWidth="1px" borderBottomStyle="solid">
                        <LuUserRound size="20px" />
                        <Text>Claimnat's</Text>
                    </Box>
                )}

                <Box textStyle="md" display="flex" flexDirection="column" gap="10px" height="100%" padding="0 5px">
                    {claimantList.map((model) => (
                        <ClaimantHoverCard 
                            claimant={model}
                            setClaimant={setClaimant}
                            setPayoutChannel={setPayoutChannel}
                            setRelToPh={setRelToPh}
                            onContinueClick={() => {
                                const newClaimantList = claimantList.filter((item) => item.index !== model.index);
                                setClaimantList(newClaimantList);
                            }}
                            key={model.index.toString()} />
                    ))}

                    {claimantList.length === 0 && (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column">
                            <LuUserRound size="40px" color="#a1a1aa" />
                            <Text textStyle="sm" color="#a1a1aa">No claimant's added.</Text>
                        </Box>
                    )}
                </Box>
            </GridItem>
        </Grid>
    </>
  )
}
