import  { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';

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
      <p>You clicked {count} times</p>
      <button className={color} onClick={handlerClick}>
        Click me!
      </button>  
    </div>
  );
}

export default App;
