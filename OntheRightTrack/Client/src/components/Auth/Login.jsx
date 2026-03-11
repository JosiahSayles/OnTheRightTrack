import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [error, setError] = useState();
  const { login } = useAuth();
  const navigate = useNavigate();

  const tryLogin = async (formData) => {
    setError(null);

    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      navigate("/users");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex-col justify-center min-h-screen bg-gray-200 ">
        <h1 className=" flex justify-center text-xl md:text-7xl font-bold md:pt-10 md:px-10 text-lime-400  mx-10 md:mx-20 mx-5 mt-5 pb-3 ">
          Login
        </h1>
        <section className="flex justify-center">
          <div className="flex-col justify-center w-1/5 bg-lime-700 p-8 rounded-xl mt-5 font-semibold">
            <form action={tryLogin}>
              <div className="mb-4 text-xl">
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
              <div className="mb-4 text-xl">
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
              <button className="border p-1 rounded-lg bg-lime-400 text-white w-full mt-4 hover:bg-stone-100 hover:text-lime-400 font-semibold">
                Login
              </button>
              {error && <p className="text-red-500 flex-row">*{error}*</p>}
              <p className="mt-4">
                Dont have an account?{" "}
                <Link to={"/register"} className="text-lime-400 font-semibold ">
                  Sign up now!
                </Link>
              </p>
            </form>
            <ul className="md:flex flex-row md:mt-30 text-lime-500 font-semibold ">
              <li className="ml-1 md:ml-4 hover:underline">Contact</li>
              <li className="ml-1 md:ml-4 hover:underline">
                Terms & Agreements
              </li>
              <li className="ml-1 md:ml-4 hover:underline">FAQ</li>
              <li className="ml-1 md:ml-4 hover:underline">Resources</li>
            </ul>
            <hr className="h-[1px] mt-5 mb-3 border-0 mx-10 bg-lime-400" />
          </div>
        </section>
      </div>
    </>
  );
}
