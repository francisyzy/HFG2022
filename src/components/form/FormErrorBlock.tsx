interface FormErrorBlockProps {
  error?: string | React.ReactNode;
  errors?: string[];
}

export const FormErrorBlock = ({
  error = undefined,
  errors = undefined,
}: FormErrorBlockProps) => {
  return (
    <div className="bg-red-100 border-2 border-red-200 p-base rounded text-red-500">
      {error ? (
        <>{error}</>
      ) : (
        <ul className="list-disc ml-base">
          {errors &&
            errors.map((message, index) => <li key={index}>{message}</li>)}
        </ul>
      )}
    </div>
  );
};
