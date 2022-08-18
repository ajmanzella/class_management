import React from 'react'
import "./Class.css";
import { Routes, Route, NavLink, HashRouter } from "react-router-dom";

export default function Class(props) {
  const name = props.name
  return (
    <div className="class">
      <button className='classPageButton'>
        <NavLink to={{pathname: '/ClassPage'}} state={{className: {name}}}>
          <span>{props.name}</span>
        </NavLink>
      </button>
    </div>
  )
}
