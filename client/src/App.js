import React from 'react';
import Students from './Students';
import Classes from './Classes';

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className='App'>
      <h1> Class Manager </h1>
      <hr></hr>
      <Students />
      <Classes />
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
