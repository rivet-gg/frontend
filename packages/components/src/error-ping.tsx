export const ErrorPing = () => {
  return (
    <span className="flex size-2 absolute top-0 -right-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full size-2 bg-red-500" />
    </span>
  );
};
