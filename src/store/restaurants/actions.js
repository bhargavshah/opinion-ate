export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';
export const START_LOADING = 'START_LOADING';
export const LOADING_FAILED = 'LOADING_FAILED';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';

export const loadRestaurants = () => (dispatch, getState, api) => {
  dispatch(startLoading());
  api
    .loadRestaurants()
    .then(records => {
      dispatch(storeRestaurants(records));
    })
    .catch(() => {
      dispatch(failLoading());
    });
};

export const createRestaurant = name => (dispatch, getState, api) => {
  return api.createRestaurant(name).then(record => {
    dispatch(addRestaurant(record));
  });
};

const failLoading = () => ({type: LOADING_FAILED});

const startLoading = () => ({type: START_LOADING});

const storeRestaurants = records => ({
  type: STORE_RESTAURANTS,
  records,
});

const addRestaurant = record => ({
  type: ADD_RESTAURANT,
  record,
});
