import {render} from '@testing-library/react';
import RestaurantList from '../RestaurantList';

describe('RestauntList', () => {
  it('should render list of restaurants', () => {
    const loadRestaurants = jest.fn().mockName('loadRestaurants');

    render(
      <RestaurantList loadRestaurants={loadRestaurants} restaurants={[]} />,
    );

    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    const noop = () => {};
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

    const {queryByText} = render(
      <RestaurantList loadRestaurants={noop} restaurants={restaurants} />,
    );

    expect(queryByText('Pasta Place')).not.toBeNull();
    expect(queryByText('Sushi Place')).not.toBeNull();
  });
});
