import React from 'react'
import Class from './Class'

export default function ClassList(props) {
  const [values, setValues] = React.useState({ addName: '', deleteName: '' });

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };

  const addClass = async () => {
    const response = await fetch('/home/newClass', {
      method: 'POST',
      headers: {'Content-Type': "application/json; charset=utf-8"},
      body: JSON.stringify({"name": values.addName})
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }
  const onSubmitAddClass = async (event) => {
    event.preventDefault(); 
    try {
      await addClass();
      alert('Class Added!');
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      alert(`Class Creation failed! ${e.message}`);
    }
  }
  const deleteClass = async () => {
    const response = await fetch('/home/removeClass', {
      method: 'DELETE',
      headers: {'Content-Type': "application/json; charset=utf-8"},
      body: JSON.stringify({"name": values.deleteName})
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }
  const onSubmitDeleteClass = async (event) => {
    event.preventDefault(); 
    try {
      await deleteClass();
      alert('Class Removed!');
      setValues({
        addName: '', deleteName: ''
      });
    } catch (e) {
      alert(`Class Removal failed! ${e.message}`);
    }
  }

  return (
    <div className='ClassList' style={{width: '500px', float: 'right'}}>
      <h1 style={{textAlign: 'center'}}> Classes </h1>
      {props.classes.map(c => <Class key={c.id} name={c.name} />)}
      <div className='createDelete'>
        <form onSubmit={onSubmitAddClass}>
          <label>Name:</label>
          <input value={values.addName} onChange={set('addName')}/>
          <button type="submit" >Add Class </button>
        </form>
        <form onSubmit={onSubmitDeleteClass}>
          <label>Name:</label>
          <input value={values.deleteName} onChange={set('deleteName')}/>
          <button type='submit' >Remove Class </button>
        </form>
      </div>
    </div>
  )
}
