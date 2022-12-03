import Error404 from "./pages/Error404";
import Course from "./pages/Course";
import CreateCourse from "./pages/CreateCourse";
import EarnedCertificates from "./pages/EarnedCertificates";
import OwnedCourses from "./pages/OwnedCourses";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Dashboard />} />
          <Route path="certificates" element={<EarnedCertificates />} />
          <Route path="course/:id" element={<Course />} />
          <Route path="create" element={<CreateCourse />} />
          <Route path="mycourses" element={<OwnedCourses />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
