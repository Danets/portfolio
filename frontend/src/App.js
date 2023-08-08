import { useState, createContext, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./pages/signin/Login";
import Signup from "./pages/signup/Signup";
import PostPage from "./pages/posts/PostPage";
import TaskPage from "./pages/tasks/TaskPage";
import Food from "./components/Food/Food";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { PostDetail } from "./components/Post/PostDetail";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [isModalOpen, setModalState] = useState(false);
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const openModalHandle = () => {
    setModalState(true);
  };

  const closeModalHandle = () => {
    setModalState(false);
  };

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <div className="inner-container">
              {isModalOpen && <Cart onCloseModal={closeModalHandle} />}
              <Header onOpenModal={openModalHandle} />
              <main>
                <ToastContainer />
                <Outlet />
                <Routes>
                  <Route path="/" element={<h1>Home</h1>} />
                  <Route path="/food" element={<Food />} />
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="/posts" element={<PostPage />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route path="/signin" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="" element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                  <Route path="*" element={<h1>Not found</h1>} />
                </Routes>
              </main>
            </div>
          </div>
          <Footer />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
