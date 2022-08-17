import React from 'react';
import "./Student.css";

export default function Student(props) {
  return (
    <div className="student">
      <span>{props.name}</span>
    </div>
  )
}
