import classNames from "classnames";
import Link from "next/link";

export const SmartLink = ({
  underline = false,
  className = "",
  href,
  children,
}) => {
  const classes = classNames(className, {
    underline: underline,
  });

  if (href[0] === "/")
    return (
      <Link href={href}>
        <a className={classes}>{children}</a>
      </Link>
    );
  else
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {children}
      </a>
    );
};
