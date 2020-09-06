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

import './EditItem.scss';

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

class EditItem extends React.Component {
  state = {
    item: {
      itemName: '',
      itemImage: '',
      itemDescription: '',
    },
  }

  componentDidMount() {
    const { itemId } = this.props.match.params;
    itemsData.getItemById(itemId)
      .then((res) => {
        this.setState({ item: res.data });
      })
      .catch((err) => console.error('Could not get item by it\'s id to edit -> ', err));
  }

  updateNameEvent = (e) => {
    e.preventDefault();
    const { item } = this.state;
    item.itemName = e.target.value;
    this.setState({ item });
  }

  updateImageEvent = (e) => {
    e.preventDefault();
    const { item } = this.state;
    item.itemImage = e.target.value;
    this.setState({ item });
  }

  updateDescriptionEvent = (e) => {
    e.preventDefault();
    const { item } = this.state;
    item.itemDescription = e.target.value;
    this.setState({ item });
  }

  updateItem = (e) => {
    e.preventDefault();
    const { item } = this.state;
    const { itemId } = this.props.match.params;

    const newItem = {
      itemName: item.itemName,
      itemImage: item.itemImage,
      itemDescription: item.itemDescription,
      uid: authData.getUid(),
    };

    itemsData.updateItem(itemId, newItem)
      .then(() => {
        this.props.history.push('/stuff');
      })
      .catch((err) => console.error('Updating the item did not work -> ', err));
  }

  render() {
    const { classes } = this.props;
    const { item } = this.state;

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <div className="page-title NewItem__title">
          <h3>Edit {item.itemName}</h3>
        </div>
        <div className="NewItem__container">
          <Grid>
            <FormControl margin='dense' className="NewItem__input">
              <InputLabel htmlFor="item-name"></InputLabel>
              <Input
                id="item-name"
                aria-describedby="my-helper-text"
                onChange={this.updateNameEvent}
                value={item.itemName}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl margin='dense' className="NewItem__input">
              <InputLabel htmlFor="item-image"></InputLabel>
              <Input
                id="item-image"
                aria-describedby="my-helper-text"
                onChange={this.updateImageEvent}
                value={item.itemImage}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl margin='dense' className="NewItem__input">
              <InputLabel htmlFor="item-description"></InputLabel>
              <Input
                id="item-description"
                aria-describedby="my-helper-text"
                onChange={this.updateDescriptionEvent}
                value={item.itemDescription}
              />
            </FormControl>
          </Grid>
          <Grid>
            <Button className={classes.blueButton} onClick={this.updateItem}>
              Save
            </Button>
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(EditItem);
