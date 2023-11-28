import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/useAuth";
import { useMessage } from "../hooks/useMessage";

function Login() {
  const { login } = useAuth();

  const { showMessage } = useMessage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") return;

    fetch(`${import.meta.env.VITE_BACKEND_URI}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          const user = jwtDecode(data.token);

          login(user, data.token);

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", data.token);

          showMessage({
            text: "Login successful",
            type: "success",
          });
        } else {
          showMessage({
            text: "User or password incorrect",
            type: "error",
          });
        }
      });
  };

  return (
    <>
      <div className="w-full py-5 m-3 bg-blue-800 text-white  text-center rounded-lg">
        <h1 className="font-bold text-2xl">Login</h1>
      </div>

      <form
        action=""
        className="flex flex-col gap-5 bg-gray-400 p-5 rounded-lg text-gray-800"
      >
        <div className="flex flex-row gap-5 justify-between">
          <label htmlFor="username">Username: </label>
          <input
            type="username"
            id="username"
            name="username"
            className="border border-black rounded-lg focus:outline-none p-1"
            onChange={handleUsernameChange}
          />
        </div>

        <div className="flex flex-row gap-5 justify-between">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-black rounded-lg focus:outline-none p-1"
            onChange={handlePasswordChange}
          />
        </div>

        <button
          type="submit"
          className={` p-2 rounded-lg text-white ${
            username === "" || password === ""
              ? "bg-gray-600 hover:bg-gray-800"
              : "bg-blue-800 hover:bg-blue-900"
          } `}
          onClick={handleSubmit}
        >
          Login
        </button>

        <div className="flex flex-row justify-center">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </form>
    </>
  );
}

export { Login };
