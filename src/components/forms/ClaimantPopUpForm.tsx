import React from 'react'
import { InputFloatingLabel, PrimaryMdButton, PrimarySmButton, SecondaryMdButton, SecondarySmButton } from 'st-peter-ui'
import { Box, createListCollection, FieldRoot, FileUpload, Flex, Icon, Portal, Select, Text } from '@chakra-ui/react'
import { LuUpload } from 'react-icons/lu';
import { FileInput } from 'lucide-react';
import type { Claimant, ClaimantPopUpFormParams } from '../../models/types/claim.types';
import { set } from 'zod';

export const ClaimantPopUpForm = (params: ClaimantPopUpFormParams) => {
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
    //      Responsible for updating relationship to planholder.
    const [relToPh, setRelToPh] = React.useState<string[]>([params.value.relToPh]);


    // Summary:
    //      The list of all payout channels.
    const payoutChannels = createListCollection({
        items: ["Bank Transfer", "Check", "Mobile Wallet"]
    });

    // Summary:
    //      Responsible for updating the value of payout channel.
    const [payoutChannel, setPayoutChannel] = React.useState<string[]>([params.value.payoutChannel]);

    // Summary:
    //      The claimant model used in the form.
    const [claimant, setClaimant] = React.useState<Claimant>({...params.value});

    return (
    <>
        <Box>
            <Text textStyle="lg" fontWeight="semibold">Claimant Information</Text>
            <Text textStyle="sm" fontWeight="initial">Please provide the following information.</Text>
        </Box>

        <Flex padding="5px" gap="10px" flexDirection="column" marginTop="5px">
            <Flex gap="15px">
                <InputFloatingLabel 
                    name="lastName" 
                    label="Last Name" 
                    onChange={(e) => setClaimant({...claimant, lastName: e.target.value})}
                    value={claimant.lastName}
                />
                
                <InputFloatingLabel 
                    name="firstName" 
                    label="First Name"
                    onChange={(e) => setClaimant({...claimant, firstName: e.target.value})}
                    value={claimant.firstName}
                />
            </Flex>

            <Flex gap="15px">
                <InputFloatingLabel 
                    name="middleName" 
                    label="Middle Name" 
                    onChange={(e) => setClaimant({...claimant, middleName: e.target.value})}
                    value={claimant.middleName}
                />

                <InputFloatingLabel 
                    name="suffix"
                    label="Suffix" 
                    onChange={(e) => setClaimant({...claimant, suffix: e.target.value})}
                    value={claimant.suffix}
                />
            </Flex>

            <Flex gap="15px">
                <InputFloatingLabel 
                    name="email" 
                    label="Email Address"
                    onChange={(e) => setClaimant({...claimant, email: e.target.value})}
                    value={claimant.email}
                />

                <InputFloatingLabel 
                    name="mobile" 
                    label="Mobile Number" 
                    onChange={(e) => setClaimant({...claimant, mobile: e.target.value})}
                    value={claimant.mobile}
                />
            </Flex>

            <Flex display="flex" gap="15px">
                <Select.Root collection={relationship}
                    value={relToPh}
                    onValueChange={(e) => {
                        const value = e.value[0] ?? "";
                        setRelToPh([value]);
                        setClaimant({...claimant, relToPh: value});
                    }}
                >
                    <Select.HiddenSelect />
                    <Select.Label>Relationship To Planholder</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select Relationship" />
                        </Select.Trigger>

                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>

                        <Select.Positioner>
                            <Select.Content>
                                {relationship.items.map((rel) => (
                                    <Select.Item item={rel} key={rel}>
                                        {rel}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Select.Control>
                </Select.Root>


                <Select.Root collection={payoutChannels}
                    value={payoutChannel}
                    onValueChange={(e) => {
                        const value = e.value[0] ?? "";
                        setPayoutChannel(e.value as string[]);
                        setClaimant({...claimant, payoutChannel: value});
                    }}
                >
                    
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

                    <Select.Positioner>
                        <Select.Content>
                            {payoutChannels.items.map((channel) => (
                                <Select.Item item={channel} key={channel}>
                                    {channel}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Select.Root>
            </Flex>

            <Flex gap="15px">
                <FileUpload.Root alignItems="stretch">
                    <FileUpload.HiddenInput />
                    <FileUpload.Label>Upload Supporting Document</FileUpload.Label>
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

                <FieldRoot>

                </FieldRoot>
            </Flex>

        </Flex>

        <Flex justify="space-between" mt="5px">
            <SecondaryMdButton onClick={params.onCancel}>Cancel</SecondaryMdButton>
            <PrimaryMdButton onClick={() => params.onSubmit(claimant)}>{claimant.index > 0 ? "Save" : "Add"}</PrimaryMdButton>
        </Flex>
    </>
    )
}
