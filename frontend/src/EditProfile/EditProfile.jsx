import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import { useMessage } from "../hooks/useMessage";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

function EditProfile() {
  const { closeModal } = useModal();

  const { token } = useAuth();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const { showMessage } = useMessage();

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || email === "") return;

    const userId = jwtDecode(token).user_id;

    fetch(`${import.meta.env.VITE_BACKEND_URI}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ username, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          showMessage({
            text: "Profile edited successfully",
            type: "success",
          });

          window.location.reload();
        } else {
          showMessage({
            text: "Error editing profile",
            type: "error",
          });
        }
      });

    closeModal();
  };

  useEffect(() => {
    const userId = jwtDecode(token).user_id;
    fetch(`${import.meta.env.VITE_BACKEND_URI}/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setUsername(data.username);
          setEmail(data.email);
        } else {
          showMessage({
            text: "Error getting user data",
            type: "error",
          });
        }
      });
  }, []);

  return (
    <div className="absolute w-full h-full z-30 bg-opacity-50 bg-gray-800 flex justify-center items-center">
      <div className="bg-gray-500 p-5 flex flex-col text-white gap-5">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl">Edit Profile</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={closeModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <form
          action=""
          className="flex flex-col gap-5 bg-gray-400 p-5 rounded-lg text-gray-800"
        >
          <div className="flex flex-row gap-5 justify-between">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-black rounded-lg focus:outline-none p-1"
              onChange={handleUsernameChange}
              defaultValue={username}
            />
          </div>
          <div className="flex flex-row gap-5 justify-between">
            <label htmlFor="username">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-black rounded-lg focus:outline-none p-1"
              onChange={handleEmailChange}
              defaultValue={email}
            />
          </div>

          <button
            type="submit"
            className={` p-2 rounded-lg text-white ${
              username === "" || email === ""
                ? "bg-gray-600 hover:bg-gray-800"
                : "bg-green-800 hover:bg-green-900"
            } `}
            onClick={handleSubmit}
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export { EditProfile };
