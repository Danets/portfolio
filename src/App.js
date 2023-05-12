import  { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Login from './pages/signin/Login';

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
    </div>
  );
}

export default App;
