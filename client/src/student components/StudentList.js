import React from 'react'
import Student from './Student'

export default function StudentList(props) {
  return (
    <div className='StudentList'>Students
      {props.students.map(c => <Student key={c.id} name={c.name} />)}
    </div>
  )
}
