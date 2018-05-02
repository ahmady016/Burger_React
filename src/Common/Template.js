import React from 'react'

export default (props) => {
  return (props.className)
    ? (
        <div className={props.className}>
          {props.children}
        </div>
      )
    : props.children;
}