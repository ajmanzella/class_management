import React from 'react'
import Student from './Student'

export default function StudentList(props) {
  return (
    <div className='StudentList' style={{width: '500px', float: 'left'}}>
      <h1 style={{textAlign: 'center'}}> Students </h1>
      {props.students.map(c => <Student key={c.id} name={c.name} />)}
      <button>Add Student </button>
      <button>Remove Student </button>
    </div>
  )
}
