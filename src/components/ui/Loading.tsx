interface LoadingProps {
  sizes: number[];
}

export const Loading = ({ sizes }: LoadingProps) => {
  const heightMap = {
    1: 'h-8',
    2: 'h-16',
    3: 'h-32',
    4: 'h-40',
  };

  return (
    <div className="my-base space-y-base">
      {sizes &&
        sizes.map((size, index) => (
          <div
            key={index}
            className={`bg-gray-100 rounded animate-pulse ${heightMap[size]}`}
          ></div>
        ))}
    </div>
  );
};
