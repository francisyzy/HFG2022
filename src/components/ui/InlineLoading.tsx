interface InlineLoadingProps {
  sizes: number[];
  className?: string;
}

export const InlineLoading = ({
  sizes,
  className = "bg-gray-100",
}: InlineLoadingProps) => {
  const widthMap = {
    1: "w-8",
    2: "w-16",
    3: "w-32",
    4: "w-40",
  };

  return (
    <div className="flex space-x-base">
      {sizes &&
        sizes.map((size, index) => (
          <div
            key={index}
            className={`rounded animate-pulse h-6 ${widthMap[size]} ${className}`}
          ></div>
        ))}
    </div>
  );
};
