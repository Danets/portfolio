import './App.css';
import Navigation from './components/navigation/Navigation';
import Login from './pages/signin/Login';
import Posts from './pages/posts/Posts';
import TaskPage from './pages/tasks/TaskPage';

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <Login />
      <Posts /> */}
      <TaskPage />
    </div>
  );
}

export default App;
