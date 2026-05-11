"use client";

import React, { useState, useCallback } from "react";
import {
  VStack,
  Grid,
  Box,
  Field,
  Select,
  createListCollection,
  Portal,
  Separator,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Body } from "st-peter-ui";
import FloatingLabelInput from "../ui/floating-label-input";
import {
  DynamicFormConfig,
  FormData,
  FormValidationError,
} from "@/types/FormConfig";

interface DynamicFormProps {
  config: DynamicFormConfig;
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
  onSubmit?: (data: FormData) => Promise<void> | void;
  loading?: boolean;
  hideSubmitButton?: boolean;
}

const DynamicForm = ({
  config,
  formData,
  onChange,
  onSubmit,
  loading = false,
  hideSubmitButton = false,
}: DynamicFormProps) => {
  const [errors, setErrors] = useState<FormValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((fieldId: string, value: any) => {
    // Add custom validation logic here if needed
    return true;
  }, []);

  const handleFieldChange = useCallback(
    (fieldId: string, value: any) => {
      if (validateField(fieldId, value)) {
        setErrors((prev) => prev.filter((err) => err.fieldId !== fieldId));
        onChange({ [fieldId]: value });
      }
    },
    [onChange, validateField],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack gap={6} align="stretch" w="full">
        {config.sections.map((section, sectionIdx) => (
          <Box key={section.id}>
            {/* Section Title */}
            <VStack mb={4} align="stretch">
              <Body fontWeight="bold">{section.title}</Body>
              {section.description && (
                <Text fontSize="sm" color="gray.600">
                  {section.description}
                </Text>
              )}
            </VStack>

            {/* Fields Grid */}
            <Grid
              templateColumns={
                section.columns || { base: "1fr", md: "repeat(2, 1fr)" }
              }
              gap={8}
              mb={4}
            >
              {section.fields.map((fieldConfig) => {
                const fieldValue = formData[fieldConfig.id] || "";
                const fieldError = errors.find(
                  (err) => err.fieldId === fieldConfig.id,
                );

                return (
                  <Field.Root key={fieldConfig.id}>
                    {fieldConfig.type === "select" && fieldConfig.options ? (
                      <SelectField
                        fieldConfig={fieldConfig}
                        value={fieldValue}
                        onChange={(value) =>
                          handleFieldChange(fieldConfig.id, value)
                        }
                        error={fieldError}
                      />
                    ) : fieldConfig.type === "textarea" ? (
                      <TextareaField
                        fieldConfig={fieldConfig}
                        value={fieldValue}
                        onChange={(value) =>
                          handleFieldChange(fieldConfig.id, value)
                        }
                        error={fieldError}
                      />
                    ) : (
                      <FloatingLabelInput
                        id={fieldConfig.id}
                        type={fieldConfig.type}
                        label={fieldConfig.label}
                        placeholder={fieldConfig.placeholder}
                        value={fieldValue}
                        onChange={(e) =>
                          handleFieldChange(fieldConfig.id, e.target.value)
                        }
                        disabled={loading || isSubmitting}
                        readOnly={fieldConfig.readOnly}
                      />
                    )}
                    {fieldError && (
                      <Text fontSize="xs" color="red.500" mt={1}>
                        {fieldError.message}
                      </Text>
                    )}
                    {fieldConfig.helpText && !fieldError && (
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        {fieldConfig.helpText}
                      </Text>
                    )}
                  </Field.Root>
                );
              })}
            </Grid>

            {/* Separator between sections */}
            {sectionIdx < config.sections.length - 1 && <Separator />}
          </Box>
        ))}

        {/* Submit Button */}
        {!hideSubmitButton && onSubmit && (
          <HStack justify="flex-end" pt={4}>
            <Button
              type="submit"
              disabled={loading || isSubmitting}
              loading={isSubmitting}
              colorScheme="green"
            >
              {config.submitButtonText || "Submit"}
            </Button>
          </HStack>
        )}
      </VStack>
    </form>
  );
};

/**
 * SelectField - Helper component for select inputs
 */
interface SelectFieldProps {
  fieldConfig: any;
  value: any;
  onChange: (value: string) => void;
  error?: FormValidationError;
}

const SelectField = ({
  fieldConfig,
  value,
  onChange,
  error,
}: SelectFieldProps) => {
  const collection = createListCollection({
    items: fieldConfig.options || [],
  });

  return (
    <Select.Root
      value={value ? [value] : []}
      onValueChange={(details) => onChange(details.value[0])}
      collection={collection}
      width="100%"
    >
      <Select.HiddenSelect />
      <Select.Control borderColor={error ? "red.500" : undefined}>
        <Select.Trigger>
          <Select.ValueText placeholder={`Select ${fieldConfig.label}`} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {fieldConfig.options?.map((option: any) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

/**
 * TextareaField - Helper component for textarea inputs
 */
interface TextareaFieldProps {
  fieldConfig: any;
  value: any;
  onChange: (value: string) => void;
  error?: FormValidationError;
}

const TextareaField = ({
  fieldConfig,
  value,
  onChange,
  error,
}: TextareaFieldProps) => {
  return (
    <Box
      as="textarea"
      id={fieldConfig.id}
      placeholder={fieldConfig.placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={fieldConfig.readOnly}
      borderColor={error ? "red.500" : "gray.300"}
      p={2}
      borderRadius="md"
      borderWidth="1px"
      minH="120px"
      width="100%"
    />
  );
};

export default DynamicForm;
