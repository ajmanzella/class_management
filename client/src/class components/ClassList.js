import React from 'react'
import Class from './Class'

export default function ClassList(props) {
  return (
    <div className='ClassList'>Classes
      {props.classes.map(c => <Class key={c.id} name={c.name} />)}
    </div>
  )
}
