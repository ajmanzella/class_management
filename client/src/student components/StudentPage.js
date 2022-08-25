import React from 'react'
import Class from '../class components/Class';
import { useLocation, NavLink } from 'react-router-dom'

export default function StudentPage(props) {
  let location = useLocation();
  const [values, setValues] = React.useState({ addName: '', deleteName: '' });
  const [studentClasses, setStudentClasses] = React.useState([])

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  };

  const addClass = async () => {
    const response = await fetch('/studentEnrollment/enrollClass', {
      method: 'PUT',
      headers: { 'Content-Type': "application/json; charset=utf-8" },
      body: JSON.stringify({ "className": values.addName, "studentName": location.state.studentName.name })
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
  }
  const onSubmitAddClass = async (event) => {
    event.preventDefault();
    try {
      await addClass();
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      console.log(`Class Enrollment failed! ${e.message}`);
    }
  }
  const deleteClass = async () => {
    const response = await fetch('/studentEnrollment/dropClass', {
      method: 'PUT',
      headers: { 'Content-Type': "application/json; charset=utf-8" },
      body: JSON.stringify({ "className": values.deleteName, "studentName": location.state.studentName.name })
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
  }
  const onSubmitDeleteClass = async (event) => {
    event.preventDefault();
    try {
      await deleteClass();
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      console.log(`Class Drop failed! ${e.message}`);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      //console.log("here")
      const response = await fetch(`/studentEnrollment`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json; charset=utf-8" },
        body: JSON.stringify({ name: location.state.studentName.name })
      });
      const newData = await response.json();
      console.log(newData)
      if (newData.studentInfo.enrolled != null) {
        setStudentClasses(newData.studentInfo.enrolled);
      }
    };
    fetchData();
  }, [location]);

  return (
    <div className='StudentPage' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='content' style={{ width: '500px', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center' }}> {location.state.studentName.name} </h1>
        {studentClasses.map(c => <Class key={c.id} name={c.name} />)}
        <div className='createDelete' style={{ width: "50%", margin: "0 auto" }}>
          <form onSubmit={onSubmitAddClass} style={{ width: "90%", margin: '0 auto' }}>
            <label>Name:</label>
            <input value={values.addName} onChange={set('addName')} />
            <button type="submit" onClick={() => window.location.reload(false)}>Add Class </button>
          </form>
          <form onSubmit={onSubmitDeleteClass} style={{ width: "90%", margin: '0 auto' }}>
            <label>Name:</label>
            <input value={values.deleteName} onChange={set('deleteName')} />
            <button type='submit' onClick={() => window.location.reload(false)}>Remove Class </button>
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
