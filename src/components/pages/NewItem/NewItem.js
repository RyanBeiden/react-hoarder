import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Input,
  InputLabel,
  Grid,
  Button,
} from '@material-ui/core';

import itemsData from '../../../helpers/data/itemsData';
import authData from '../../../helpers/data/authData';

import './NewItem.scss';

const styles = {
  blueButton: {
    background: 'linear-gradient(45deg, #0d70a5 30%, #4692bb 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 38,
    padding: '0 20px',
    margin: '25px 0px 0px 0px',
  },
};

class NewItem extends React.Component {
  state = {
    itemName: '',
    itemImage: '',
    itemDescription: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ itemName: e.target.value });
  }

  changeImageEvent = (e) => {
    e.preventDefault();
    this.setState({ itemImage: e.target.value });
  }

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ itemDescription: e.target.value });
  }

  addNewItem = (e) => {
    e.preventDefault();
    const { itemName, itemImage, itemDescription } = this.state;

    const newItem = {
      itemName,
      itemImage,
      itemDescription,
      uid: authData.getUid(),
    };

    itemsData.addNewItem(newItem)
      .then(() => {
        this.props.history.push('/stuff');
      })
      .catch((err) => console.error('Adding a new item did not work -> ', err));
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <div className="page-title NewItem__title">
          <h3>Add a New Item</h3>
        </div>
        <div className="NewItem__container">
          <Grid>
            <FormControl margin='dense' className="NewItem__input">
              <InputLabel htmlFor="item-name">Name</InputLabel>
              <Input id="item-name" aria-describedby="my-helper-text" onChange={this.changeNameEvent} />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl margin='dense' className="NewItem__input">
              <InputLabel htmlFor="item-image">Image URL</InputLabel>
              <Input id="item-image" aria-describedby="my-helper-text" onChange={this.changeImageEvent} />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl margin='dense' className="NewItem__input">
              <InputLabel htmlFor="item-description">Description</InputLabel>
              <Input id="item-description" aria-describedby="my-helper-text" onChange={this.changeDescriptionEvent} />
            </FormControl>
          </Grid>
          <Grid>
            <Button className={classes.blueButton} onClick={this.addNewItem}>
              Add
            </Button>
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(NewItem);
