import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/signup/SignUpForms.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { setEmailSafely } from "../../utils/authUtils";
import { useAuthData } from "../../hooks/useAuthData";

function LoginForms() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthData();

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const email = e.target.querySelector("#email").value;
    const password = e.target.querySelector("#password").value;

    try {
      const res = await fetch(buildApiUrl(API_ENDPOINTS.LOGIN), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        
        // Check if the error is due to unverified account
        if (errorData.error === "Account not verified" || errorData.account_verified === false) {
          // User needs to verify their email
          setEmailSafely(email);
          navigate("/email-verification");
          return;
        }
        
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await res.json();

      if (data.token) {
        // Use the auth hook to handle login
        login({
          token: data.token,
          email: email,
          user: {
            name: data.name || email.split('@')[0],
            email: email
          }
        });

        setEmailSafely(email);
        localStorage.setItem("name", data.name || email.split('@')[0]);

        // 🔔 Tell NavBar to update immediately
        window.dispatchEvent(new Event("authChange"));

        // Small delay to ensure Redux state is updated
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else if (data.requires_verification) {
        // User needs to verify their email
        setEmailSafely(email);
        navigate("/email-verification");
      } else {
        setError("Invalid login. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="sign_up" onSubmit={handleLogin}>
      <h2 className="form-title">Jump Back In</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="sign_up-item">
        <label htmlFor="email">
          <div className="label_container">
            <Mail size={20} />
          </div>
        </label>
        <input type="email" id="email" placeholder="Email Address" autoFocus required />
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

      <button type="submit" className="form_submit" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Submit"}
      </button>
      
      <p className="login_option">
        Don't have an account yet? <Link to="/signup">Sign-Up Here</Link>
      </p>
    </form>
  );
}

export default LoginForms;
