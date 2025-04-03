import { useRef, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      if (res.user) {
        toast.success("User Logged in succesfully");
      }
      setLoading(false);
      setError("");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <section>
        <h1>Please Login</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>
          <div>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              ref={passwordInputRef}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div>
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
