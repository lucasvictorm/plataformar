type Props = {
  size: number;
};

function ProgressBar({ size }: Props) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div
        className="bg-black h-2 rounded-full"
        style={{ width: `${size}%` }}
      />
    </div>
  );
}

export default ProgressBar;
