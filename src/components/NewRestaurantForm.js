import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import {styled} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';

const InputBox = styled(Box)(({theme}) => ({
  '& > *': {
    margin: theme.spacing(1),
  },
}));

export function NewRestaurantForm({createRestaurant}) {
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setServerError(false);
    if (name) {
      setValidationError(false);
      createRestaurant(name)
        .then(() => {
          setName('');
        })
        .catch(() => {
          setServerError(true);
        });
    } else {
      setValidationError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {validationError && <Alert severity="error">Name is required</Alert>}
      {serverError && (
        <Alert severity="error">
          The restaurant could not be saved. Please try again.
        </Alert>
      )}
      <InputBox display="flex">
        <TextField
          placeholder="Add Restaurant"
          fullWidth
          variant="filled"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          data-testid="new-restaurant-submit-button"
          type="submit"
        >
          Add
        </Button>
      </InputBox>
    </form>
  );
}

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};
export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
