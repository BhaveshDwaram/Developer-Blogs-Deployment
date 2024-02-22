import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory hook
import {url} from "../../url";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(null); // State variable to manage error message
  const history = useHistory(); // Initialize useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(url+"/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Wrong credentials!"); // Set error message
    }
  };

  // Function to handle redirection to the register page
  const redirectToRegister = () => {
    history.push("/register");
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <div className="loginFormContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter your username..."
            ref={userRef}
          />
          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter your password..."
            ref={passwordRef}
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            Login
          </button>
          {error && <span className="loginError">{error}</span>}
        </form>
      </div>
      <div className="registerLink"> {/* New User? Register Here */}
        <span onClick={redirectToRegister}>New User? Register Here</span>
      </div>
    </div>
  );
}
