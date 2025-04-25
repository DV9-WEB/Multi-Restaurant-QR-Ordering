import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthState } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (user) navigate("/");
    return () => dispatch(resetAuthState());
  }, [user]);

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="input input-bordered"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-control mb-6">
          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className="input input-bordered"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        New here?{" "}
        <Link to="/signup" className="text-primary">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
