import React from 'react'
import "./Class.css";

export default function Class(props) {
  return (
    <div className='class'>
      <span>{props.name}</span>
    </div>
  )
}
