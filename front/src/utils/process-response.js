export default function processResponse(response) {
  let isOk = response.ok;

  return response.text()
  .then(body => {
    try {
      body = JSON.parse(body);
    } catch (error) {
      if (isOk) isOk = false;
    }

    if (isOk || (!isOk && response.status === 204))
      return body;

    if (typeof body === 'string')
      throw { body, statusCode: response.status };
    throw { ...body, statusCode: response.status };
  });
}
