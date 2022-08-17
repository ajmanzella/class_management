import React from 'react';
import StudentList from './student components/StudentList';
import ClassList from './class components/ClassList';

function App() {
  
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const students = [
    { id: 1, name: "Leanne Graham" },
    { id: 2, name: "Ervin Howell" },
    { id: 3, name: "Clementine Bauch" },
    { id: 4, name: "Patricia Lebsack" }
  ];

  const classes = [
    { id: 1, name: "Science" },
    { id: 2, name: "Math" },
    { id: 3, name: "English" },
    { id: 4, name: "History" }
  ];

  return (
    <div className='App'>
      <h1 style={{textAlign: 'center'}}> Class Manager </h1>
      <hr></hr>
      <div className='StudentList' style={{width: '500px', float: 'left'}}>
        <StudentList students={students}/>
        <button>Add Student </button>
        <button>Remove Student </button>
      </div>
      <div className='ClassList' style={{width: '500px', float: 'right'}}>
        <ClassList classes={classes}/>
        <button>Add Class </button>
        <button>Remove Class </button>
      </div>
      <div style={{clear: 'both'}}></div>
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
