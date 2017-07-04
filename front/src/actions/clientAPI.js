import 'whatwg-fetch';
import { config } from '../constants/config';

const BASE_URL = `${config.back.host}/graphql`;

const POST_OPT = {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};

/**
 * API client.
 *
 * @param {string} query - Get graphql query.
 * @param {string} body - POST JSON.stringify() of graphql query.
 *
 * @return Promise
 */
export const clientAPI = ({query, body}) => {
  const url = query ? `${BASE_URL}?${query.replace(/\s/g, '')}` : BASE_URL;
  const opt = body ? Object.assign({}, POST_OPT, {body}) : {};

  return fetch(url, opt);
};
