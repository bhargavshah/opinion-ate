import {act, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from '../NewRestaurantForm';
import flushPromises from 'flush-promises';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Ramen place';
  const requiredError = 'Name is required';

  let createRestaurant;
  let context;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName('createRestaurant');
    context = render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  describe('initially', () => {
    it('should not show validation error', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).toBeNull();
    });
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

    it('does not display validation error', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).toBeNull();
    });
  });

  describe('when empty', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = context;

      await userEvent.type(getByPlaceholderText('Add Restaurant'), '');

      userEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('displays a validation error', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).not.toBeNull();
    });
  });

  describe('when correcting a validation error', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = context;

      await userEvent.type(getByPlaceholderText('Add Restaurant'), '');

      userEvent.click(getByTestId('new-restaurant-submit-button'));

      await userEvent.type(
        getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );

      userEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('clears the validation error', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).toBeNull();
    });
  });
});
