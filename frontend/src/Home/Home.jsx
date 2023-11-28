import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMessage } from "../hooks/useMessage";
import { useModal } from "../hooks/useModal";
import { jwtDecode } from "jwt-decode";

function Home() {
  const { token, logout } = useAuth();

  const { showMessage } = useMessage();

  const { openModal } = useModal();

  const [user, setUser] = useState({});

  const handleLogout = () => {
    logout();
    showMessage({
      text: "You have been logged out!",
      type: "success",
    });
  };

  useEffect(() => {
    const userId = jwtDecode(token).user_id;
    fetch(`${import.meta.env.VITE_BACKEND_URI}/api/users/${userId}`, {
      headers: {
        token: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
        } else {
          showMessage({
            text: "Session expired",
            type: "error",
          });
          logout();
        }
      })
      .catch((err) => {
        showMessage({
          text: "Session expired",
          type: "error",
        });
        logout();
      });
  }, []);

  return (
    <>
      <div className="w-full py-5 m-3 bg-gray-800 text-white  text-center rounded-lg">
        <h1 className="font-bold text-2xl">Home</h1>
      </div>

      <div className="flex flex-col gap-5 bg-gray-400 py-20 px-3 rounded-lg">
        <p className="text-center text-2xl">
          Welcome <strong>{user.username}</strong> to the Home page!
        </p>

        <div className="flex flex-row justify-center mt-5">
          <button
            className="bg-red-800 w-52 rounded-lg py-3 text-lg text-white hover:bg-red-900"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-blue-800 w-52 rounded-lg py-3 text-lg text-white ml-5 hover:bg-blue-900"
            onClick={openModal}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}

export { Home };
