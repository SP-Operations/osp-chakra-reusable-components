import { CheckboxCard } from "@chakra-ui/react";
import { useState } from "react";

interface ListItemProps {
  key?: string;
  selectable: boolean;
  onClick?: () => void;
  onCheckChange?: (checked: boolean) => void;
  isChecked?: boolean;
  children?: React.ReactElement<typeof ListItemColumn>[];
}

interface ListItemColumnProps {
  label: string;
  value: string;
}

export function ListItem(props: ListItemProps) {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  return (
    <CheckboxCard.Root
      variant={"solid"}
      my={2}
      cursor={"pointer"}
      checked={isChecked}
      _hover={{
        backgroundColor: "gray.100",
      }}
      _checked={{
        backgroundColor: "var(--chakra-colors-primary-disabled)/50",
        borderColor: "var(--chakra-colors-primary-disabled)",
        color: "var(--chakra-colors-primary-hover)",
        _hover: {
          backgroundColor: "var(--chakra-colors-primary-disabled)/70",
        },
      }}
      onClick={() => {
        props.onClick;
        if (props.selectable) setIsChecked((isChecked) => !isChecked);
      }}
    >
      <CheckboxCard.Control
        _hover={{
          backgroundColor: "gray.200",
          _checked: {
            borderColor: "var(--chakra-colors-primary)",
            backgroundColor: "var(--chakra-colors-primary-disabled)",
          },
        }}
        _checked={{
          borderColor: "var(--chakra-colors-primary-disabled)",
          color: "var(--chakra-colors-primary-hover)",
        }}
      >
        {props.selectable && <CheckboxCard.Indicator />}
        {props.children}
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  );
}

export function ListItemColumn({ label, value }: ListItemColumnProps) {
  return (
    <CheckboxCard.Content>
      <CheckboxCard.Label>{value}</CheckboxCard.Label>
      <CheckboxCard.Description>{label}</CheckboxCard.Description>
    </CheckboxCard.Content>
  );
}
