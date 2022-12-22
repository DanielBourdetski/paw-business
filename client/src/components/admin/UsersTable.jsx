import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";
import { GrClose, GrUserAdmin } from "react-icons/gr";
import Modal from "../common/Modal";
import {
  MdOutlineRemoveModerator,
  MdOutlineAddModerator,
} from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserCard = ({
  user,
  onEditUser,
  onDeleteUser,
  handleAdminChange,
  closeInfo,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeInfo && closeInfo();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [closeInfo]);

  return (
    <Modal>
      <div
        ref={ref}
        className="w-2/3 md:w-1/3 md:h-3/4 bg-white flex flex-col md:justify-between p-10 gap-y-2 relative overscroll-none"
      >
        <div className="self-center">
          <h2 className="text-2xl font-bold">{user.name}'s Info</h2>
          <p className="text-sm">{user.isAdmin ? "Admin" : null}</p>
        </div>
        <p>Email: {user.email}</p>
        <p>
          User since:{" "}
          {new Date(user.createdAt)
            .toLocaleDateString("en-GB", {
              day: "numeric",
              month: "2-digit",
              year: "numeric",
            })
            .replaceAll("/", "-")}
        </p>
        <p>Items in cart: {user.cart.length}</p>
        <p>Favorite items: {user.favorites.length}</p>

        <div className="flex justify-center gap-x-4 w-full mt-10">
          <AiOutlineEdit
            className="w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200"
            onClick={() => onEditUser(user._id)}
          />
          <AiOutlineDelete
            className="w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200"
            onClick={() => onDeleteUser(user._id)}
          />
          {user.isAdmin ? (
            <MdOutlineRemoveModerator
              onClick={handleAdminChange}
              className="w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200"
            />
          ) : (
            <MdOutlineAddModerator
              onClick={handleAdminChange}
              className="w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200"
            />
          )}
        </div>

        <GrClose
          onClick={closeInfo}
          className="absolute top-5 right-5 cursor-pointer"
        />
      </div>
    </Modal>
  );
};

const UsersTable = ({
  className,
  users,
  onEditUser,
  onDeleteUser,
  onToggleAdmin,
}) => {
  const [userCard, setUserCard] = useState(null);

  const currentUser = useSelector((state) => state.user);

  const handleCloseInfo = () => setUserCard(null);

  const handleAdminChange = (user) => {
    onToggleAdmin(user._id);
    if (currentUser.email !== user.email)
      toast.success(user.isAdmin ? "Admin status revoked" : "New admin added");
    handleCloseInfo();
  };

  return (
    <div>
      {userCard && (
        <UserCard
          user={userCard}
          onEditUser={onEditUser}
          onDeleteUser={onDeleteUser}
          handleAdminChange={() => handleAdminChange(userCard)}
          closeInfo={handleCloseInfo}
        />
      )}

      <table
        className={`mx-auto w-full p-1 border border-separate ${className}`}
      >
        <thead className="border">
          <tr className="font-bold border">
            <th className="border">Name</th>
            <th className="border">Email</th>
            <th className="border">Info</th>
            <th className="border">Actions</th>
          </tr>
        </thead>

        <tbody className="border">
          {users.map((u) => {
            return (
              <tr className="border md:text-center" key={u._id}>
                <td className="border">
                  <div className=" flex items-center md:justify-center gap-x-2 ">
                    <div className="truncate max-w-[80px] md:max-w-none ">
                      {u.name}
                    </div>
                    <div>
                      {u.isAdmin && <GrUserAdmin className="w-4 h-4" />}
                    </div>
                  </div>
                </td>
                <td className="border px-2 truncate max-w-[150px]">
                  {u.email}
                </td>
                <td className="flex flex-col p-2 border justify-center items-center">
                  <VscOpenPreview
                    className="cursor-pointer"
                    onClick={() => setUserCard(u)}
                  />
                </td>
                <td className="border">
                  <div className="flex justify-evenly">
                    <AiOutlineEdit
                      className="w-5 h-5 cursor-pointer rounded-full hover:bg-slate-200"
                      onClick={() => onEditUser(u._id)}
                    />
                    <AiOutlineDelete
                      className="w-5 h-5 cursor-pointer rounded-full hover:bg-slate-200"
                      onClick={() => onDeleteUser(u._id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
