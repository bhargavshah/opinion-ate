import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createRestaurant, loadRestaurants} from '../restaurants/actions';

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

  describe('createRestaurants action', () => {
    const newRestaurantName = 'Ramen place';
    const existingRestaurant = {id: 1, name: 'Pizza Place'};
    const responseRestaurant = {id: 2, name: newRestaurantName};

    let api;
    let store;
    let promise;

    beforeEach(() => {
      api = {
        createRestaurant: jest.fn().mockName('createRetaurant'),
      };

      const initialState = {records: [existingRestaurant]};

      store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );
    });

    it('saves the restaurant to server', () => {
      api.createRestaurant.mockResolvedValue(responseRestaurant);
      store.dispatch(createRestaurant(newRestaurantName));
      expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
    });

    describe('when save succeeds', () => {
      beforeEach(() => {
        api.createRestaurant.mockResolvedValue(responseRestaurant);
        promise = store.dispatch(createRestaurant(newRestaurantName));
        return promise;
      });

      it('stores the returned restaurant to the store', () => {
        expect(store.getState().records).toEqual([
          existingRestaurant,
          responseRestaurant,
        ]);
      });

      it('resolves', () => {
        return expect(promise).resolves.toBeUndefined();
      });
    });

    describe('when save fails', () => {
      it('rejects', () => {
        api.createRestaurant.mockRejectedValue();
        promise = store.dispatch(createRestaurant(newRestaurantName));
        return expect(promise).rejects.toBeUndefined();
      });
    });
  });
});
