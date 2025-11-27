import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>Đăng nhập</h1>
      </div>
      <div>
        <input type="text" placeholder="Email" />
      </div>
      <div>
        <input type="password" placeholder="Mật khẩu" />
      </div>
      <div className="auth-btn-field">
        <button className="auth-btn">Đăng nhập</button>
        <button
          className="auth-btn ask-register-btn"
          onClick={() => {
            navigate("/register");
          }}
        >
          Chưa có tài khoản? Đăng ký
        </button>
      </div>
    </>
  );
}
