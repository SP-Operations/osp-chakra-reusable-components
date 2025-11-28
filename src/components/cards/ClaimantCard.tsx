
import { Checkbox, CheckboxCard, Dialog, Heading, Portal, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { LuInfo } from 'react-icons/lu';
import { BaseButton, SecondarySmButton } from 'st-peter-ui';
import { ClaimantPopUpForm } from '../forms/ClaimantPopUpForm';
import type { Claimant, ClaimantCardParams } from '../../models/types/claim.types';
import { param } from 'framer-motion/client';

export const ClaimantCard = (params: ClaimantCardParams) => {


    // Summary:
    //     Chakra UI's useDisclosure hook for managing the open and close state of the card.
    const {open, onOpen, onClose} = useDisclosure();
    
    const [isChecked, setIsChecked] = React.useState<boolean>(false);
    const [claimant, setClaimant] = React.useState<Claimant>({...params.value});

    return (
        <>
            <CheckboxCard.Root variant="subtle" colorPalette="green" cursor="pointer" onClick={onOpen} checked={isChecked}>

                <CheckboxCard.Control>
                    <CheckboxCard.Indicator />

                    <CheckboxCard.Content>
                        <CheckboxCard.Label>{claimant.firstName} {claimant.middleName ?? "" } {claimant.lastName}</CheckboxCard.Label>
                        <CheckboxCard.Description>Full Name</CheckboxCard.Description>
                    </CheckboxCard.Content>

                    <CheckboxCard.Content>
                        <CheckboxCard.Label>{claimant.relToPh}</CheckboxCard.Label>
                        <CheckboxCard.Description>Relationship</CheckboxCard.Description>
                    </CheckboxCard.Content>

                    <CheckboxCard.Content>
                        <CheckboxCard.Label>{claimant.email}</CheckboxCard.Label>
                        <CheckboxCard.Description>Email</CheckboxCard.Description>
                    </CheckboxCard.Content>

                    <CheckboxCard.Content>
                        <CheckboxCard.Label>{claimant.mobile}</CheckboxCard.Label>
                        <CheckboxCard.Description>Mobile</CheckboxCard.Description>
                    </CheckboxCard.Content>

                    <CheckboxCard.Content>
                        <CheckboxCard.Label>{claimant.payoutChannel}</CheckboxCard.Label>
                        <CheckboxCard.Description>Payout Channel</CheckboxCard.Description>
                    </CheckboxCard.Content>

                    <SecondarySmButton onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                    }}>
                        View Details
                    </SecondarySmButton>
                </CheckboxCard.Control>

            </CheckboxCard.Root>

            <Dialog.Root open={open} onOpenChange={onClose} size="xl" placement="center">
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Body>
                                <ClaimantPopUpForm 
                                    value={claimant} 
                                    onCancel={() => {
                                        setClaimant({...params.value});
                                        onClose();
                                    }} 
                                    onSubmit={(e) => {
                                        setClaimant({...e});
                                        params.onValueChange(e);
                                        onClose();
                                    }}
                                />
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}
