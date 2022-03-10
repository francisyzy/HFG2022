import { forwardRef, ReactNode } from 'react';

interface FormTextareaProps {
  name: string;

  label: string;
  placeholder?: string;
  errors?: object;
  className?: string;
  textareaClassName?: string;

  info?: string | ReactNode;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>((props, ref) => {
  return (
    <li className={props.className}>
      <label htmlFor={props.name} className={`block text-lg font-semibold`}>
        {props.label}
      </label>
      <textarea
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        {...props}
        className={`form-field mt-0.5 ${props.textareaClassName}`}
        ref={ref}
      ></textarea>

      {props.info && <div className="text-gray-600 mt-1">{props.info}</div>}

      {props.errors?.[props.name] && (
        <div className="mt-1 form-errors">{props.errors[props.name]?.message}</div>
      )}
    </li>
  );
});
