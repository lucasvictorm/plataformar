type Props = {
  size: number;
  className: string;
};

function ProgressBar({ size, className }: Props) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div
        className={`${className} h-2 rounded-full`}
        style={{ width: `${size}%` }}
      />
    </div>
  );
}

export default ProgressBar;
