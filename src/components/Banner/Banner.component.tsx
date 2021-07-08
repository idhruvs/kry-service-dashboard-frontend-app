import React from 'react'
import './styles.css'

function Banner({ ...props }) {

  return (
    <section className="banner">
      <i > {props.icon}</i>
      <p className="multiline">{props.message}</p>
      {props.children}
    </section>

  )
}

export default Banner
