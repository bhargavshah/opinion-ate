import {render} from '@testing-library/react';
import RestaurantList from '../RestaurantList';

describe('RestauntList', () => {
  it('should render list of restaurants', () => {
    const loadRestaurants = jest.fn().mockName('loadRestaurants');

    render(<RestaurantList loadRestaurants={loadRestaurants} />);

    expect(loadRestaurants).toHaveBeenCalled();
  });
});
