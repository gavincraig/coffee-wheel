type TextFieldProps = {
  placeholder?: string;
  value: string;
  onChange: (e: string) => void;
};

const TextField = ({ placeholder, value, onChange }: TextFieldProps) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e);
    onChange(e.currentTarget.value);
  };

  return (
    <input
      className="border-red-200 p-2 rounded-md"
      type="text"
      placeholder={placeholder || ""}
      value={value}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default TextField;
