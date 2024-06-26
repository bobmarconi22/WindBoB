import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message === "Invalid credentials") {
          setErrors({ credential: "The provided credentials were invalid" });
        }
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button
          className="submit-log-in"
          disabled={credential.length < 4 || password.length < 6}
          type="submit"
        >
          Log In
        </button>
        <button
          className="submit-log-in"
          type="submit"
          onClick={() => {
            setCredential("demo@user.io");
            setPassword("password12321");
            handleSubmit();
          }}
        >
          Log In Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
