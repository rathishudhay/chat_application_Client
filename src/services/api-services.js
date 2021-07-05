const { httpOperations } = require("./httpOperations")
const { onUserConnectUrl, addContactUrl } = require("../constants/api-constants")
export const addUserAndSocket = (payload) => {
  console.log(payload)
  return httpOperations.http_post(onUserConnectUrl, payload)
}

export const addContact = (payload) => {
  console.log(payload)
  return httpOperations.http_post(addContactUrl, payload)
}