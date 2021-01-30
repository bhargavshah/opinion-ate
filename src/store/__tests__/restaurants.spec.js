import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {loadRestaurants} from '../restaurants/actions';

import restaurantReducer from '../restaurants/reducers';

describe('Restaurants', () => {
  describe('loadRestaurants action', () => {
    it('stores the restaurant', async () => {
      const records = [
        {
          id: 1,
          name: 'Pasta Place',
        },
        {
          id: 2,
          name: 'Sushi Place',
        },
      ];

      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      const initialState = {
        records: [],
      };

      const store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      await store.dispatch(loadRestaurants());

      expect(store.getState().records).toEqual(records);
    });
  });
});
