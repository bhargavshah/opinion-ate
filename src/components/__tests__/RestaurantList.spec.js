import {render} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {
      id: 1,
      name: 'Pasta Place',
    },
    {
      id: 2,
      name: 'Sushi Place',
    },
  ];
  let loadRestaurants;
  let context;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      restaurants,
      loading: false,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;
    context = render(<RestaurantList {...props} />);
  };

  it('load restaurants on first render', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  describe('when loading succeeds', () => {
    beforeEach(() => {
      renderWithProps();
    });

    it('displays the restaurants', () => {
      const {queryByText} = context;

      expect(queryByText('Pasta Place')).not.toBeNull();
      expect(queryByText('Sushi Place')).not.toBeNull();
    });

    it('does not display the loading indicator', () => {
      const {queryByTestId} = context;
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    it('does not display error', () => {
      const {queryByTestId} = context;
      expect(queryByTestId('error')).toBeNull();
    });
  });

  it('display the loading indicator while loading', () => {
    renderWithProps({loading: true});
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });

  it('display error when loading fails', () => {
    renderWithProps({error: true});
    const {queryByTestId} = context;
    expect(queryByTestId('error')).not.toBeNull();
  });
});
