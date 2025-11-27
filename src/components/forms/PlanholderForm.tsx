// Author: Jimwell Arvin L. Ocsio

import React from 'react'
import { Box, createListCollection, Field, Grid, GridItem, Select, Separator, Stack, Text, Textarea } from '@chakra-ui/react'
import type { PlanholderFormParams } from '../../models/types/claim.types'
import { Body, H3, InputFloatingLabel } from 'st-peter-ui'
import { UploadFile } from '../others/UploadFile'

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
                <Box>
                    <H3>Planholder</H3>
                    <Body textStyle="md" mb="1">Please provide the following information about the planholder.</Body>
                </Box>

                <Box padding="5px">
                    <Grid templateColumns="repeat(2, 1fr)" gap="25px">
                        <GridItem>
                            <Text textStyle="lg" fontWeight="semibold">
                                Planholder ID
                            </Text>

                            <Text textStyle="sm">
                                Upload valid Government issued ID with signature of the Planholder.
                            </Text>

                            <UploadFile />
                        </GridItem>

                        <GridItem>
                            <Text textStyle="lg" fontWeight="semibold" mb="1">
                                Planholder Information
                            </Text>

                            <Stack direction="column" gap="5px">
                                <InputFloatingLabel 
                                    name="lpaNumber" label="LPA Number"
                                    value={params.value.lpaNumber}
                                    onChange={(e) => params.onValueChange({...params.value, lpaNumber: e.target.value})}
                                />

                                <InputFloatingLabel 
                                    name="phLastName" 
                                    label="Last Name"
                                    value={params.value.lastName}
                                    onChange={(e) => params.onValueChange({...params.value, lastName: e.target.value})}
                                />
                                <InputFloatingLabel 
                                    name="phFirstName" 
                                    label="First Name" 
                                    value={params.value.firstName}
                                    onChange={(e) => params.onValueChange({...params.value, firstName: e.target.value})}
                                />

                                <InputFloatingLabel 
                                    name="phMiddleName" 
                                    label="Middle Name" 
                                    value={params.value.middleName}
                                    onChange={(e) => params.onValueChange({...params.value, middleName: e.target.value})}
                                />

                                <InputFloatingLabel 
                                    name="phSuffix" 
                                    label="Suffix" 
                                    value={params.value.suffix}
                                    onChange={(e) => params.onValueChange({...params.value, suffix: e.target.value})}
                                />

                                <InputFloatingLabel 
                                    type="date" 
                                    name="phBirthDate" 
                                    label="Birth Date" 
                                    value={params.value.birthDate}
                                    onChange={(e) => params.onValueChange({...params.value, birthDate: e.target.value})}
                                />
                            </Stack>
                        </GridItem>
                    </Grid>

                    {/* <Box display="flex" gap="15px">
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
                    </Box> */}
                </Box>
            </Box>
        </>
    )
}
