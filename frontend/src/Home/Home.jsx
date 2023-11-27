import { useAuth } from "../hooks/useAuth";
import { useMessage } from "../hooks/useMessage";

function Home() {
  const { user, logout } = useAuth();

  const { showMessage } = useMessage();

  const handleLogout = () => {
    logout();
    showMessage({
      text: "You have been logged out!",
      type: "success",
    });
  };

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
            className="bg-red-800 w-52 rounded-lg py-3 text-lg text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export { Home };
