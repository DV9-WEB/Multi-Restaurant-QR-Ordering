const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-[95vh] flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
