import React, { useEffect, useState } from "react";
import { useUsername } from "../stores/useCredsStore";
import { useToken } from "../stores/useTokenStore";
import { useNode } from "../stores/useNodesStore";
import { NavigationBar } from "../components/navigationComponent";

const MainPage: React.FC = () => {
  const [username, setUsername] = useUsername();
  const [token, setToken] = useToken();
  const [nodes, setNodes] = useNode();

  return (
    <div>
      <NavigationBar title={"Home - Welcome to enUI " + username} />
    </div>
  );
};
export default MainPage;
