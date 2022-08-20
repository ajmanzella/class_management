import React from 'react'
import Class from '../class components/Class';
import {useLocation} from 'react-router-dom'

export default function StudentPage(props) {
  let location = useLocation();

  return (
    <div className='StudentPage' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1 style={{textAlign: 'center'}}> {location.state.studentName.name} </h1>
        <div className='content' style={{width: '500px', justifyContent: 'center', alignItems: 'center'}}>
          {props.classes.map(c => <Class key={c.id} name={c.name} />)}
          <button>Add Class </button>
          <button>Remove Class </button>
        </div>
    </div>
  )
}
