import React, { useState } from 'react';
import { useEffect } from 'react';
import { FileSearchOutlined, FileUnknownOutlined } from '@ant-design/icons';

import Banner from "@//components/Banner/Banner.component";
import Card from "@//components/Card/Card.component";
import Modal from "@//components/Modal/Modal";

import { fetchServices, createService, deleteService } from './service';
import { ServiceCreationStatus, Service } from './types';

import './styles.css'


function ServiceModule() {

  const [services, setServices] = useState<Service[]>([])
  const [isServicesLoaded, setIsServicesLoaded] = useState(false)
  const [modalToggle, setModalToggle] = useState(false)

  const [serviceCreationState, setServiceCreationState] = useState<ServiceCreationStatus>('INITIALIZED')

  // Fetch service data through API
  const fetchServiceData = async (): Promise<Service[] | void> => {
    const servicesList: Service[] = await fetchServices();
    setServices(servicesList)
    setIsServicesLoaded(true)
  }

  // * Modal Utils
  const closeModal = (event: any): void => {
    event.preventDefault();
    setModalToggle(false);
    setServiceCreationState("INITIALIZED")
  }

  const openModal = (event: any): void => {
    event.preventDefault();
    setModalToggle(true)
  }
  //

  // Delete Service Handler
  const handleDelete = async (event: any, index: number) => {
    event.preventDefault()
    try {
      const res = await deleteService(services[index].name);
    }
    catch (e) {
      console.error(e);
      console.log("Error in deleting service")
      alert('Error in deleting service')
    }
    fetchServiceData()
  }

  // Create Service handler
  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault()

    const data = new FormData(event.target);
    const service = { serviceName: data.get('name'), serviceUrl: data.get('url') };
    try {
      await createService(service);
      setServiceCreationState('SUCCESS')
    } catch (e) {
      setServiceCreationState('ERROR')
    }
    fetchServiceData()
  }

  // Function to determine the content rendered inside the "Create Service" Modal
  const renderServiceCreationContent = (status: ServiceCreationStatus) => {
    switch (status) {
      case 'INITIALIZED':
        return <section className="form-wrapper">
          <h3>Create Service</h3>
          <form onSubmit={handleSubmit}>

            <label htmlFor="name">Enter username</label>
            <input
              aria-placeholder="Service Name"
              aria-label="Service Name"
              placeholder="Service Name"
              type="text"
              name="name"
              required />

            <label htmlFor="url">Enter username</label>
            <input
              aria-placeholder="Service URL"
              aria-label="Service URL"
              placeholder="Service URL"
              type="url"
              name="url"
              required />

            <div className="btn-group">
              <input role="button" type="submit" className="btn" value="Submit" />
              <button className="btn" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </section>
      case 'SUCCESS':
        return <section className="response-message success">
          🎉 Service Created Successfully 🎉
        </section>

      case 'ERROR':
        return <section className="response-message error">
          Error in creating service ! Try again later.
        </section>

      default:
        return null
    }
  }

  // Function to determine the content rendered in service list
  const renderServicesList = (services: Service[]) => {
    if (services) {
      if (services.length > 0) {
        return <ul className="services-wrapper">
          {services.map((item: Service, index: number) => {
            const { name, url, addTime, status } = item;
            return <li key={`${index}-${name}`} >
              <Card
                title={name}
                url={url}
                addTime={addTime}
                status={status}
                deleteAction={(e: any) => handleDelete(e, index)}
              />
            </li>
          })}
        </ul>
      } else {
        // Display banner if no services exist.
        return <Banner message="There seem to be no services created in the dashboard." icon={<FileSearchOutlined />} >
          <button
            tabIndex={0}
            role="button"
            aria-label="Add Item Button"
            onClick={openModal}
            // onKeyDown={openModal}
            className="btn">
            Add Service +
          </button>
        </Banner>

      }
    }
    // Display Banner if there is an error in fetching services
    return <Banner message="We have encountered a problem with our service." icon={<FileUnknownOutlined />} />
  }

  useEffect(() => {
    fetchServiceData()
  }, []);

  return (
    <main className="module-wrapper">
      <section className="nav">
        <nav className="nav-item">
          {
            services?.length > 0 &&
            <button
              tabIndex={0}
              role="button"
              aria-label="Add Item Button"
              onClick={openModal}
              // onKeyDown={openModal}
              className="btn">
              Add Service +
            </button>
          }
        </nav>

      </section>
      {isServicesLoaded && renderServicesList(services)}
      <Modal show={modalToggle} modalClosed={closeModal}>
        <section style={{ color: 'black' }}>
          {renderServiceCreationContent(serviceCreationState)}
        </section>
      </Modal>
    </main >
  )

}

export default ServiceModule;
