import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import UserPage from "./Pages/UserPage";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainPage from "./Components/mainpage";
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-w-max">
        <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="users/" element={<UserPage />} />
          <Route path="projects/" element={<MainPage />} />
        </Routes>
        <Toaster></Toaster>
      </div>
    </DndProvider>
  );
}

export default App;
