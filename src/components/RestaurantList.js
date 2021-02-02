import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import {loadRestaurants} from '../store/restaurants/actions';
import {Typography} from '@material-ui/core';

export const RestaurantList = ({
  loadRestaurants,
  restaurants,
  loading,
  error,
}) => {
  useEffect(() => loadRestaurants(), [loadRestaurants]);

  return (
    <>
      {loading && <CircularProgress data-testid="loading-indicator" />}
      {error && (
        <Typography variant="body1" data-testid="error">
          Could not load restaurants :(
        </Typography>
      )}
      <List>
        {restaurants.map(restaurant => (
          <ListItem key={restaurant.id}>
            <ListItemText>{restaurant.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const mapDispatchToProps = {loadRestaurants};

const mapStateToProps = state => ({
  restaurants: state.restaurants.records,
  loading: state.restaurants.loading,
  error: state.restaurants.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
