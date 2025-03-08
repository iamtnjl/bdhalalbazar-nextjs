import classNames from "classnames";

const defaultWhite =
  "inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2";

const variants = {
  warning:
    "inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2",
  primary:
    "inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2",
  light: defaultWhite,
  white: defaultWhite,
  "border-less":
    "bg-white px-4 py-2 font-medium text-primary shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 rounded-md",
};

const Button = ({
  children,
  onClick,
  variant = "defaultWhite",
  extraClassName = "",
  type = "button",
  ref,
  ...props
}) => {
  const className = classNames(variants[variant], extraClassName);
  return (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      className={classNames(className, extraClassName)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
