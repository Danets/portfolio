import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Login from "./pages/signin/Login";
import Posts from "./pages/posts/Posts";
import TaskPage from "./pages/tasks/TaskPage";
import {PostDetail} from "./components/post/PostDetail"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Outlet />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
