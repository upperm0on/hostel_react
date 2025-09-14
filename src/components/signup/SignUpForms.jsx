import "../../assets/css/signup/SignUpForms.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { Eye, EyeOff, User, Mail, Lock, UserCheck } from "lucide-react";

function SignUpForms() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function signup(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const username = e.target.querySelector('#name').value;
    const password = e.target.querySelector('#password').value;
    const confirmPassword = e.target.querySelector('#confirm_password').value;
    const email = e.target.querySelector('#email').value;

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(buildApiUrl(API_ENDPOINTS.SIGNUP), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 'username': username, 'password': password, 'email': email }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.username);
        window.location.href = '/hostels';
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      action="#"
      method="POST"
      className="sign_up"
      onSubmit={signup}
    >
      <h2 className="form-title">Let's Get to Know You</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="sign_up-item">
        <label htmlFor="name">
          <div className="label_container">
            <User size={20} />
          </div>
        </label>
        <input type="text" id="name" placeholder="Name" autoFocus required />
      </div>

      <div className="sign_up-item">
        <label htmlFor="email">
          <div className="label_container">
            <Mail size={20} />
          </div>
        </label>
        <input type="email" id="email" placeholder="E-mail" required />
      </div>

      <div className="sign_up-item">
        <label htmlFor="password">
          <div className="label_container">
            <Lock size={20} />
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
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>

      <div className="sign_up-item">
        <label htmlFor="confirm_password">
          <div className="label_container">
            <UserCheck size={20} />
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
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>

      <button type="submit" className="form_submit" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Submit"}
      </button>

      <p className="login_option">
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </form>
  );
}

export default SignUpForms;
