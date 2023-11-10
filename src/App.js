import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
// import MainPage from "./Components/mainpage";
function App() {

  return (
    <div>
      <Routes>
        <Route path="" element={<LoginPage />} />
        {/* <Route path="projects/" element={<MainPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
