import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import UserPage from "./Pages/UserPage";
import MainPage from "./Components/mainpage";
function App() {

  return (
    <div>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="users/" element={<UserPage/>}/>
        <Route path="projects/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
