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
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <h1>Register for an account!</h1>
        <section>
          <div>
            <form action={tryRegister}>
              <label>
                First name:
                <input type="text" name="firstname" />
              </label>
              <label>
                Last name:
                <input type="text" name="lastname" />
              </label>
              <label>
                Email:
                <input type="text" name="email" />
              </label>
              <label>
                Password:
                <input type="text" name="password" />
              </label>
              <button>Register</button>
              {error && <p role="alert">*{error}*</p>}
            </form>
            <p>
              Already have an account?
              <Link to={"/login"} id="login-link" className="">
                Login here.
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
