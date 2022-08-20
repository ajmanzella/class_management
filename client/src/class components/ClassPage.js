import React from 'react'
import Student from '../student components/Student';
import {useLocation} from 'react-router-dom'

export default function ClassPage(props) {
  let location = useLocation();

  return (
    <div className='ClassPage' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1 style={{textAlign: 'center'}}> {location.state.className.name} </h1>
        <div className='content' style={{width: '500px', justifyContent: 'center', alignItems: 'center'}}>
          {props.students.map(c => <Student key={c.id} name={c.name} />)}
          <button>Add Student </button>
          <button>Remove Student </button>
        </div>
    </div>
  )
}
