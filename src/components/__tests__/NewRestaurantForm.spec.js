import {act, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from '../NewRestaurantForm';
import flushPromises from 'flush-promises';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Ramen place';

  let createRestaurant;
  let context;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName('createRestaurant');
    context = render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  describe('when filled in', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = context;

      await userEvent.type(
        getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );

      userEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('calls createRestaurant with the name', () => {
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('clears the name', () => {
      const {getByPlaceholderText} = context;
      expect(getByPlaceholderText('Add Restaurant').value).toBe('');
    });
  });
});
