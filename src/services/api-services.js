const { httpOperations } = require("./httpOperations")
const { onUserConnectUrl } = require("../constants/api-constants")
export const addUserAndSocket = (payload) => {
  console.log(payload)
  return httpOperations.http_post(onUserConnectUrl, payload)
}