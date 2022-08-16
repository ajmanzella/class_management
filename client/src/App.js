import React from 'react';
import Students from './Students';
import Classes from './Classes';

function App() {
  return (
    <div className='App'>
      <h1> Class Manager </h1>
      <hr></hr>
      <Students />
      <Classes />
    </div>
  );
}

export default App;
