import { Box, Button, FileUpload, Grid, Icon } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { LuUpload } from "react-icons/lu";

export const UploadFile = () => {
  return (
    <FileUpload.Root maxFiles={10} display="inline-block">
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <Icon size="md" color="fg.muted">
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>Drag and drop files here</Box>
          <Box color="fg.muted">.png, .jpg</Box>
          <FileUpload.Trigger asChild>
            <Button variant="outline" size="sm">
              <HiUpload /> Upload Images
            </Button>
          </FileUpload.Trigger>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <Box my="1">
          <Grid templateColumns={{ sm: "repeat(2, 1fr)" }} gap="2">
            <FileUpload.Context>
              {({ acceptedFiles }) =>
                acceptedFiles.map((file) => (
                  <FileUpload.Item
                    key={file.name}
                    file={file}
                    overflow="hidden"
                  >
                    <FileUpload.ItemPreviewImage
                      objectFit="cover"
                      borderRadius="md"
                      mb="3"
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
    </FileUpload.Root>
  );
};
