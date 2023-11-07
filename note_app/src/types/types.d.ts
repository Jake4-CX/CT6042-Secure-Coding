
type RouteType = {
  method: "GET" | "POST" | "PUT" | "DELETE",
  route: string,
  controller: any,
  action: string,
  authorization: boolean,
  validation: any[]
}