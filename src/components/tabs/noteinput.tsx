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
    <div className="select-none">
      <input
        {...field}
        {...props}
        onChange={onChange}
        className="w-4 bg-transparent select-none"
      />
    </div>
  );
};

export default NoteInput;