import React from 'react';
import './Styles.css'

const Backdrop = (props: any) => (
  props.show ?
    <aside className="backdrop"  ></aside> : null
  // onClick={props.clicked}
)

export default Backdrop
