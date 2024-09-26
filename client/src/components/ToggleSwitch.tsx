import { DarkModeContext } from "@/context/darkModeContext";
import { useContext } from "react";

const ToggleSwitch: React.FC = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);

  return (
    <div className="toggle-switch" onClick={toggle}>
      <div
        className="toggle-switch__ball"
        style={darkMode ? { right: "1px" } : { left: "1px" }}
      />
    </div>
  );
};

export default ToggleSwitch;
