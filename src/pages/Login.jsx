import { useRef, useState } from "react";
import useAuth from "../contexts/auth/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { error, isLoading, loginUser } = useAuth();

  const [fieldError, setFieldError] = useState({
    phone: "",
    password: "",
  });

  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset errors
    setFieldError({ phone: "", password: "" });

    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;

    // Validation
    let hasError = false;

    if (!phone) {
      setFieldError((prev) => ({
        ...prev,
        phone: "Phone number is required!",
      }));
      hasError = true;
    }

    if (!password) {
      setFieldError((prev) => ({
        ...prev,
        password: "Password is required!",
      }));
      hasError = true;
    }

    if (hasError) {
      console.log("Validation errors present!");
      return;
    }

    loginUser({ phone, password });

    if (!error && !isLoading) navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-100">
      {error && (
        <p className="border border-red-600 bg-red-200 text-red-600 px-8 py-3 rounded">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Phone</label>
          <input
            type="text"
            ref={phoneRef}
            placeholder="Enter phone number"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          {fieldError.phone && (
            <p className="text-red-500 text-sm mt-1">{fieldError.phone}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Enter password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          {fieldError.password && (
            <p className="text-red-500 text-sm mt-1">{fieldError.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
