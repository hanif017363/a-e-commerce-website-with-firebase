import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContxt";
function PrivateAdminRoute({ children }) {
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
        } else {
          console.log("No such document!");
        }
      };
      getCurrentUserRole();
    }
  }, [currentUser, userLoggedIn]);

  return (
    <>
      {userLoggedIn && (role === "super-admin" || role === "admin") ? (
        children
      ) : (
        <h1>Please Wait...</h1>
      )}
    </>
  );
}

export default PrivateAdminRoute;
