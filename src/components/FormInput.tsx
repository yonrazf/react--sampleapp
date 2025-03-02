import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: any;
  name: string;
  validation: any;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  validation,
  register,
  label,
  ...inputProps
}) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="appearance-none border border-slate-300 focus:border-slate-500 rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
        {...inputProps}
        {...register(name, validation)}
      />
    </div>
  );
};

export default FormInput;
