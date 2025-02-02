import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const modalRef = useRef();
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);

  useEffect(() => {
    if (state == "login" || state == "signup") {
      document.body.style.overflow = "hidden";
    }

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowRecruiterLogin(false); // Close the popup
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTextDataSubmitted(true);
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 w-screen h-screen flex justify-center items-center overflow-hidden">
      <form ref={modalRef} onSubmit={handleSubmit} className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">Recruiter {state}</h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {/* Fixing the Fragment Issue */}
        {state === "signup" && isTextDataSubmitted ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img className="w-16 rounded-full" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                <input onChange={(e) => setImage(e.target.files[0])} type="file" hidden id="image" />
              </label>
              <p>
                Upload Company <br /> Logo
              </p>
            </div>
          </>
        ) : (
          <div>
            {state !== "login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  type="text"
                  placeholder="Company Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {state === "login" && <p className=" text-sm text-blue-600 my-4 cursor-pointer">Forgot password?</p>}

        <button type="submit" className="mt-3 w-full py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none cursor-pointer">
          {state === "login" ? "Login" : isTextDataSubmitted ? "create account" : "next"}
        </button>

        {state === "login" ? (
          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <span className="cursor-pointer text-blue-600" onClick={() => setState("signup")}>
              Sign up
            </span>{" "}
          </p>
        ) : (
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <span className="cursor-pointer text-blue-600" onClick={() => setState("login")}>
              Login
            </span>
          </p>
        )}

        <img
          className="absolute top-5 right-5 cursor-pointer "
          onClick={() => (setShowRecruiterLogin(false), document.body.style.overflow = "auto")}
          src={assets.cross_icon}
          alt="Close Button"
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
