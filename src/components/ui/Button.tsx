import { useState } from "react";
import Link from "next/link";
import { FaEllipsisH, FaSpinner } from "react-icons/fa";
import classNames from "classnames";
import { SmartLink } from "./SmartLink";

export const Button = ({
  // Styles
  primary = false,
  danger = false,

  dilute = false,

  small = false,
  // Types
  submit = false,

  children,
  icon = undefined,

  // If it's a link
  href = undefined,

  // Confirm button
  unconfirmed = null,
  action = () => {},

  // Loading state
  loading = false,

  ...props
}) => {
  const needsConfirmation = !!unconfirmed;

  const [confirmed, setConfirmed] = useState(!needsConfirmation);

  const onClick = () => {
    if (confirmed) {
      action();
      setConfirmed(false);
    } else {
      setConfirmed(true);
    }
  };

  const buttonElementProps = {
    className: classNames(
      "relative inline-flex rounded-lg font-medium bg-gray-300 text-gray-800 hover:bg-gray-400",
      "items-center justify-center",
      "transition-colors",
      {
        "min-h-14": !small,
      },
      {
        "bg-indigo-600 hover:bg-indigo-500 text-indigo-50": primary && !dilute,
        "bg-indigo-200 hover:bg-indigo-300 text-indigo-500": primary && dilute,

        "bg-red-500 hover:bg-red-700 text-red-50": danger && !dilute,
        "bg-red-200 hover:bg-red-300 text-red-500": danger && dilute,
      },
      {
        "px-5  py-3": !small,
        "text-sm px-sm py-xs": small,
      }
    ),

    // as ... required for type checking
    type: (submit ? "submit" : "button") as "submit" | "button" | "reset",
    onClick: onClick,
    disabled: loading,
    ...props,
  };

  const buttonText = (
    <div
      className={classNames({
        "flex items-center justify-between space-x-base": icon,
      })}
    >
      {icon}

      <span>{children}</span>
    </div>
  );

  const buttonElementChildren = (
    <>
      <div className={`${loading && "text-transparent"}`}>
        {needsConfirmation ? (confirmed ? "Sure?" : buttonText) : buttonText}
      </div>

      {loading && (
        <FaEllipsisH className="inset-center fill-current animate-pulse w-6 h-6"></FaEllipsisH>
      )}
    </>
  );

  return (
    <>
      {href ? (
        <SmartLink {...buttonElementProps} href={href}>
          {buttonElementChildren}
        </SmartLink>
      ) : (
        <button {...buttonElementProps}>{buttonElementChildren}</button>
      )}
    </>
  );
};
