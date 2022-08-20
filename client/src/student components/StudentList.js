import React from 'react'
import Student from './Student'

export default function StudentList(props) {
  const [values, setValues] = React.useState({ addName: '', deleteName: '' });

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };


  const addStudent = async () => {
    const response = await fetch('/home/newStudent', {
      method: 'POST',
      headers: {'Content-Type': "application/json; charset=utf-8"},
      body: JSON.stringify({"name": values.addName})
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }
  const onSubmitAddStudent = async (event) => {
    event.preventDefault(); 
    try {
      await addStudent();
      alert('Student Added!');
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  }
  const deleteStudent = async () => {
    const response = await fetch('/home/removeStudent', {
      method: 'DELETE',
      headers: {'Content-Type': "application/json; charset=utf-8"},
      body: JSON.stringify({"name": values.deleteName})
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }
  const onSubmitDeleteStudent = async (event) => {
    event.preventDefault(); 
    try {
      await deleteStudent();
      alert('Student Removed!');
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      alert(`Removal failed! ${e.message}`);
    }
  }

  return (
    <div className='StudentList' style={{width: '500px', float: 'left'}}>
      <h1 style={{textAlign: 'center'}}> Students </h1>
      {props.students.map(c => <Student key={c.id} name={c.name} />)}
      <div className='createDelete'>
        <form onSubmit={onSubmitAddStudent}>
          <label>Name:</label>
          <input value={values.addName} onChange={set('addName')}/>
          <button type="submit" >Add Student </button>
        </form>
        <form onSubmit={onSubmitDeleteStudent}>
          <label>Name:</label>
          <input value={values.deleteName} onChange={set('deleteName')}/>
          <button type='submit' >Remove Student </button>
        </form>
      </div>
    </div>
  )
}
