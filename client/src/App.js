import React from 'react';
import StudentList from './student components/StudentList';
import ClassList from './class components/ClassList';
import StudentPage from './student components/StudentPage'
import ClassPage from './class components/ClassPage'
import { Routes, Route, NavLink, HashRouter, useLocation } from "react-router-dom";

function App() {
  
  const [data, setData] = React.useState(null);
  const [clickedStudent, setStudent] = React.useState("")

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
    <HashRouter>
    <div className='App'>
      <h1 style={{textAlign: 'center'}}> Class Manager </h1>
      <hr></hr>
      <div className='content'>
        <Routes>
          <Route exact path="/" element={[<StudentList students={students}/>, <ClassList classes={classes}/>]}/>
          <Route exact path="/StudentPage" element={<StudentPage />}/>
          <Route exact path="/ClassPage" element={<ClassPage/>}/>
        </Routes>
      </div>
      <div style={{clear: 'both'}}></div>
      <p>{!data ? "Loading..." : data}</p>
    </div>
    </HashRouter>
  );
}

export default App;
