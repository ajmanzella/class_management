import React from 'react'
import {useLocation} from 'react-router-dom'

export default function StudentPage(props) {
  let location = useLocation();

  return (
    <div className='StudentPage'>
        <h1 style={{textAlign: 'center'}}> {location.state.studentName.name} </h1>
    </div>
  )
}
