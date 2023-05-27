import { useField, useFormikContext } from "formik";

interface NoteInputProps {
  name: string;
  id: string;
  placeholder?: string;
  onChange?: (value: string | null) => void;
  onFocus?: () => void;
  disabled?: boolean,
}

const NoteInput = (props: NoteInputProps) => {
  const [field] = useField(props.name);

  const formikContext = useFormikContext();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    formikContext.setFieldValue(field.name, e.currentTarget.value);
    if (props.onChange) props.onChange(e.currentTarget.value);
  };

  return (
    <div>
      <input
        {...field}
        {...props}
        onChange={onChange}
        style={{
          background: "initial",
          width: `20px`,
          justifySelf: "center"
        }}
      />
    </div>
  );
};

export default NoteInput;