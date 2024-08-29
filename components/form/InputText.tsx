import React, { Fragment } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

// =====> Types & Interfaces <===== //
interface Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, any>;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  defaultValue?: any;
  isRequired?: boolean;
}

// =======> Main Function <======= //
const InputText = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  type = "text",
  defaultValue,
  isRequired = false,
}: Props<TFieldValues>) => {
  return (
    <div className="mb-5">
      {label && (
        <label htmlFor={name} className="mb-2 block">
          {label}
          {isRequired && <span className="text-error"> *</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <Fragment>
            <input
              {...field}
              type={type}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none"
            />
            {error && <p className="text-error">{error?.message}</p>}
          </Fragment>
        )}
      />
    </div>
  );
};

export default InputText;
