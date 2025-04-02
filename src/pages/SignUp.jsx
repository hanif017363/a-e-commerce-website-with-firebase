import { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Auth object:", auth); // Debug line
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      await setDoc(doc(db, "users", user.email), {
        email: user.email,
        password: user.password,
      });

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        email: user.email,
        role: "user",
      });
      setLoading(false);
      setError("");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error); // Debug line
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      <main>
        <section>
          <h1>Please Register</h1>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
              <div>
                <label htmlFor="password">Your Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                {!loading && <button type="submit">Sign Up</button>}
                {loading && <p>Create New User</p>}
                {error && (
                  <p style={{ color: "red", fontSize: "20px" }}>{error}</p>
                )}
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignUp;
