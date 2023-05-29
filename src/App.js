import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Layout/Header";
import Login from "./pages/signin/Login";
import PostPage from "./pages/posts/PostPage";
import TaskPage from "./pages/tasks/TaskPage";
import Food from "./components/Food/Food";
import { PostDetail } from "./components/post/PostDetail";
import { AuthContext } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user: "Garry", isLoggedIn: true }}>
        <div className="App">
          <Header />
          <main>
            <Outlet />
          </main>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/food" element={<Food />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/posts" element={<PostPage />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
