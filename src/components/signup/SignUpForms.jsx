import "../../assets/css/signup/SignUpForms.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";

function SignUpForms() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function signup(e) {

    const username = e.target.querySelector('#name').value
    const password = e.target.querySelector('#password').value
    const email = e.target.querySelector('#email').value
    
    const res = await fetch(buildApiUrl(API_ENDPOINTS.SIGNUP), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 'username': username, 'password':  password, 'email': email }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.username);

      window.location.href = '/hostels';
    } else {
      console.error("Signup failed");
    }
  }

  return (
    <form
      action="#"
      method="POST"
      className="sign_up"
      onSubmit={(e) => {
        e.preventDefault();
        signup(e);
      }}
    >
      <h2 className="form-title">let's get to know you</h2>

      <div className="sign_up-item">
        <label htmlFor="name">
          <div className="label_container">
            <img src="/icons/person.svg" alt="person" />
          </div>
        </label>
        <input type="text" id="name" placeholder="Name" autoFocus required />
      </div>

      <div className="sign_up-item">
        <label htmlFor="email">
          <div className="label_container">
            <img src="/icons/email.svg" alt="email" />
          </div>
        </label>
        <input type="email" id="email" placeholder="E-mail" required />
      </div>

      <div className="sign_up-item">
        <label htmlFor="password">
          <div className="label_container">
            <img src="/icons/password.svg" alt="password" />
          </div>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          required
        />
        <div
          className="show_hide"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <img
            src={
              showPassword ? "/icons/opened_eye.svg" : "/icons/closed_eye.svg"
            }
            alt="toggle password visibility"
          />
        </div>
      </div>

      <div className="sign_up-item">
        <label htmlFor="confirm_password">
          <div className="label_container">
            <img src="/icons/confirm-password.svg" alt="confirm password" />
          </div>
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirm_password"
          placeholder="Confirm Password"
          required
        />
        <div
          className="show_hide"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          <img
            src={
              showConfirmPassword
                ? "/icons/opened_eye.svg"
                : "/icons/closed_eye.svg"
            }
            alt="toggle confirm password visibility"
          />
        </div>
      </div>

      <button type="submit" className="form_submit">
        Submit
      </button>

      <p className="login_option">
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </form>
  );
}

export default SignUpForms;
