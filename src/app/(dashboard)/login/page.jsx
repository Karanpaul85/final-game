"use client";
import { useState } from "react";
import style from "./Login.module.css";
const Login = () => {
  const [isError, setIsError] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onFocus = () => {
    setIsError(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputValues.email === "" || inputValues.password === "") {
      setIsError(true);
      return;
    }
  };
  return (
    <div className="wrapper">
      <main>
        <div className={style.loginFormSec}>
          <form onSubmit={onSubmit} autoComplete="off">
            <h2>Login</h2>
            <div className={style.inputSec}>
              <input
                type="email"
                placeholder="Enter Email"
                value={inputValues.email}
                onChange={onChange}
                name="email"
                onFocus={onFocus}
              />
            </div>
            <div className={style.inputSec}>
              <input
                type="password"
                placeholder="Enter Password"
                value={inputValues.password}
                onChange={onChange}
                name="password"
                onFocus={onFocus}
              />
            </div>
            <div className={style.inputSec}>
              <input type="submit" value="Login" />
            </div>
            {isError && (
              <div className={style.error}>Please enter the valid details</div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};
export default Login;
