import React from 'react'
import Student from './Student'

export default function StudentList(props) {
  const [addValue, setAddValue] = React.useState("");
  const [deleteValue, setDeleteValue] = React.useState("");

  const addStudent = async () => {
    const response = await fetch('/home/newStudent', {
      method: 'POST',
      body: JSON.stringify(addValue)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }
  const onSubmitAddStudent = async (event) => {
    event.preventDefault(); 
    try {
      setAddValue()
      await addStudent();
      alert('Student Added!');
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  }
  const deleteStudent = async () => {
    const response = await fetch('/home/removeStudent', {
      method: 'DELETE',
      body: JSON.stringify(deleteValue)
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
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  }

  return (
    <div className='StudentList' style={{width: '500px', float: 'left'}}>
      <h1 style={{textAlign: 'center'}}> Students </h1>
      {props.students.map(c => <Student key={c.id} name={c.name} />)}
      <div className='createDelete'>
        <form onSubmit={onSubmitAddStudent}>
          <label>Name*:</label>
          <input />
          <button type="submit">Add Student </button>
        </form>
        <form onSubmit={onSubmitDeleteStudent}>
          <label>Name*:</label>
          <input value={deleteValue} onChange={setDeleteValue}/>
          <button type='submit'>Remove Student </button>
        </form>
      </div>
    </div>
  )
}
