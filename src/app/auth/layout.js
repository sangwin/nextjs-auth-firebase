export default function AuthLayout({ children }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-400 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96 animate-fadeIn">
        {children}
      </div>
    </div>
  );
}
