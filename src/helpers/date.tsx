import { Input } from "@chakra-ui/react";
import { Field } from "components/ui/field"; // Imported from your snippets
import { InputGroup } from "components/ui/input-group"; // Imported from your snippets
import { Calendar } from "lucide-react";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
}

export const DateInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
}: DateInputProps) => {
  return (
    <Field
      label={label}
      invalid={!!error}
      errorText={error}
      helperText={helperText}
    >
      <InputGroup
        width="full"
        startElement={<Calendar size={16} color="gray" />}
      >
        <Input
          type="date"
          value={value}
          onChange={onChange}
          variant="outline"
          // In v3, focus rings are handled via the "focusRing" prop or theme
          focusRing="2px"
          focusRingColor="green.500"
          cursor="pointer"
          // Custom CSS for the native calendar icon
          css={{
            "&::-webkit-calendar-picker-indicator": {
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0,
              cursor: "pointer",
            },
          }}
        />
      </InputGroup>
    </Field>
  );
};
