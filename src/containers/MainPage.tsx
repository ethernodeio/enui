import React from "react";
import { useUsername } from "../stores/useCredsStore";
import { NavigationBar } from "../components/navigationComponent";

const MainPage: React.FC = () => {
  const [username] = useUsername();
  return (
    <div>
      <NavigationBar title={"Home - Welcome to enUI " + username} />
    </div>
  );
};
export default MainPage;
