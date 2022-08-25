import React from 'react';
import "./Student.css";
import { NavLink } from "react-router-dom";

export default function Student(props) {
  const name = props.name
  return (
    <div className="student" style={{width: "50%", margin: "0 auto"}}>
      <button className='studentPageButton'>
        <NavLink to={{pathname: '/StudentPage'}} state={{studentName: {name}}}>
          <span>{props.name}</span>
        </NavLink>
      </button>
    </div>
  )
}
