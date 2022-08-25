import React from 'react';
import StudentList from './student components/StudentList';
import ClassList from './class components/ClassList';
import StudentPage from './student components/StudentPage'
import ClassPage from './class components/ClassPage'
import "./App.css"
import { Routes, Route, HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  
  const [studentData, setStudentData] = React.useState([]);
  const [classData, setClassData] = React.useState([]);

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
  }, []);

  return (
    <HashRouter>
    <div className='App'>
      <h1 style={{textAlign: 'center'}}> Class Manager </h1>
      <hr></hr>
      <div className='content'>
        <Routes>
          <Route exact path="/" element={[<StudentList students={studentData}/>, <ClassList classes={classData}/>]}/>
          <Route exact path="/StudentPage" element={<StudentPage />}/>
          <Route exact path="/ClassPage" element={<ClassPage />}/>
        </Routes>
      </div>
      <div style={{clear: 'both'}}></div>
    </div>
    </HashRouter>
  );
}

export default App;
