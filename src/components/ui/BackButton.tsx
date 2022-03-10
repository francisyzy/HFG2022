import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const BackButton = ({
  href = "/",
  classname = "",
  children,
  ...props
}) => {
  return (
    <Link href={href}>
      <a
        className={`inline-flex items-center -ml-sm space-x-base p-xs rounded-full hover:bg-gray-200 text-gray-600 {$classname}`}
        {...props}
      >
        <FaArrowLeft className="h-4 w-4"></FaArrowLeft>
        <span className="text-base font-medium">{children}</span>
      </a>
    </Link>
  );
};
