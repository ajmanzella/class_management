import React from 'react'
import Student from '../student components/Student';
import { useLocation, NavLink } from 'react-router-dom'

export default function ClassPage(props) {
  let location = useLocation();
  const [values, setValues] = React.useState({ addName: '', deleteName: '' });
  const [classStudents, setClassStudents] = React.useState([])

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  };


  const addStudent = async () => {
    const response = await fetch('/classEnrollment/enrollStudent', {
      method: 'PUT',
      headers: { 'Content-Type': "application/json; charset=utf-8" },
      body: JSON.stringify({ "studentName": values.addName, "className": location.state.className.name })
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
  }
  const onSubmitAddStudent = async (event) => {
    event.preventDefault();
    try {
      await addStudent();
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      console.log(`Enrollment failed! ${e.message}`);
    }
  }
  const deleteStudent = async () => {
    const response = await fetch('/classEnrollment/dropStudent', {
      method: 'PUT',
      headers: { 'Content-Type': "application/json; charset=utf-8" },
      body: JSON.stringify({ "studentName": values.deleteName, "className": location.state.className.name })
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
  }
  const onSubmitDeleteStudent = async (event) => {
    event.preventDefault();
    try {
      await deleteStudent();
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      console.log(`Drop failed! ${e.message}`);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      //console.log("here")
      const response = await fetch(`/classEnrollment`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json; charset=utf-8" },
        body: JSON.stringify({ name: location.state.className.name })
      });
      const newData = await response.json();
      console.log(newData)
      if (newData.classInfo.classlist != null) {
        setClassStudents(newData.classInfo.classlist);
      }
    };
    fetchData();
  }, [location]);

  return (
    <div className='ClassPage' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='content' style={{ width: '500px', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center' }}> {location.state.className.name} </h1>
        {classStudents.map(c => <Student key={c.id} name={c.name} />)}
        <div className='createDelete' style={{ width: "50%", margin: "0 auto" }}>
          <form onSubmit={onSubmitAddStudent} style={{ width: "90%", margin: '0 auto' }}>
            <label>Name:</label>
            <input value={values.addName} onChange={set('addName')} />
            <button type="submit" onClick={() => window.location.reload(false)}>Add Student </button>
          </form>
          <form onSubmit={onSubmitDeleteStudent} style={{ width: "90%", margin: '0 auto' }}>
            <label>Name:</label>
            <input value={values.deleteName} onChange={set('deleteName')} />
            <button type='submit' onClick={() => window.location.reload(false)}>Remove Student </button>
          </form>
          <br></br>
          <button className='homePageButton' style={{ width: "90%", margin: '0 auto' }}>
            <NavLink to={{ pathname: '/' }}>
              <span>Home</span>
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  )
}
