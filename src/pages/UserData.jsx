import React from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../features/api/apiSlice";
import { toast } from "react-toastify";

function UserData() {
  const { data, isError, Error, isFetching } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const removeUserHandler = async (id) => {
    await deleteUser(id);
    toast.success("user deleted successfully", {
      position: "bottom-right",
    });
  };
  return (
    <>
      <div>
        <h1>All Users</h1>
        <div className="product-table-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td
                      className="!text-red-600 pointer cursor-pointer"
                      onClick={() => removeUserHandler(item.id)}
                    >
                      Delete
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isFetching && <h2>Loading........</h2>}
      {isError && <p>{Error.message}</p>}
    </>
  );
}

export default UserData;
