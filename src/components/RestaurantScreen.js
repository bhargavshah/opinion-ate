import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RestaurantList from './RestaurantList';
import NewRestaurantForm from './NewRestaurantForm';

export const RestaurantScreen = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <RestaurantList />
        <NewRestaurantForm createRestaurant={() => {}} />
      </CardContent>
    </Card>
  );
};

export default RestaurantScreen;
