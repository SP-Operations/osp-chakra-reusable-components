import {
  Flex,
  Box,
  Grid,
  FileUploadItem,
  FileUploadItemPreviewImage,
  FileUploadItemDeleteTrigger,
  FileUpload,
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { PrimarySmButton } from "st-peter-ui";

export function FileUploader({
  previewPosition = "bottom", // right | bottom | inside | none
  maxFiles = 10,
}) {
  const renderPreview = (files: any[]) => (
    <Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap={2}>
      {files.map((file, index) => (
        <FileUploadItem
          key={index}
          file={file}
          position="relative"
          overflow="hidden"
          maxH={"300px"}
        >
          <FileUploadItemPreviewImage objectFit="contain" borderRadius="md" />
          <FileUploadItemDeleteTrigger position="absolute" top="1" right="1" />
        </FileUploadItem>
      ))}
    </Grid>
  );

  return (
    <FileUpload.Root maxFiles={maxFiles} maxW="2xl" w="full">
      <FileUpload.HiddenInput />

      {previewPosition === "right" ? (
        <Flex align="flex-start">
          {/* Left side: Dropzone */}
          <Box flex="1">
            <DropzoneBlock />
          </Box>

          {/* Right side: Preview */}
          <Box flex="1">
            <FileUpload.ItemGroup>
              <FileUpload.Context>
                {({ acceptedFiles }) => renderPreview(acceptedFiles)}
              </FileUpload.Context>
            </FileUpload.ItemGroup>
          </Box>
        </Flex>
      ) : previewPosition === "inside" ? (
        <Box>
          <DropzoneBlock />

          {/* Preview appears inside dropzone area */}
          <Box mt={2}>
            <FileUpload.ItemGroup>
              <FileUpload.Context>
                {({ acceptedFiles }) => renderPreview(acceptedFiles)}
              </FileUpload.Context>
            </FileUpload.ItemGroup>
          </Box>
        </Box>
      ) : previewPosition === "bottom" ? (
        <>
          <DropzoneBlock />

          <Box>
            <FileUpload.ItemGroup>
              <FileUpload.Context>
                {({ acceptedFiles }) => renderPreview(acceptedFiles)}
              </FileUpload.Context>
            </FileUpload.ItemGroup>
          </Box>
        </>
      ) : (
        <>
          <DropzoneBlock />
          {/* previewPosition === "none" → no preview */}
        </>
      )}
    </FileUpload.Root>
  );
}

// Reusable dropzone block
const DropzoneBlock = () => (
  <FileUpload.Dropzone maxW="2xl" w="full">
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
);
