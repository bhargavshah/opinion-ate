import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {loadRestaurants} from '../restaurants/actions';

import restaurantReducer from '../restaurants/reducers';

describe('Restaurants', () => {
  describe('loadRestaurants action', () => {
    describe('initially', () => {
      let store;

      beforeEach(() => {
        const initialState = {};

        store = createStore(
          restaurantReducer,
          initialState,
          applyMiddleware(thunk),
        );
      });

      it('does not have loading flag set', () => {
        expect(store.getState().loading).toEqual(false);
      });

      it('does not have error flag set', () => {
        expect(store.getState().error).toEqual(false);
      });
    });

    describe('while loading', () => {
      it('sets a loading flag', () => {
        const api = {
          loadRestaurants: () => new Promise(() => {}),
        };

        const initialState = {};

        const store = createStore(
          restaurantReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        store.dispatch(loadRestaurants());

        expect(store.getState().loading).toEqual(true);
      });
    });

    describe('when loading succeeds', () => {
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

      let store;

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.resolve(records),
        };

        const initialState = {
          records: [],
        };

        store = createStore(
          restaurantReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurants());
      });

      it('stores the restaurant', () => {
        expect(store.getState().records).toEqual(records);
      });

      it('clears the loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });

      it('should not set the error flag', () => {
        expect(store.getState().error).toEqual(false);
      });
    });

    describe('when loading fails', () => {
      let store;

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.reject(),
        };

        const initialState = {};

        store = createStore(
          restaurantReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurants());
      });

      it('sets an error flag', () => {
        expect(store.getState().error).toEqual(true);
      });

      it('clears the loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });
  });
});
