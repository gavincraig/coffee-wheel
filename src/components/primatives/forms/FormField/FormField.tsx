import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
  hideLabel?: boolean;
};

const FormField = ({ label, children, hideLabel }: Props) => {
  return (
    <div>
      {hideLabel ? (
        children
      ) : (
        <label className='flex flex-col '>
          <span className='text-sm font-light text-gray-300'>{label}</span>
          {children}
        </label>
      )}
    </div>
  );
};

export default FormField;
