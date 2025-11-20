// Author: Jimwell Arvin L. Ocsio

import React from 'react';
import { Box, Grid, GridItem, Icon, Stack, Text } from '@chakra-ui/react';
import { LuCircleCheckBig } from 'react-icons/lu';
import type { SuccessPageParams } from '../../models/types/success.page.types';
import { motion, AnimatePresence } from 'framer-motion' 


export const SuccessPage = (params: SuccessPageParams) => {
    const MotionBox = motion(Box);
    return (
        <AnimatePresence mode="popLayout">
            <MotionBox
                initial={{x: 50, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{
                    x: {duration: 0.4, ease: "easeOut"},
                    opacity: {duration: 0.8, ease: "easeIn"}
                }}
                height="100%"
            >
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-end" height="100%" gap="20px" maxW="500px">
                    <Stack direction="column" gap="0">
                        <Text textStyle="2xl" fontWeight="bold" textAlign="center">{params.title}</Text>
                        <Text textStyle="sm" textAlign="center" as="div">{params.content}</Text>
                        {(params.footer) &&
                        (
                            <Box>
                                {params.footer}
                            </Box>
                        )
                    }
                    </Stack>
                </Box>
            </MotionBox>
        </AnimatePresence>
    )
}
