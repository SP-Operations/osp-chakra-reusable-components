import { useState, useRef, useEffect } from "react";
import { Box, Field, Input, defineStyle } from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FloatingInputProps extends InputProps {
  label: string;
  register?: UseFormRegisterReturn;
  error?: string | undefined | null; // allow undefined and null
}

export const FloatingInput = ({
  label,
  register,
  error,
  ...rest
}: FloatingInputProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hasValue, setHasValue] = useState(false);

  // Update hasValue on mount for defaultValue
  useEffect(() => {
    if (inputRef.current) {
      setHasValue(inputRef.current.value !== "");
    }
  }, []);
  const shouldFloat = focused || hasValue;

  return (
    <Field.Root>
      <Box pos="relative" w="full" my="8px">
        <Input
          {...register} // name, onChange, onBlur, ref
          {...rest} // type, disabled, etc.
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            register?.onBlur?.(e);
            setHasValue(e.target.value !== ""); // RHF needs this
          }}
          data-float={shouldFloat || undefined}
        />
        <Field.Label css={floatingStyles} data-float={shouldFloat || undefined}>
          {label}
        </Field.Label>
      </Box>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "2.5",
  insetStart: "3",
  pointerEvents: "none",
  transition: "all 0.2s",
  color: "fg.muted",
  "&[data-float]": {
    top: "-3",
    insetStart: "2",
    color: "fg",
  },
});
