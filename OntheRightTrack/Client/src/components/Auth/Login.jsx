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
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <section>
          <div>
            <form action={tryLogin}>
              <label>
                Email:
                <input type="text" name="email" className="" />
              </label>
              <label>
                Password:
                <input type="text" name="password" className="" />
              </label>
              <button>Login</button>
              {error && <p role="alert">*{error}*</p>}
              <p>
                Dont have an account?
                <Link to={"/register"} className="">
                  Sign up now!
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
