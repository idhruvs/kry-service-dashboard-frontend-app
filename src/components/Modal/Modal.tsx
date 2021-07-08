import React, { useEffect } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import Backdrop from './Backdrop'

import './styles.css';

const Modal = (props: any) => {

  // Triggering modal close event on "Escape" keypress
  useEffect(() => {
    const close = (event: any): void => {
      if (event.keyCode === 27) {
        props.modalClosed(event)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <section >
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <main
        aria-modal="true"
        className="modal"
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? 1 : 0
        }}
      >
        <i aria-label="Close"
          onClick={props.modalClosed}
          className="btn-close">
          <CloseCircleOutlined />
        </i>
        {props.children}
      </main>
    </section>
  );
};


export default Modal;
