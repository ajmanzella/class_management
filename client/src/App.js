import React from 'react';
import StudentList from './student components/StudentList';
import ClassList from './class components/ClassList';
import StudentPage from './student components/StudentPage'
import ClassPage from './class components/ClassPage'
import { Routes, Route, HashRouter } from "react-router-dom";

function App() {
  
  const [studentData, setStudentData] = React.useState(null);
  const [classData, setClassData] = React.useState(null);

  React.useEffect(() => {
      const fetchData = async () => {
        //console.log("here")
        const response = await fetch(`/home`);
        const newData = await response.json();
        //console.log(newData)
        setStudentData(newData.studentList);
        setClassData(newData.classList);
      };
      fetchData();
  });

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
          <Route exact path="/" element={[<StudentList students={studentData}/>, <ClassList classes={classData}/>]}/>
          <Route exact path="/StudentPage" element={<StudentPage classes={classes}/>}/>
          <Route exact path="/ClassPage" element={<ClassPage students={students}/>}/>
        </Routes>
      </div>
      <div style={{clear: 'both'}}></div>
    </div>
    </HashRouter>
  );
}

export default App;
