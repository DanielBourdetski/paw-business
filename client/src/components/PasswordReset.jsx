import { useLocation, useNavigate, useParams } from "react-router-dom";
import Input from "./common/Input";
import userService from "../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validatePassword } from "../validation/users";
import useHandleError from "../hooks/useHandleError";
import useLoader from "../hooks/useLoader";

const InvalidToken = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Looks like our dog ate your token</h3>
      <p>
        Seriously though, seemd like your reset link is either incorrect or has
        been expired.
      </p>
      <button
        className="p-1 border rounded"
        onClick={() => navigate("/forgot-password")}
      >
        Want us to send another one?
      </button>
    </div>
  );
};

const PasswordReset = () => {
  const [isTokenLegit, setIsTokenLegit] = useState(null);
  const [password, setPassword] = useState("");

  const { resetToken: token } = useParams();
  const navigate = useNavigate();
  const handleError = useHandleError();
  const { startLoading, stopLoading, loaded } = useLoader();

  useEffect(() => {
    const confirmToken = async () => {
      startLoading();
      try {
        const isTokenConfirmed = await userService.confirmResetToken(token);
        setIsTokenLegit(isTokenConfirmed ? true : false);
      } catch (err) {
        handleError(err, "confirm reset link");
        setIsTokenLegit(false);
      } finally {
        stopLoading();
      }
    };

    confirmToken();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { error } = validatePassword(password);
    if (error) {
      return toast.info(
        "Password does not answer the requirements: 8 letters and at least one of each: lower case letter, upper case letter, number, special sign",
        { autoClose: 8000 }
      );
    }

    try {
      const res = await userService.resetPassword(password, token);
      toast.success(res);
      navigate("/login");
    } catch (err) {
      handleError(err, "update password");
    }
  };

  if (!loaded) return null;

  if (!isTokenLegit) return <InvalidToken />;

  return (
    <form className="md:w-1/3 mx-auto mt-20 lg:mt-52 flex flex-col">
      <h3 className="text-4xl mb-10">Choose your new password</h3>
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="mx-auto w-fit border border-slate-700 rounded p-1 px-2 mt-6"
        type="submit"
        onClick={onSubmit}
      >
        Reset Password
      </button>
    </form>
  );
};

export default PasswordReset;
