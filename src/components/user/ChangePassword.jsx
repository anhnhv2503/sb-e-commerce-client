import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from "../service/ApiFunctions";

const ChangePassword = ({ open, setOpen }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [oldPasswordToggle, setOldPasswordToggle] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [isToggleConfirmPass, setIsToggleConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveChange = async (e) => {
    e.preventDefault();

    let newErros = { ...error };

    if (oldPassword.trim() === "") {
      newErros.oldPassword = "Old password is required";
    } else {
      delete newErros.oldPassword;
    }

    if (newPassword.trim() === "") {
      newErros.newPassword = "New password is required";
    } else {
      delete newErros.newPassword;
    }
    if (confirmPassword.trim() === "") {
      newErros.confirmPassword = "Confirm new password is required";
    } else {
      delete newErros.confirmPassword;
    }

    if (newPassword !== confirmPassword) {
      newErros.confirmPassword = "Passwords do not match";
    }

    setError(newErros);

    if (Object.keys(newErros).length === 0) {
      try {
        setLoading(true);
        const response = await changePassword(oldPassword, newPassword);
        if (response.status === 200) {
          toast.success("Password changed successfully");
        }
        setLoading(false);
        setNewPassword("");
        setConfirmPassword("");
        setOldPassword("");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data?.data);
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <Toaster />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold leading-6 text-gray-900"
                  >
                    Change Password
                  </DialogTitle>

                  <div className="mt-7">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Old Password
                    </label>
                    <div className="mt-2 relative">
                      <input
                        id="oldPassword"
                        name="oldPassword"
                        value={oldPassword}
                        type={oldPasswordToggle ? "text" : "password"}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={
                          !error.oldPassword
                            ? "bg-white block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            : "bg-white mt-1 block w-full px-3 py-2 border rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-1 bg-slate-50 shadow-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                        }
                      />
                      {!oldPasswordToggle ? (
                        <>
                          <FaEye
                            onClick={() =>
                              setOldPasswordToggle(!oldPasswordToggle)
                            }
                            className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                          />
                        </>
                      ) : (
                        <>
                          <FaEyeSlash
                            onClick={() =>
                              setOldPasswordToggle(!oldPasswordToggle)
                            }
                            className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                          />
                        </>
                      )}
                      {error.oldPassword && (
                        <p className="mt-1 text-pink-600 text-sm">
                          {error.oldPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-7">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      New Password
                    </label>
                    <div className="mt-2 relative">
                      <input
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        type={isToggle ? "text" : "password"}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={
                          !error.newPassword
                            ? "bg-white block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            : "bg-white mt-1 block w-full px-3 py-2 border rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-1 bg-slate-50 shadow-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                        }
                      />
                      {!isToggle ? (
                        <>
                          <FaEye
                            onClick={() => setIsToggle(!isToggle)}
                            className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                          />
                        </>
                      ) : (
                        <>
                          <FaEyeSlash
                            onClick={() => setIsToggle(!isToggle)}
                            className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                          />
                        </>
                      )}
                      {error.newPassword && (
                        <p className="mt-1 text-pink-600 text-sm">
                          {error.newPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-7">
                    <label
                      htmlFor="confirmNewPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm New Password
                    </label>
                    <div className="mt-2 relative">
                      <input
                        id="confirmNewPassword"
                        name="newPassword"
                        value={confirmPassword}
                        type={isToggleConfirmPass ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={
                          !error.confirmPassword
                            ? "bg-white block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            : "bg-white mt-1 block w-full px-3 py-2 border rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-1 bg-slate-50 shadow-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                        }
                      />
                      {!isToggleConfirmPass ? (
                        <>
                          <FaEye
                            onClick={() =>
                              setIsToggleConfirmPass(!isToggleConfirmPass)
                            }
                            className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                          />
                        </>
                      ) : (
                        <>
                          <FaEyeSlash
                            onClick={() =>
                              setIsToggleConfirmPass(!isToggleConfirmPass)
                            }
                            className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                          />
                        </>
                      )}
                      {error.confirmPassword && (
                        <p className="mt-1 text-pink-600 text-sm">
                          {error.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {loading ? (
                <div role="status" className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    onClick={handleSaveChange}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 sm:ml-3 sm:w-auto"
                  >
                    Save Change
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ChangePassword;
