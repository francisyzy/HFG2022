export const PageTitle = ({ className = "", children, ...props }) => {
  return (
    <h1 className={`text-4xl font-black ${className}`} {...props}>
      {children}
    </h1>
  );
};
