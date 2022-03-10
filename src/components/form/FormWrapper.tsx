export const FormWrapper = ({ onSubmit, children, ...props }) => {
  return (
    <form onSubmit={onSubmit} {...props} noValidate>
      <ul className="space-y-base">{children}</ul>
    </form>
  );
};
