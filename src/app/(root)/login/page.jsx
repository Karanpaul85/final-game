"use client";
import { useEffect, useState } from "react";
import style from "./Login.module.css";
import Cryptr from "cryptr";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { useRouter } from "next/navigation";

const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CRYPTR_SECRET);

const Login = () => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const getLoginResult = async () => {
      try {
        const res = await axios.get("/api/login");

        if (res?.data?.isLoggedIn) {
          router.push("/dashboard/admin");
        } else {
          setIsLoggedIn(true); // Show login UI
        }
      } catch (error) {
        if (error.response?.status === 401) {
          console.warn("User is unauthorized");
          setIsLoggedIn(true); // Still show login UI
        } else {
          console.error("Login check failed:", error);
          // Optionally show a generic error
        }
      }
    };

    getLoginResult();
  }, []);

  const onChange = (e) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onFocus = () => {
    setIsError(false);
  };

  const onShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError("");
    if (inputValues.email === "" || inputValues.password === "") {
      setIsError(true);
      return;
    }

    setTimeout(async () => {
      try {
        const encryptedData = {
          email: cryptr.encrypt(inputValues.email),
          password: cryptr.encrypt(inputValues.password),
        };
        const res = await axios.post("/api/login", encryptedData, {
          headers: { "Content-Type": "application/json" },
        });

        if (res.data.message === "successful") {
          router.push("/dashboard/admin");
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        setApiError(
          error.response?.data?.message || "An unexpected error occurred"
        );
        console.error("Login Error:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    }, 0);
  };

  if (!isLoggedIn) {
    return "loading...";
  }

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
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={inputValues.password}
                onChange={onChange}
                name="password"
                onFocus={onFocus}
              />
              <button
                onClick={onShowPassword}
                type="button"
                className={style.showHide}
              >
                {isShowPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </button>
            </div>
            <div className={style.inputSec}>
              <button
                type="submit"
                disabled={isLoading}
                className={style.submit}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            {isError && (
              <div className={style.error}>Please enter the valid details</div>
            )}
            {apiError && <p className={style.error}>{apiError}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};
export default Login;
