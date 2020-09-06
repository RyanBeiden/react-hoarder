import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import itemShape from '../../../helpers/props/itemShape';

import './ItemCard.scss';

const styles = {
  root: {
    width: 345,
  },

  media: {
    height: 240,
  },

  blueButton: {
    background: 'linear-gradient(45deg, #0d70a5 30%, #4692bb 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 38,
    padding: '0 20px',
  },
};

class ItemCard extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
    deleteItem: PropTypes.func.isRequired,
  }

  deleteItemEvent = (e) => {
    e.preventDefault();
    const { deleteItem, item } = this.props;
    deleteItem(item.id);
  }

  render() {
    const { item, classes } = this.props;
    const viewLink = `/stuff/${item.id}`;
    const editLink = `/edit/${item.id}`;

    return (
      <Box p={2}>
        {item ? (
          <Card className={classes.root} variant="outlined">
            <Link to={viewLink} className="ItemCard__link">
              <CardActionArea className="ItemCard__container">
                <CardMedia
                  className={classes.media}
                  image={item.itemImage}
                  title={item.itemName}
                />
                <CardContent className="ItemCard__content">
                  <Typography className="ItemCard__text" gutterBottom variant="h5" component="h2">
                    {item.itemName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
            <CardActions className="ItemCard__link-container">
              <Link to={editLink} className="ItemCard__link">
                <Button size="small" color="primary" className={classes.blueButton}>Edit</Button>
              </Link>
              <DeleteForeverRoundedIcon className="ItemCard__delete-icon" onClick={this.deleteItemEvent}/>
            </CardActions>
          </Card>
        ) : (
          <Skeleton variant="rect" width={210} height={118} />
        )}
      </Box>
    );
  }
}

export default withStyles(styles)(ItemCard);
