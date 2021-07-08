import React from 'react'
import { CodeSandboxCircleFilled, DeleteOutlined } from "@ant-design/icons"
import './styles.css'
import { CardStatus } from './types';
import { ServiceStatus } from '@/modules/Services/types';

function Card({ ...props }) {

  const { title, url, addTime, status, deleteAction, isDeleted } = props;

  const getServiceStatus = (status: ServiceStatus): CardStatus => {
    switch (status) {
      case "OK":
        return { value: "AVAILABLE", type: "success" }
      case "FAIL":
        return { value: "FAILED", type: "error" }
      case "UNKNOWN":
        return { value: "UNKNOWN", type: "unknown" }
    }
  }


  const serviceStatus = getServiceStatus(status)

  return (

    <article className={`card-wrapper ${isDeleted ? 'removed-item' : ''}`}>
      <header className="card-header">
        <i
          aria-label="icon"
          className="icon"><CodeSandboxCircleFilled /></i>
        <section
          aria-roledescription={`Status of ${title} service`}
          aria-label={serviceStatus.value}
          className={`pill ${serviceStatus.type}-pill`}>
          {serviceStatus.value}
        </section>
      </header>
      <h4 aria-label="Title" className="title">{title}</h4>
      <p aria-label="Service URL" className="text"> <span className="text-label"> URL:</span> {url}</p>
      <p className="text-label" aria-label="Service Creation Time">Created At: </p>
      <p>{addTime}</p>
      <i onClick={deleteAction} className="font-medium icon danger"><DeleteOutlined /></i>
    </article>

  )
}

export default Card
