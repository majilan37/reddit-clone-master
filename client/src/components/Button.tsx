import { Ring } from "@uiball/loaders";

function Button({
  loading,
  className,
  children,
  text,
  ...rest
}: React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> & {
  loading?: boolean;
  className?: string;
  children?: React.ReactNode | string | React.ReactNode[];
  text?: string;
}) {
  return (
    <button
      className={` flex items-center text-white rounded-sm px-5 py-2 transition-all duration-300 ${className} ${
        loading && "!bg-gray-300 !text-gray-600  "
      } `}
      {...rest}>
      {loading && (
        <div className="mr-2">
          <Ring size={20} lineWeight={5} speed={2} color={"gray"} />
        </div>
      )}
      {children ?? (
        <span className="">{loading ? "Loading..." : `${text}`}</span>
      )}
    </button>
  );
}

export default Button;
