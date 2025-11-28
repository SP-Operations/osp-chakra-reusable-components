import { Box, Button, FileUpload, Flex, Grid, Icon } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { LuUpload } from "react-icons/lu";
import { PrimaryMdButton, PrimarySmButton } from "st-peter-ui";

export const UploadFile = () => {
  return (
    <Flex gap={4} align="flex-start">
      <FileUpload.Root
        maxFiles={10}
        display="inline-block"
        maxW="2xl"
        accept=".png,.jpg,.jpeg,.pdf"
      >
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone>
          {/* <Icon size="md" color="fg.muted">
          <LuUpload />
        </Icon> */}
          <FileUpload.DropzoneContent>
            <Box>Drag and drop files here</Box>
            <Box color="fg.muted">.png, .jpg</Box>
            <FileUpload.Trigger asChild>
              <PrimarySmButton>
                <HiUpload /> Upload Images
              </PrimarySmButton>
            </FileUpload.Trigger>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>

        <Box flex="1">
          <FileUpload.ItemGroup>
            <Box my="1">
              {/* <Grid templateColumns={{ sm: "repeat(2, 1fr)" }} gap="2"> */}
              <Grid
                templateColumns="repeat(auto-fit, minmax(120px, 1fr))"
                gap={2}
              >
                <FileUpload.Context>
                  {({ acceptedFiles }) =>
                    acceptedFiles.map((file, index) => (
                      <FileUpload.Item
                        key={index}
                        file={file}
                        overflow="hidden"
                        maxH={"300px"}
                      >
                        <FileUpload.ItemPreviewImage
                          objectFit="contain"
                          borderRadius="md"
                          mb="3"

                          // maxH={"300px"}
                        />

                        <FileUpload.ItemDeleteTrigger
                          position="absolute"
                          top="0"
                          right="0"
                        />

                        <FileUpload.ItemName
                          position="absolute"
                          bottom="0"
                          overflow="hidden"
                          mb="1"
                        />
                      </FileUpload.Item>
                    ))
                  }
                </FileUpload.Context>
              </Grid>
            </Box>
          </FileUpload.ItemGroup>
        </Box>
      </FileUpload.Root>
    </Flex>
  );
};
