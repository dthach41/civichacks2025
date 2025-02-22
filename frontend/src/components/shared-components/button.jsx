export default function Button({ text, onClick, className }) {
  return (
    <button
      className={`bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg ${className || ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}