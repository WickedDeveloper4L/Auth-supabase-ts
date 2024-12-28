import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../requests";
import { AuthError, User } from "@supabase/supabase-js";

interface LoginProps {
  email: string;
  password: string;
}
const Login = () => {
  const [info, setInfo] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [user, setUser] = useState<null | User>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const response = await loginUser(info);
    if (response instanceof AuthError) {
      setIsLoading(false);
      switch (response.code) {
        case "email_address_invalid":
          setError("Invalid email address");
          break;
        case "email_exists":
          setError("Email already exists");
          break;
        case "email_not_confirmed":
          setError(
            "Email not verified, check your email for verification link"
          );
          break;
        case "invalid_credentials":
          setError("Invalid Login Details");
          break;
        case "user_banned":
          setError("We are unable to log you in at this time");
          break;
        case "user_not_found":
          setError("User does not exist");
          break;
        default:
          setError("An error occurred");
      }
    } else {
      console.log(response);
      setUser(response);
      setIsLoading(false);
      return response;
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className={styles.main}>
      <h1>Login</h1>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="johndoe@domain.tls"
          className={styles.input}
          onChange={handleChange}
          name="email"
          value={info.email}
        />
        <input
          type="password"
          placeholder="*********"
          className={styles.input}
          onChange={handleChange}
          name="password"
          value={info.password}
        />
        {isLoading && <p>Signing In...</p>}
        {error && <p>{error}</p>}
        <button onClick={handleSubmit} className={styles.btn}>
          Login
        </button>
        <p>
          No account? <Link to="/signup">create account.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
