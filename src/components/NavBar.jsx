import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContxt";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function NavBar() {
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userLoggedIn) {
      const getCurrentUserRole = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setRole(data.role);
          setUsername(data.username || "");
        } else {
          setRole("user");
        }
      };
      getCurrentUserRole();
    } else {
      setRole("user");
    }
  }, [userLoggedIn, currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    setRole("user");
    navigate("/");
    setUsername("");
  };

  return (
    <div>
      <div className="nav my-5">
        <ul className="flex justify-evenly font-bold">
          <NavLink to={"/"}>Home</NavLink>

          <li>
            <NavLink to={"/shop"}>Shop</NavLink>
          </li>
          <li>
            <NavLink to={"/cart"}>Cart</NavLink>
          </li>
          {userLoggedIn && (
            <li>
              <NavLink to={"/checkout"}>CheckOut</NavLink>
            </li>
          )}

          {userLoggedIn && (role === "admin" || role === "super-admin") && (
            <>
              <li>
                <NavLink to={"/addproduct"}>Add Product</NavLink>
              </li>
              <li>
                <NavLink to={"/allproducts"}>All Product</NavLink>
              </li>
              <li>
                <NavLink to={"/allUser"}>All Users</NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink to={"/app"}>App</NavLink>
          </li>

          {!userLoggedIn && (
            <>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/signup"}>Sign Up</NavLink>
              </li>
            </>
          )}

          {userLoggedIn && (
            <>
              <li>
                <p className="!text-red-600">{username}</p>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
