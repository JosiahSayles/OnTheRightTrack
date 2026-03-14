import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { register } = useAuth();

  const tryRegister = async (formData) => {
    setError(null);

    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ firstname, lastname, email, password });
      navigate("/users");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <section className="flex justify-center min-h-screen bg-gray-200 ">
        <div className="bg-lime-900 w-full md:w-3/4 text-shadow-lg s   ">
          <h2 className=" flex justify-center text-xl md:text-7xl font-bold md:pt-10 md:px-10 text-lime-400  mx-10 md:mx-20 mx-5 mt-5 pb-3 ">
            Register for an account!
          </h2>
          <hr className="h-[1px] mt-5 mb-3 border-0 md:mx-40 bg-lime-400" />
          <div className="flex-col justify-items-center  mt-10 md:text-2xl py-5">
            <form
              action={tryRegister}
              className="bg-lime-600 p-10 rounded-xl shadow-lg"
            >
              <div>
                <label>
                  First name:
                  <input
                    type="text"
                    name="firstname"
                    style={{ maxWidth: "100%" }}
                    className="bg-white my-2 w-full"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Last name:
                  <input
                    type="text"
                    name="lastname"
                    style={{ maxWidth: "100%" }}
                    className="bg-white my-2 w-full"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    style={{ maxWidth: "100%" }}
                    className="bg-white my-2 w-full"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    style={{ maxWidth: "100%" }}
                    className="bg-white my-2 w-full"
                    required
                  />
                </label>
              </div>
              <button className="border p-1 rounded-lg mt-4  bg-lime-400 text-white w-full hover:bg-stone-100 hover:text-lime-400 font-semibold">
                Register
              </button>
              {error && <p role="alert">*{error}*</p>}
            </form>
            <hr className="h-[1px] mt-5 mb-3 border-0 mx-10 bg-lime-400" />
            <p>
              Already have an account?{" "}
              <Link
                to={"/"}
                id="login-link"
                className="text-lime-300 hover:underline"
              >
                Login here
              </Link>
            </p>
            <div>
              <ul className="lg:flex md:flex-row md:mt-50 text-lime-500 font-semibold ">
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
        </div>
        <div className=""></div>
      </section>
    </>
  );
}
