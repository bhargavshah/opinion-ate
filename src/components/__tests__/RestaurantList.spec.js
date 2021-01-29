import {render} from '@testing-library/react';
import RestaurantList from '../RestaurantList';

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

  beforeEach(() => {
    loadRestaurants = jest.fn().mockName('loadRestaurants');
    context = render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );
  });

  it('should render list of restaurants', () => {
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    const {queryByText} = context;

    expect(queryByText('Pasta Place')).not.toBeNull();
    expect(queryByText('Sushi Place')).not.toBeNull();
  });
});
