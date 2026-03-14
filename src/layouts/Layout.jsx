import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../contexts/auth/useAuth";

const Layout = () => {
  const { getUser, logoutUser } = useAuth();

  const navigate = useNavigate();
  const user = getUser();

  const [openDropdown, setOpenDropdown] = useState(null);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", type: "single" },
    {
      label: "Categories",
      type: "dropdown",
      items: [
        { to: "/categories/list", label: "All Categories" },
        { to: "/categories/add", label: "Add Category" },
      ],
    },
    {
      label: "Inventory",
      type: "dropdown",
      items: [
        { to: "/items/list", label: "All Products" },
        { to: "/items/add", label: "Add Product" },
      ],
    },
    {
      label: "Artisans",
      type: "dropdown",
      items: [
        { to: "/artisans/list", label: "All Artisans" },
        { to: "/artisans/add", label: "Add Artisan" },
      ],
    },
    { to: "/interested", label: "Interests", type: "single" },
    { to: "/settings", label: "Settings", type: "single" },
  ];

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleLogout = () => {
    logoutUser();
    console.log("Navigating to the login page.");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">My App</h1>
          {user && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500">{user.phone}</p>
            </div>
          )}
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.type === "single" ? (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition font-medium ${
                        isActive
                          ? "bg-black text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdown === link.label && (
                      <ul className="mt-2 ml-4 space-y-1">
                        {link.items.map((item) => (
                          <li key={item.to}>
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg transition text-sm ${
                                  isActive
                                    ? "bg-gray-200 text-black font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                              }
                            >
                              {item.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t bg-white">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Header Bar */}
        <header className="bg-white shadow-sm border-b px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
