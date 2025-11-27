import { JSX } from "react";
import "./index.css";

export default function SignUp(): JSX.Element {
  return (
    <>
      <h1>Đăng Ký</h1>
      <div>
        <div>Tên</div>
        <div>
          <input type="text" placeholder="Tên" />
          <input type="text" placeholder="Họ" />
        </div>
      </div>
      <div>
        <div>Email</div>
        <input type="text" placeholder="Email" />
      </div>
      <div>
        <div>Mật khẩu</div>
        <input type="password" placeholder="Mật khẩu" />
      </div>
      <div>
        <div>Xác nhận mật khẩu</div>
        <input type="password" placeholder="Xác nhận Mật khẩu" />
      </div>
      <div className="auth-btn-field">
        <button className="auth-btn">Đăng ký</button>
      </div>
    </>
  );
}
