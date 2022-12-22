import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import { userActions } from "../../store/store";

const AccountDropdown = ({ userIsAdmin, closeDropdown }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const btnClassNames =
    "m-2 px-4 py-2 hover:shadow-sm hover:shadow-slate-400 hover:bg-white hover:bg-opacity-30 rounded-full duration-75";

  const handleLogout = () => {
    userService.signout();
    dispatch(userActions.removeUser());
    navigate("/login");
  };

  const onAccountClick = () => navigate("/account");

  const onAdminClick = () => navigate("/admin");

  return (
    <div className="flex flex-col absolute right-10 top-28 bg-slate-400 bg-opacity-20 backdrop-blur-lg font-semibold rounded p-3 duration-75">
      <button
        className={btnClassNames}
        onClick={() => {
          onAccountClick();
          closeDropdown();
        }}
      >
        Account
      </button>
      {userIsAdmin && (
        <button
          className={btnClassNames}
          onClick={() => {
            onAdminClick();
            closeDropdown();
          }}
        >
          Admin Panel
        </button>
      )}
      <button
        onClick={handleLogout}
        className="border border-slate-300 rounded mt-4 text-sm w-min px-4 py-1 mx-auto hover:bg-slate-100"
      >
        Logout
      </button>
    </div>
  );
};

const Account = ({ userIsAdmin }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <>
      <BsPersonCircle
        onClick={toggleDropdown}
        cursor="pointer"
        className="p-0 w-[40px] h-[40px] ml-auto mr-6"
      />
      {dropdownOpen && (
        <AccountDropdown
          userIsAdmin={userIsAdmin}
          closeDropdown={() => setDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Account;
