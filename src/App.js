import { useState } from "react";
import CartContextProvider from "./context/CartContextProvider";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Layout/Header";
import Login from "./pages/signin/Login";
import Signup from "./pages/signup/Signup";
import PostPage from "./pages/posts/PostPage";
import TaskPage from "./pages/tasks/TaskPage";
import Food from "./components/Food/Food";
import Cart from "./components/Cart/Cart";
import { PostDetail } from "./components/post/PostDetail";

function App() {
  const [isModalOpen, setModalState] = useState(false);

  const openModalHandle = () => {
    setModalState(true);
  };

  const closeModalHandle = () => {
    setModalState(false);
  };

  return (
    <BrowserRouter>
      <CartContextProvider>
        <div className="App">
          {isModalOpen && <Cart onCloseModal={closeModalHandle} />}
          <Header onOpenModal={openModalHandle} />
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
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </div>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
