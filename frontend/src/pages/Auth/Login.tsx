import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios.ts";
import "./index.css";

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLoginRequest = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const accessToken = res.data.access_token;
      localStorage.setItem("access_token", accessToken);

      // Redirect after login
      navigate("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitLoginRequest();
      }}
    >
      <div>
        <h1>Sign In</h1>
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="auth-btn-field">
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <button
          type="button"
          className="auth-btn ask-register-btn"
          onClick={() => navigate("/register")}
        >
          {/* Chưa có tài khoản? Đăng ký */}
          Don't have an account? Sign Up
        </button>
      </div>
    </form>
  );
}