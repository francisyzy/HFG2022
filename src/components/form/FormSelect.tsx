import { forwardRef, ReactNode } from 'react';

interface FormSelectProps {
  name: string;
  label: string;
  errors?: object;
  children: ReactNode;
  className?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>((props, ref) => {
  return (
    <li>
      <label htmlFor={props.name} className="form-label">
        {props.label}
      </label> 

      <select
        name={props.name}
        id={props.name}
        {...props}
        className={`form-field mt-0.5 ${props.className}`}
        ref={ref}
      >
        {props.children}
      </select>

      {props.errors?.[props.name] && (
        <div className="mt-sm form-errors">{props.errors[props.name]?.message}</div>
      )}
    </li>
  );
});
