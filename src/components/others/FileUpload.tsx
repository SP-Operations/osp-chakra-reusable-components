"use client";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import {
  Box,
  Text,
  Image,
  Flex,
  Button,
  Icon,
  VisuallyHidden,
} from "@chakra-ui/react";

interface UploadFileProps {
  id: string;
  label: string;
  onChange?: (file: File | null) => void;
}

export function FileUpload({ id, label, onChange }: UploadFileProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readAndPreview(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readAndPreview(file);
  };

  const readAndPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      onChange?.(file);
    };
    reader.readAsDataURL(file);
  };

  const removePreview = () => {
    setPreview(null);
    onChange?.(null);
  };

  return (
    <Box w="full">
      <Text mb={2} fontWeight="medium">
        {label}
      </Text>

      <Box
        borderWidth={2}
        borderColor={isDragging ? "blue.400" : "gray.300"}
        borderStyle="dashed"
        borderRadius="md"
        p={4}
        textAlign="center"
        position="relative"
        cursor="pointer"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <VisuallyHidden>
          <input
            type="file"
            accept="image/*"
            id={id}
            onChange={handleFileChange}
          />
        </VisuallyHidden>

        {!preview ? (
          <label htmlFor={id}>
            <Flex direction="column" align="center" justify="center" gap="2">
              <Icon as={Upload} w="7" h="7" color="gray.400" />
              <Text color="gray.500" fontSize="sm">
                Click or drag to upload
              </Text>
            </Flex>
          </label>
        ) : (
          <Box position="relative" display="inline-block">
            <Image
              src={preview}
              alt={`${label} Preview`}
              maxH="150px"
              borderRadius="md"
            />
            <Button
              size="xs"
              position="absolute"
              top={1}
              right={1}
              borderRadius="full"
              p={1}
              onClick={removePreview}
              bg="red.500"
              _hover={{ bg: "red.600" }}
            >
              <X size={14} color="white" />
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
