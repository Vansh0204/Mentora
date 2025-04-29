import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const user = JSON.parse(localStorage.getItem("mentoraUser")) || { name: "Guest User" };

  useEffect(() => {
    // Update page title based on current route
    const path = location.pathname.substring(1);
    if (path === "") return setPageTitle("Dashboard");
    
    // Handle special cases
    if (path === "skillswap" || path === "demo-skillswap") {
      return setPageTitle("Skill Swap");
    }

    // Convert kebab-case to Title Case
    const title = path
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    setPageTitle(title);
  }, [location]);

  return (
    <div className="flex-1 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 ml-4">
        {pageTitle}
      </h1>
      <div className="flex items-center gap-4 mr-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {user.name}
        </div>
        <div className="w-8 h-8 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center text-white font-medium">
          {user.name.charAt(0)}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
