import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RestaurantList from './RestaurantList';

export const RestaurantScreen = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <RestaurantList />
      </CardContent>
    </Card>
  );
};

export default RestaurantScreen;
