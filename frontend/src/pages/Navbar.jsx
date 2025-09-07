import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Decode JWT to get role
  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role);
    }
  }, [token]);

  // Search courses
  useEffect(() => {
    if (!searchQuery) return setSearchResults([]);
    const delayDebounce = setTimeout(() => {
      fetch(`http://localhost:5000/api/courses?search=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data))
        .catch(console.error);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between relative">
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">EduPlatform</Link>
      </div>

      <div className="flex-1 mx-4 hidden sm:block relative">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div className="absolute top-10 w-full bg-white border rounded shadow z-10 max-h-60 overflow-y-auto">
            {searchResults.map((course) => (
              <div
                key={course._id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate(`/course/${course._id}`);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
              >
                {course.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Links */}
      <div className="hidden sm:flex gap-4">
        {userRole ? (
          <>
            <Link
              to={userRole === "student" ? "/student" : "/teacher"}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Login
            </Link>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Get Started
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {showMenu && !userRole && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded p-4 w-64 sm:hidden">
          <Link
            to="/login"
            className="block mb-2 px-4 py-2 bg-green-500 text-white rounded text-center"
          >
            Login
          </Link>
          <Link
            to="/signup/student"
            className="block mb-2 px-4 py-2 bg-blue-500 text-white rounded text-center"
          >
            Student Sign Up
          </Link>
          <Link
            to="/signup/tutor"
            className="block px-4 py-2 bg-purple-500 text-white rounded text-center"
          >
            Tutor Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
