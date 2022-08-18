import React from 'react';
import "./Student.css";
import App from '../App';
import { Routes, Route, NavLink, HashRouter } from "react-router-dom";

export default function Student(props) {
  const name = props.name
  return (
    <div className="student">
      <button className='studentPageButton'>
        <NavLink to={{pathname: '/StudentPage'}} state={{studentName: {name}}}>
          <span>{props.name}</span>
        </NavLink>
      </button>
    </div>
  )
}
