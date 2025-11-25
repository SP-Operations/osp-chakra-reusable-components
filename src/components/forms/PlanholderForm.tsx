// Author: Jimwell Arvin L. Ocsio

import React from 'react'
import { Box, createListCollection, Field, Select, Text, Textarea } from '@chakra-ui/react'
import type { PlanholderFormParams } from '../../models/types/claim.types'
import { InputFloatingLabel } from 'st-peter-ui'

export const PlanholderForm = (params: PlanholderFormParams) => {

    const causeOfIncidentList = createListCollection({
        items: [
            "Car Accident", "Natural Death", "Murder", "Suicide", "Motorcycle Accident",
            "Drowning", "Fire", "Gunshot Wound", "Stab Wound", "Blunt Force Trauma"
        ]
    });

    const [causeOfIncident, setCauseOfIncident] = React.useState<string[]>([params.value.causeOfIncident]);

    return (
        <>
            <Box>
                <Text textStyle="xl" fontWeight="semibold" mb="0.5">Planholder Details</Text>
                <Text textStyle="sm" fontWeight="initial">
                    You are eligible for {params.benefitText}. However, please note that your claims is subject for review and approval.
                    Please provide the following information to complete your claim request.
                </Text>
            </Box>

            <Box padding="5px">
                <Box display="flex" gap="15px">
                    <InputFloatingLabel name="lpaNumber" label="LPA Number" value={params.value.lpaNumber} onChange={(e) => params.onValueChange({...params.value, lpaNumber: e.target.value})} />
                    <InputFloatingLabel type="date" name="dateOfDeath" label="Date of Death" value={params.value.incidentDate} 
                        onChange={(e) => {
                            params.onValueChange({...params.value, incidentDate: e.target.value});
                            console.log(e.target.value);
                        }} 
                    />
                </Box>

                <Box display="flex" gap="15px">
                    <Select.Root collection={causeOfIncidentList} 
                        value={causeOfIncident}
                        onValueChange={(e) => {
                            const value = e.value[0] ?? "";
                            setCauseOfIncident([value]);
                            params.onValueChange({...params.value, causeOfIncident: value});
                        }}
                    >
                        <Select.HiddenSelect />
                        <Select.Label>Cause of Death</Select.Label>
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Select Cause of Death" />
                            </Select.Trigger>

                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>

                            <Select.Positioner>
                                <Select.Content>
                                    {causeOfIncidentList.items.map((cause) => (
                                        <Select.Item key={cause} item={cause}>
                                            {cause}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Select.Control>
                    </Select.Root>

                    <Field.Root>

                    </Field.Root>
                </Box>
            </Box>
        </>
    )
}
