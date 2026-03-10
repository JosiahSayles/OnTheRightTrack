import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Auth/AuthContext";

export default function HomePage() {
  const [error, setError] = useState();
  const { login } = useAuth();
  const navigate = useNavigate();

  const tryLogin = async (formData) => {
    setError(null);

    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <section className="flex justify-center   min-h-screen ">
        <div className="bg-lime-900 md:w-1/2 text-shadow-lg w-full px-2  ">
          <h1 className=" text-xl md:text-6xl font-bold md:pt-10 md:px-10 text-lime-400  mx-10 md:mx-20 mx-5 mt-5 pb-3">
            On the Right Track!
          </h1>
          <h2 className="md:text-2xl font-semibold md:px-15 py-2 text-white bg-lime-400 md:w-3/4 md:ml-32 px-4  mx-10 ">
            Job Application Tracker
          </h2>
          <h3 className=" md:text-4xl font-bold md:pt-10 md:px-12 text-lime-400  md:mx-20 mt-8 pb-3">
            Not yet a member?
          </h3>
          <h3 className="md:text-2xl font-semibold px-3 md:py-5 text-white bg-lime-400 md:w-3/4 md:ml-32">
            Sign up for an account and start tracking your progress today!
            <Link to={"/register"}>
              <button className="md:ml-10 ml-20 bg-lime-800 py-1 px-2 rounded-md text-lime-400 hover:bg-lime-400 hover:text-lime-800 hover:border border hover:cursor-pointer">
                Get started
              </button>
            </Link>
          </h3>
          <hr className="h-[1px] mt-10 mb-3 border-0 mx-10 bg-lime-300" />
          <div className="flex-col justify-items-center ">
            <h3 className="md:text-3xl md:mt-10 mb-4 text-lime-200">
              Manage your applications with ease!
            </h3>
            <div className="flex-row md:flex-wrap lg:flex justify-center md:mx-2 xl:text-2xl  text-lime-200 text-shadow-md font-bold w-full ">
              <h4 className="flex-col  justify-items-center bg-lime-600 rounded-lg md:py-8 px-2 lg:py-10 xl:px-10 md:mr-2 mt-2 lg:w-1/5 shadow-lg hover:bg-lime-200 hover:text-lime-500">
                <img src="/icons/add.png" alt="add icon" className="md:w-14 " />
                Add Applications
              </h4>
              <h4 className="flex-col justify-items-center bg-lime-600 md:py-8 px-2 lg:py-10 xl:px-10 md:mr-2 rounded-lg lg:w-1/5 mt-2 shadow-lg hover:bg-lime-200 hover:text-lime-500">
                <img
                  src="/icons/update.png"
                  alt="update icon"
                  className="md:w-14 "
                />
                Update your progress
              </h4>
              <h4 className="flex-col justify-items-center bg-lime-600 rounded-lg md:py-8 px-2 lg:py-10 xl:px-10 md:mr-2 mt-2 lg:w-1/5 shadow-lg hover:bg-lime-200 hover:text-lime-500">
                <img
                  src="/icons/followup.png"
                  alt="followup icon"
                  className="md:w-14 "
                />
                Follow-up with opportunities
              </h4>
              <h4 className="flex-col justify-items-center bg-lime-600 rounded-lg md:py-8 px-2 lg:py-10 xl:px-10  mt-2 lg:w-1/5 shadow-lg hover:bg-lime-200 hover:text-lime-500">
                <img
                  src="/icons/delete.png"
                  alt="delete icon"
                  className="md:w-14 "
                />
                Remove dead ends
              </h4>
            </div>
          </div>

          <figure className="md:flex justify-center  ">
            <img
              src="/img/workspace.jpg"
              alt="Work space computer and phone"
              className="md:mt-10 mt-2 md:w-1/2 shadow-md rounded-3xl "
            />
            <img
              src="/img/interview.jpg"
              alt="man being interviewed by another."
              className="md:mt-10 md:mx-1 mt-2  md:w-1/2 shadow-md rounded-3xl "
            />
          </figure>
        </div>
        <div className="flex-col justify-items-center bg-stone-100 md:w-1/3 px-2 ">
          <h2 className="md:text-5xl font-bold pt-30 mb-10 text-shadow-lg">
            Welcome Back!
            <hr className="h-[1px] mt-5 mb-3 border-0 mx-10 bg-lime-400" />
          </h2>
          <h2 className="md:text-4xl mb-5 ">Login </h2>
          <div className="flex-col justify-items-centers ">
            <form action={tryLogin}>
              <div className="mb-4">
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    style={{ maxWidth: "100%" }}
                    className="bg-white w-full"
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    style={{ maxWidth: "100%" }}
                    className="bg-white w-full"
                    required
                  />
                </label>
              </div>
              <button className="border p-1 rounded-lg bg-lime-400 text-white w-full hover:bg-stone-100 hover:text-lime-400 font-semibold">
                Login
              </button>
              {error && <p className="text-red-500 flex-row">*{error}*</p>}
              <p>
                Dont have an account?{" "}
                <Link to={"/register"} className="text-lime-400 font-semibold">
                  Sign up now!
                </Link>
              </p>
            </form>
            <ul className="lg:flex md:flex-row md:mt-40 text-lime-500 font-semibold ">
              <li className="ml-1 lg:ml-4 hover:underline">Contact</li>
              <li className="ml-1 lg:ml-4 hover:underline">
                Terms & Agreements
              </li>
              <li className="ml-1 lg:ml-4 hover:underline">FAQ</li>
              <li className="ml-1 lg:ml-4 hover:underline">Resources</li>
            </ul>
            <hr className="h-[1px] mt-5 mb-3 border-0 mx-10 bg-lime-400" />
          </div>
        </div>
      </section>
    </>
  );
}
