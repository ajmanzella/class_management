import React from 'react'
import Student from '../student components/Student';
import { useLocation } from 'react-router-dom'

export default function ClassPage(props) {
  let location = useLocation();
  const [values, setValues] = React.useState({ addName: '', deleteName: '' });
  const [classStudents, setClassStudents] = React.useState([])

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };


  const addStudent = async () => {
    const response = await fetch('/classEnrollment/enrollStudent', {
      method: 'PUT',
      headers: {'Content-Type': "application/json; charset=utf-8"},
      body: JSON.stringify({"studentName": values.addName, "className": location.state.className.name})
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }
  const onSubmitAddStudent = async (event) => {
    event.preventDefault(); 
    try {
      await addStudent();
      alert('Student Enrolled!');
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      alert(`Enrollment failed! ${e.message}`);
    }
  }
  const deleteStudent = async () => {
    const response = await fetch('/classEnrollment/dropStudent', {
      method: 'PUT',
      headers: {'Content-Type': "application/json; charset=utf-8"},
      body: JSON.stringify({"studentName": values.deleteName, "className": location.state.className.name})
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }
  const onSubmitDeleteStudent = async (event) => {
    event.preventDefault(); 
    try {
      await deleteStudent();
      alert('Student Dropped!');
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      alert(`Drop failed! ${e.message}`);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      //console.log("here")
      const response = await fetch(`/classEnrollment`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json; charset=utf-8" },
        body: JSON.stringify({name: location.state.className.name})
      });
      const newData = await response.json();
      console.log(newData)
      if (newData.classInfo.classlist != null){
        setClassStudents(newData.classInfo.classlist);
      }
    };
    fetchData();
  }, [location]);

  return (
    <div className='ClassPage' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center' }}> {location.state.className.name} </h1>
      <div className='content' style={{ width: '500px', justifyContent: 'center', alignItems: 'center' }}>
        {classStudents.map(c => <Student key={c.id} name={c.name} />)}
        <div className='createDelete'>
          <form onSubmit={onSubmitAddStudent}>
            <label>Name:</label>
            <input value={values.addName} onChange={set('addName')} />
            <button type="submit" >Add Student </button>
          </form>
          <form onSubmit={onSubmitDeleteStudent}>
            <label>Name:</label>
            <input value={values.deleteName} onChange={set('deleteName')} />
            <button type='submit' >Remove Student </button>
          </form>
        </div>
      </div>
    </div>
  )
}
