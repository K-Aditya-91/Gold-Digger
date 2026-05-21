import { addNewPurchase } from "../utils/addNewPurchase.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sendResponse } from "../utils/sendResponse.js";


export function handleGet(res, statusCode, contentType, payload){
    sendResponse(res, statusCode, contentType, payload);
}

export async function handlePost(req, res) {

  try {
    const parsedBody = await parseJSONBody(req);
    const sanitizedBody = sanitizeInput(parsedBody);
    await addNewPurchase(sanitizedBody);
    sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody))
  } catch (err) {
    sendResponse(res, 400, 'application/json', JSON.stringify({error: err}))
  }

}