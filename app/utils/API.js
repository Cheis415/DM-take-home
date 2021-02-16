import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

async function request(endpoint, params = {}, verb = 'get') {
  let req;

  if (verb === 'get') {
    req = axios.get(`${BASE_URL}/${endpoint}`, {
      params: { ...params },
    });
  } else if (verb === 'post') {
    req = axios.post(`${BASE_URL}/${endpoint}`, { ...params });
  }

  try {
    return (await req).data;
  } catch (err) {
    const { message } = err.response.data;
    throw Array.isArray(message) ? message : [message];
  }
}

async function getInspiration() {
  const response = await request('inspirations');

  return response.inspiration;
}

async function addNewInspiration(inspiration) {
  const response = await request(`inspirations`, { inspiration }, 'post');
  return response;
}

export { getInspiration, addNewInspiration };
