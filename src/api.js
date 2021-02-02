import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://outside-in-dev-api.herokuapp.com/G3Iu6PCDp0KPGsRr4HjnFuvrW5oQwNjP',
});

const api = {
  loadRestaurants: () =>
    client.get('/restaurants').then(response => response.data),
  createRestaurant: name =>
    client.post('/restaurants', {name}).then(response => response.data),
};

export default api;
