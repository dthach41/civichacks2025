export default function GrayButton({ text, onClick, className }) {
    return (
        <button 
            className={`text-white py-2 px-3 rounded-md bg-gray-400 ${className || ''}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}