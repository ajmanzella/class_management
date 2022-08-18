import React from 'react'
import {useLocation} from 'react-router-dom'

export default function ClassPage(props) {
  let location = useLocation();

  return (
    <div className='ClassPage'>
        <h1 style={{textAlign: 'center'}}> {location.state.className.name} </h1>
    </div>
  )
}
