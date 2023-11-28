import { useEffect, useState } from "react";
import "./App.css";

import { Layout } from "../Layout/Layout";
import { Message } from "../Message/Message";

import { AppRoutes } from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { useMessage } from "../hooks/useMessage";
import { EditProfile } from "../EditProfile/EditProfile";
import { useModal } from "../hooks/useModal";

function App() {
  const { message } = useMessage();

  const { modal } = useModal();

  return (
    <>
      {modal && <EditProfile />}
      <Layout>
        {message && <Message />}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
