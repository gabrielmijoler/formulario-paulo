export type IPathologiesRequest = {
  code: string
  description: string
}
export type IPathologiesResponse = {
  code: string
  description: string
  id: string
}
export type IGetPathologiesRequest = {
  paginate: boolean
  per_page:number
}
