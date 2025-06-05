import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function sendEmail(){
        axios.post(import.meta.env.VITE_API_URL + "/api/user/sendmail", {
            email: email
        }).then((response) => {
            console.log(response.data);
            setEmailSent(true);
            toast.success("Email sent successfully");
        }).catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
        });
    }
    function changePassword(){
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        axios.post(import.meta.env.VITE_API_URL+ "/api/user/changePass", {
            email: email,
            otp: otp,
            password: password
        }).then((response) => {
            console.log(response.data);
            toast.success("Password changed successfully");
            window.location.href = "/login";
        }).catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
            window.location.reload();
        });
    }
  return (
    <div className="w-full h-screen bg-black text-white flex p-2">
      {
                emailSent ?
               <div className="w-full h-full flex items-center justify-center bg-black text-white">
          <div className="bg-gray-700 p-4 rounded shadow-md w-[400px]">
                        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
                        <div className="mb-4">
                            <label
                                htmlFor="otp"
                                className="block text-sm font-medium text-gray-700"
                            >
                                OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                }}
                                value={otp}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                value={password}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                value={confirmPassword}
                            />
                        </div>
                        <button
                            onClick={changePassword}
                            type="submit"
                            className="w-full flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50 p-3 rounded-md  items-center justify-center gap-2"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>


        :<div className="w-full h-full flex items-center justify-center bg-black text-white">
          <div className="bg-gray-700 p-4 rounded shadow-md w-[400px]">
            <h1 className="text-2xl font-bold mb-4">Forget Password</h1>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <button
              type="submit"
              className="w-full flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50 p-3 rounded-md  items-center justify-center gap-2"
                            onClick={sendEmail}
            >
              Send OTP
            </button>
          </div>
        </div>
      }
    </div>
  );
}
