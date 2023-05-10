import './App.css';
import  { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('');

  const handlerClick = () => {
    setCount(count + 1);
    setColor('App-btn')
  }

  return (
    <div className="App">
      <p>You cliced {count} times</p>
      <button className={color} onClick={handlerClick}>
        Click me!
      </button>  
    </div>
  );
}

export default App;
