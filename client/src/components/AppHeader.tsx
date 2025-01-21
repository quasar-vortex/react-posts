import { NavLink } from "react-router-dom";
import { FiPenTool } from "react-icons/fi";
const links = [
  { label: "New Post", href: "/new", display: "btn", icon: FiPenTool },
];
const AppHeader = () => {
  return (
    <header className="bg-violet-600 border-b-2 border-violet-300">
      <nav className="flex mx-auto max-w-7xl px-4 h-14 items-center justify-between">
        <div>
          <NavLink
            to="/"
            className="text-violet-100 hover:text-violet-300 duration-200"
          >
            <h1 className="text-4xl font-bold">ReactPosts</h1>
          </NavLink>
        </div>
        <ul>
          {links.map((l) => {
            const btnClass =
              "w-min rounded-md border border-violet-300 whitespace-nowrap flex items-center gap-1 bg-violet-500 text-violet-100 hover:bg-violet-600 duration-200 px-4 py-2";
            const linkClass = "";
            const Icon = l.icon;
            return (
              <li key={l.label}>
                <NavLink
                  className={l.display === "btn" ? btnClass : linkClass}
                  to={l.href}
                >
                  <span>{l.label}</span>
                  {<Icon />}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
