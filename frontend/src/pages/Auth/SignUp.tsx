import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios.ts";
import "./index.css";

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRegisterRequest = async () => {
    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axiosInstance.post("/auth/register", {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      // After successful registration → go to login
      navigate("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Đăng ký thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitRegisterRequest();
      }}
    >
      <div>
        <h1>Đăng ký</h1>
      </div>

      <div>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Tên"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Họ"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="auth-btn-field">
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <button
          type="button"
          className="auth-btn ask-register-btn"
          onClick={() => navigate("/login")}
        >
          Đã có tài khoản? Đăng nhập
        </button>
      </div>
    </form>
  );
}
