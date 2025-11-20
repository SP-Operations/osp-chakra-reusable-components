// Author: Jimwell Arvin L. Ocsio

import React from 'react';
import { Box, Grid, GridItem, Icon, Stack, Text } from '@chakra-ui/react';
import { LuCircleCheckBig } from 'react-icons/lu';
import type { SuccessPageParams } from '../../models/types/success.page.types';
import { motion, AnimatePresence } from 'framer-motion' 


export const SuccessPage = (params: SuccessPageParams) => {
    const MotionBox = motion(Box);
    return (
        <Grid templateColumns="1fr 1fr" gap="20px">
            <GridItem display="flex" flexDirection="column">
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
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-end" height="100%" gap="20px">
                            <Stack direction="column" gap="0">
                                <Text textStyle="2xl" fontWeight="bold" textAlign="right">{params.title}</Text>
                                <Text textStyle="sm" textAlign="right" as="div">{params.content}</Text>
                            </Stack>

                            {(params.footer) &&
                                (
                                    <Box>
                                        {params.footer}
                                    </Box>
                                )
                            }
                        </Box>
                    </MotionBox>
                </AnimatePresence>
            </GridItem>

            <GridItem borderLeftStyle="solid" borderLeftColor="border" borderLeftWidth="2px" padding="20px">
                <AnimatePresence mode="popLayout">
                    <MotionBox
                        initial={{x: -50, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{
                            x: {duration: 0.4, ease: "easeOut"},
                            opacity: {duration: 0.8, ease: "easeIn"}
                        }}
                        display="flex" 
                        flexDirection="column" 
                        justifyContent="center" 
                        alignItems="flex-start" 
                        height="100%"
                    >
                        <Icon>
                            <LuCircleCheckBig size="280px" />
                        </Icon>
                    </MotionBox>
                </AnimatePresence>
            </GridItem>
        </Grid>
    )
}
