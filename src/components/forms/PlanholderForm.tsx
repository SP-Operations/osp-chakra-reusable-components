import React from 'react'
import { Box, Field, Text, Textarea } from '@chakra-ui/react'
import type { PlanholderFormParams } from '../../models/types/claim.types'
import { InputFloatingLabel } from 'st-peter-ui'

export const PlanholderForm = (params: PlanholderFormParams) => {
  return (
    <>
        <Box>
            <Text textStyle="md" fontWeight="semibold">Planholder Details</Text>
            <Text textStyle="sm" fontWeight="initial">
                You are eligible for {params.benefitText}. However, please note that your claims is subject for review and approval.
                Please provide the following information to complete your claim request.
            </Text>
        </Box>

        <Box display="flex" gap="15px">
            <InputFloatingLabel name="lpaNumber" label="LPA Number" value={params.value.lpaNumber} onChange={(e) => params.onValueChange({...params.value, lpaNumber: e.target.value})} />
            <InputFloatingLabel type="date" name="dateOfDeath" label="Date of Death" value={params.value.incidentDate} onChange={(e) => params.onValueChange({...params.value, incidentDate: e.target.value})} />
        </Box>

        <Box>
            <Field.Root>
                <Field.Label>Cause of Death</Field.Label>
                <Textarea placeholder='Enter the cause of death' value={params.value.causeOfIncident} onChange={(e) => params.onValueChange({...params.value, causeOfIncident: e.target.value})} />
            </Field.Root>
        </Box>
    </>
  )
}
