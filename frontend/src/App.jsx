  import { Routes, Route, Outlet, Link } from "react-router-dom";
  import Signup from "./pages/Signup.jsx";
  import Login from "./pages/Login.jsx";
  import StudentDashboard from "./pages/StudentDashboard.jsx";
  import TutorDashboard from "./pages/TutorDashboard.jsx";
  import CoursePage from "./pages/CoursePage.jsx";
  import Navbar from "./pages/Navbar.jsx";
  import LandingPage from "./pages/LandingPage.jsx";
  import Gamification from "./pages/game.jsx";
  // import { BottomNavigation } from "./pages/BottomNavigation.jsx";
  // import { CourseCard } from "./pages/CourseCard.jsx";
  // import { FeaturedSection } from "./pages/FeaturedSection.jsx";
  // import { Footer } from "./pages/Footer.jsx";
  // import { CommunityChat } from "./pages/CommunityChat.jsx";
  // import { Header } from "./pages/Header.jsx";
  // import { RoleSelectionDialog } from "./pages/RoleSelectionDialog.jsx";
  // import { Profile } from "./pages/Profile.jsx";
  import WhatIsMyTeachers from "./pages/WhatIsMyTeachers.jsx";
  import CommunityChat from "./pages/CommunityChat.jsx"; // <-- new import
// import game from "./pages/game.js"

  // Layout with Navbar
  function Layout() {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 p-6">
          <Outlet /> {/* renders child routes */}
        </main>
      </div>
    );
  }

  export default function App() {
    return (
      <Routes>
        {/* Landing page without Navbar */}
        <Route path="/" element={<><LandingPage />
        <WhatIsMyTeachers />
        </>
      } />

        {/* All other pages with Navbar */}
        <Route element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
  <Route path="/teacher" element={<TutorDashboard />} /> 

          <Route path="/course/:id" element={<><CoursePage />
          <Gamification />
          </>} />
                  <Route path="/community" element={<CommunityChat />} /> {/* <-- new route */}
        </Route>
      </Routes>
    );
  }
