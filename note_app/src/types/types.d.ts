
type RouteType = {
  method: "GET" | "POST" | "PUT" | "DELETE",
  route: string,
  controller: any,
  action: string,
  authorization: boolean,
  validation: any[]
}

type User = {
  id: number,
  userName: string,
  userEmail: string,
  userPassword?: string,
  userToken?: string,
  createdAt: Date,
  updatedAt: Date
}

type Message = {
  id: number,
  messageTitle: string,
  messageContent: string,
  createdAt: Date,
  updatedAt: Date,
  user: User
}