import React, { useEffect, useState } from "react";
import styles from "../Login/login.module.scss";
import { Link, useNavigate } from "react-router";
import { signUpNewuser } from "../../requests";
import { AuthError, User } from "@supabase/supabase-js";

interface SignupProps {
  name: string;
  email: string;
  password: string;
}
const Signup = () => {
  const [signupInfo, setSignupInfo] = useState<SignupProps>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [user, setUser] = useState<null | User>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await signUpNewuser(signupInfo);
    if (response instanceof AuthError) {
      setIsLoading(false);
      switch (response.code) {
        case "email_address_invalid":
          setError("Invalid email address");
          break;
        case "email_exists":
          setError("Email already exists");
          break;
        case "user_already_exists":
          setError(
            "An account with the email already exists, login to continue."
          );
          setUser(null);
          break;
        case "identity_already_exists":
          setError("A user with the email already exist");
          break;
        case "invalid_credentials":
          setError("Invalid Login Details");
          break;
        case "weak_password":
          setError("Password is too weak");
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
      <h1>Signup</h1>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="John Doe"
          className={styles.input}
          onChange={handleChange}
          name="name"
          value={signupInfo.name}
        />
        <input
          type="text"
          placeholder="johndoe@domain.tls"
          className={styles.input}
          onChange={handleChange}
          name="email"
          value={signupInfo.email}
        />
        <input
          type="password"
          placeholder="*********"
          className={styles.input}
          onChange={handleChange}
          name="password"
          value={signupInfo.password}
        />
        {isLoading && <p>creating account...</p>}
        {error && <p>{error}</p>}
        <button onClick={handleSubmit} className={styles.btn}>
          SignUp
        </button>
        <p>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
