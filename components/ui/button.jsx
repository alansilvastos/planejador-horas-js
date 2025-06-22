export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}
