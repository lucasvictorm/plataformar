type Props = {
  title: string;
  onClick: () => void;
};

function Button({ title, onClick }: Props) {
  return (
    <button
      className="bg-blue-500 w-full text-white rounded-md p-2 cursor-pointer hover:bg-blue-700"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
