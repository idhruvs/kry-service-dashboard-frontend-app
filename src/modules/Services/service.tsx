import axios from 'axios';
import dayjs from 'dayjs'
import { Service } from './types';

const url = `${import.meta.env.VITE_SERVICE_URL}/service`;

// Fetch Services
async function fetchServices() {
  try {
    const response = await axios({ url });
    const services = response.data;

    return services.map(((service: Service): Service => {
      return {
        ...service,
        addTime: dayjs(service.addTime).format('YYYY-MM-DD HH:mm:ss'),
        isDeleted: false,
        isErrored: false,
      }
    }))
  } catch (e) {
    return null;
  }
}

// Create Service using {serviceName, serviceUrl} params
async function createService(service: any) {
  const options = {
    headers: { 'Content-Type': 'application/json' }
  };
  const data = { name: service.serviceName, url: service.serviceUrl }
  const response = await axios.post(url, { ...data }, options)
  return response.data
}

// Delete Service using serviceName param
async function deleteService(serviceName: string) {
  const options = {
    headers: { 'Content-Type': 'application/json' }
  };
  const data = { name: serviceName }
  const response = await axios.delete(url, { data: data, ...options })
  return response.data
}

export { fetchServices, createService, deleteService }
