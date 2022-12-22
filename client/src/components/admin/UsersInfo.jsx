import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";
import userService from "../../services/userService";
import useHandleError from "../../hooks/useHandleError";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useLoader from "../../hooks/useLoader";
import UsersTable from "./UsersTable";

const UsersInfo = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  // const [prevenSct]

  const navigate = useNavigate();
  const handleError = useHandleError();
  const { startLoading, stopLoading, loaded } = useLoader();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        startLoading();

        const fetchedUsers = await userService.getAllUsers();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (err) {
        handleError(err, "fetch all users infos");
      } finally {
        stopLoading();
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const toggleAdminStatus = async (id) => {
    try {
      const user = await adminService.toggleAdminStatusOfUser(id);
      if (!user) return;

      const indexOfUserInState = users.findIndex((u) => u._id === id);
      const updatedUserState = [...users];
      updatedUserState[indexOfUserInState] = user;

      setUsers(updatedUserState);
    } catch (err) {
      handleError(err, "toggle admin status of a user");
    }
  };

  const onDeleteUser = (id) => {
    const deleteUser = async () => {
      try {
        const deletedUser = await adminService.deleteUser(id);

        const userIndexInState = users.findIndex(
          (u) => u._id === deletedUser._id
        );
        const updatedUsers = [...users];
        updatedUsers.splice(userIndexInState, 1);

        setUsers(updatedUsers);
      } catch (err) {
        handleError(err, "delete a user from database");
      }
    };

    confirmAlert({
      title: "Are you sure you want to delete the user?",
      message: "This is an irreversible action.",
      buttons: [
        {
          label: "Delete user",
          onClick: deleteUser,
        },
        {
          label: "Take me back",
        },
      ],
    });
  };

  const OnEditUser = (id) => navigate(`/edit-user/${id}`);

  const onSearchUser = (e) => {
    e.preventDefault();

    const searchTerm = e.target[0].value;
    if (!searchTerm) return setFilteredUsers(users);

    const matchingUsersByName = users.filter((u) =>
      u.name.match(new RegExp(searchTerm, "i"))
    );

    const matchingUsersByEmail = users.filter((u) => {
      u.email.match(new RegExp(searchTerm, "i"));
    });

    const matchingUsers = [...matchingUsersByEmail, ...matchingUsersByName];

    const uniqueMatchingUsers = matchingUsers.filter(
      (u, i, users) => i === users.findIndex((u2) => u2._id === u._id)
    );

    setFilteredUsers(uniqueMatchingUsers);
  };

  if (!loaded) return null;

  return (
    <div>
      <form className="mx-auto w-fit" onSubmit={onSearchUser}>
        <input
          type="text"
          placeholder="Search for users"
          className="border border-black mx-20 my-5 p-1 pl-4 rounded"
        />
      </form>

      <UsersTable
        users={filteredUsers}
        onDeleteUser={onDeleteUser}
        onEditUser={OnEditUser}
        onToggleAdmin={toggleAdminStatus}
      />
    </div>
  );
};

export default UsersInfo;
