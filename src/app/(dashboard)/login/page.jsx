"use client";
import { useEffect, useState } from "react";
import style from "./Login.module.css";
import Cryptr from "cryptr";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { getCookie, setCookie } from "@/app/utils/common";
import { useRouter } from "next/navigation";

const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CRYPTR_SECRET);

const Login = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
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
        console.log(encryptedData, "encryptedData");
        const res = await axios.post("/api/login", encryptedData, {
          headers: { "Content-Type": "application/json" },
        });

        if (res.data.message === "successful") {
          setCookie("isUserLoggedIn", true, 1);
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

  useEffect(() => {
    if (getCookie("isUserLoggedIn")) {
      router.replace("/dashboard/admin");
    }
  }, []);

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
              <button type="submit" disabled={isLoading}>
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
