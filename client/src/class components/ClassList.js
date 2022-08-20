import React from 'react'
import Class from './Class'

export default function ClassList(props) {
  return (
    <div className='ClassList' style={{width: '500px', float: 'right'}}>
      <h1 style={{textAlign: 'center'}}> Classes </h1>
      {props.classes.map(c => <Class key={c.id} name={c.name} />)}
      <button>Add Class </button>
      <button>Remove Class </button>
    </div>
  )
}
