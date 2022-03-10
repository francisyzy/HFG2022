import { forwardRef, ReactNode } from 'react';

interface FormFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  errors?: object;
  className?: string;
  max?: any;
  maxLength?: any;
  min?: any;

  info?: string | ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>((props, ref) => {
  return (
    <li className={props.className}>
      <label htmlFor={props.name} className={`block text-lg font-semibold`}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        {...props}
        className={`form-field mt-0.5`}
        ref={ref}
      />

      {props.info && <div className="mt-1 text-gray-600">{props.info}</div>}

      {props.errors?.[props.name] && (
        <div className="mt-1 form-errors">{props.errors[props.name]?.message}</div>
      )}
    </li>
  );
});
