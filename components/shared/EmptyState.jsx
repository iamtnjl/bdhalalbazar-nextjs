import Image from "next/image";

const EmptyState = ({ children, ...props }) => {
  return (
    <div className="h-screen">
      <div
        className={`flex flex-col items-center justify-center py-12 gap-12 ${props.extraClassName}`}
      >
        <div>{children}</div>
        <Image
          width={500}
          height={500}
          src="/images/emptyStateImg.svg"
          className="w-2/3 md:w-1/3"
          alt="Empty state"
        />
      </div>
    </div>
  );
};
export default EmptyState;
