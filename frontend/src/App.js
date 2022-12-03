import Error404 from "./pages/Error404";
import Course from "./pages/Course";
import CreateCourse from "./pages/CreateCourse";
import EarnedCertificates from "./pages/EarnedCertificates";
import OwnedCourses from "./pages/OwnedCourses";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import { Fragment } from "react";
function App() {
  return (
    <Fragment>
      <NavBar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateCourse />} />
          <Route path="/certificates" element={<EarnedCertificates />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/mycourses" element={<OwnedCourses />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
