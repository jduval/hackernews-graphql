export default function processResponse(response) {
  return new Promise((resolve, reject) => {
    let isOk = response.ok;

    return response.text()
    .then(body => {
      try {
        body = JSON.parse(body);
      } catch (error) {
        if (isOk) isOk = false;
      }

      if (isOk || (!isOk && response.status === 204))
        return resolve(body);

      if (typeof body === 'string')
        return reject({ body, statusCode: response.status });
      reject({ ...body, statusCode: response.status });
    });
  });
}
