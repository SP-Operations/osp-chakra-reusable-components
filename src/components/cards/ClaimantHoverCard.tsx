// Author: Jimwell Arvin L. Ocsio

import React from 'react'
import type { ClaimantHoverCardParams } from '../../models/types/claim.types'
import { Box, Button, Dialog, HoverCard, Portal, Stack, Text } from '@chakra-ui/react';
import { InputFloatingLabel } from 'st-peter-ui';

export const ClaimantHoverCard = (params: ClaimantHoverCardParams) => {
    // Summary:
    //      Responsible for the opening and closing of the hover card.
    const [openCard, setOpenCard] = React.useState<boolean>(false);

    // Summary:
    //      The Claimant model of the card.
    const claimant = {...params.claimant};

    // Summary:
    //      Responsible for the update and rendering of the new value of the Claimant.
    const setClaimant = params.setClaimant;

    // Summary:
    //      Responsible for the update and rendering of the new value of relationship to planholder.
    const setRelToPh = params.setRelToPh;

    // Summary:
    //      Resposible for the update and rendering of the new value of the payout channel.
    const setPayoutChannel = params.setPayoutChannel;

    // Summary:
    //      Responsible for the event of continue button.
    const onContinueClick = params.onContinueClick;

    // Summary:
    //      Responsible for the button click event of edit.
    const onEditClick = () => {
        setClaimant({...claimant});
        setPayoutChannel([claimant.payoutChannel]);
        setRelToPh([claimant.relToPh]);
        closeHoverCard();
    }

    // Summary:
    //      Responsible for the closing of hover card.
    const closeHoverCard = () => {
       setOpenCard(false);
    }

    return (
        <HoverCard.Root size="lg" open={openCard} onOpenChange={(e) => {setOpenCard(e.open);}}>
            <HoverCard.Trigger asChild>
                <Button variant="outline" display="flex" flexDirection="column" gap="0" padding="5px" height="fit-content">
                    <Box textStyle="xs">{claimant.firstName} {claimant.lastName}</Box>
                    <Box textStyle="2xs">{claimant.relToPh}</Box>
                </Button>
            </HoverCard.Trigger>

            <Portal>
                <HoverCard.Positioner>
                    <HoverCard.Content backgroundColor="bg.muted" borderColor="border">
                        <HoverCard.Arrow />
                        <Stack gap="4">
                            <Stack gap="2" direction="row">
                                <InputFloatingLabel label="Last Name" name="lastName" value={claimant.lastName} readOnly />
                                <InputFloatingLabel label="First Name" name="firstName" value={claimant.firstName} />
                            </Stack>

                            <Stack gap="2" direction="row">
                                <InputFloatingLabel label="Middle Name" name="middleName" value={claimant.middleName} />
                                <InputFloatingLabel label="Suffix" name="suffix" value={claimant.suffix} />
                            </Stack>

                            <InputFloatingLabel label="Email" name="email" value={claimant.email} />

                            <InputFloatingLabel label="Mobile Number" name="mobile" value={claimant.mobile} />

                            <Stack gap="2" direction="row">
                                <InputFloatingLabel label="Relationship" name="relationship" value={claimant.relToPh} />

                                <InputFloatingLabel label="Payout Channel" name="payoutChannel" value={claimant.payoutChannel} />
                            </Stack>

                            <Stack gap="2" direction="row" justifyContent="flex-end" marginTop="20px">
                                <Button variant="subtle" onClick={onEditClick}>Edit</Button>

                                <Dialog.Root role="alertdialog">
                                    <Dialog.Trigger asChild>
                                        <Button variant="solid" colorPalette="red" onClick={closeHoverCard}>Delete</Button>
                                    </Dialog.Trigger>

                                    <Portal>
                                        <Dialog.Backdrop />
                                        <Dialog.Positioner>
                                            <Dialog.Content>
                                                <Dialog.Header>
                                                    <Dialog.Title>Are you sure?</Dialog.Title>
                                                </Dialog.Header>

                                                <Dialog.Body>
                                                    <Text textStyle="sm">
                                                        You're about to remove <strong>{claimant.firstName} {claimant.lastName}</strong> as a claimant.
                                                        This action cannot be undone. Are you sure you want to continue?
                                                    </Text>
                                                </Dialog.Body>

                                                <Dialog.Footer>
                                                    <Dialog.ActionTrigger asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </Dialog.ActionTrigger>

                                                    <Dialog.ActionTrigger asChild>
                                                        <Button colorPalette="red" onClick={onContinueClick}>Continue</Button>
                                                    </Dialog.ActionTrigger>
                                                </Dialog.Footer>
                                            </Dialog.Content>
                                        </Dialog.Positioner>
                                    </Portal>
                                </Dialog.Root>
                            </Stack>
                        </Stack>
                    </HoverCard.Content>
                </HoverCard.Positioner>
            </Portal>
        </HoverCard.Root>
    )
}
