import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import UserPage from "./Pages/UserPage";
import { Toaster } from "react-hot-toast";
import MainPage from "./Components/mainpage";
function App() {

  return (
    <div>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="users/" element={<UserPage/>}/>
        <Route path="projects/" element={<MainPage />} />
      </Routes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
