export interface RegisterRequest {
  username: string
  email: string
  password: string
  roleId: number
}

export interface RegisterResponse {
  id: string
  username: string
  email: string
  roleType: number
  createdAt: string
  updatedAt: string
}