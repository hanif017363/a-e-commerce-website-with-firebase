import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContxt";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

function NavBar() {
  const { userLoggedIn, currentUser } = useAuth();
  let [role, setRole] = useState("user");
  useEffect(() => {
    if (userLoggedIn) {
      const getCurrentUserRole = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const roleDb = docSnap.data().role;
          setRole(roleDb);
          console.log(roleDb);
        } else {
          console.log("No such document!");
          setRole("user");
        }
      };
      getCurrentUserRole();
    }
  }, [userLoggedIn, currentUser]);

  return (
    <div>
      <div className="nav">
        <ul>
          <NavLink to={"/"}>Home</NavLink>

          <li>
            <NavLink to={"/shop"}>Shop</NavLink>
          </li>
          <li>
            <NavLink to={"/cart"}>Cart</NavLink>
          </li>
          {(userLoggedIn && role === "admin") || role === "super-admin" ? (
            <li>
              <NavLink to={"/addproduct"}>Add Product</NavLink>
            </li>
          ) : null}

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
                <NavLink to={"/"} onClick={() => signOut(auth)}>
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
