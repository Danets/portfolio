import  { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Login from './pages/signin/Login';
import Posts from './pages/post/Posts';

function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('');

  const handlerClick = () => {
    setCount(count + 1);
    setColor('App-btn')
  }

  return (
    <div className="App">
      <Navigation />
      <Login />
      <Posts />
    </div>
  );
}

export default App;
