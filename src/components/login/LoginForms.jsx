import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/signup/SignUpForms.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

function LoginForms() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
          localStorage.setItem("email", email);
          navigate("/email-verification");
          return;
        }
        
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await res.json();

      if (data.token) {
        // Save both token and email
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        localStorage.setItem("name", data.name || email.split('@')[0]); // Use name from response or email prefix

        // 🔔 Tell NavBar to update immediately
        window.dispatchEvent(new Event("authChange"));

        // Redirect
        navigate("/");
      } else if (data.requires_verification) {
        // User needs to verify their email
        localStorage.setItem("email", email);
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
