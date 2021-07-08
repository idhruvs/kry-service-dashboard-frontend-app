export type ServiceCreationStatus = 'INITIALIZED' | 'SUCCESS' | 'ERROR'

export type ServiceStatus = 'UNKNOWN' | 'OK' | 'FAIL'

export type Service = {
  name: string,
  addTime?: string,
  status?: ServiceStatus,
  url: string,
  isDeleted?: boolean,
  isErrored?: boolean
}
