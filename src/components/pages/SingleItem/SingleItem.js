import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import itemsData from '../../../helpers/data/itemsData';

import './SingleItem.scss';

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

class SingleItem extends React.Component {
  state = {
    item: {},
  }

  componentDidMount() {
    const { itemId } = this.props.match.params;

    itemsData.getItemById(itemId)
      .then((res) => this.setState({ item: res.data }))
      .catch((err) => console.error('Could not get the item by its id -> ', err));
  }

  deleteSingleItem = (e) => {
    e.preventDefault();
    const { itemId } = this.props.match.params;

    itemsData.deleteItem(itemId)
      .then(() => {
        this.props.history.push('/stuff');
      })
      .catch((err) => console.error('Could not delete the single item -> ', err));
  }

  render() {
    const { item } = this.state;
    const { classes } = this.props;
    const { itemId } = this.props.match.params;
    const editLink = `/edit/${itemId}`;

    return (
      <>
        <Box className="page-title" mt={4}>
          <h3>{item.itemName}</h3>
        </Box>
        <Box display="flex" justifyContent="center" p={1} mb={5}>
          <Card className="SingleItem__root">
            {item.itemImage ? (
              <CardMedia
                className="SingleItem__media"
                image={item.itemImage}
                title={item.itemName}
              />
            ) : (
              <Skeleton variant="rect" width={210} height={118} />
            )}
            <CardContent>
              <Typography className="SingleItem__description" component="p">
                {item.itemDescription}
              </Typography>
              <div className="SingleItem__link-container">
                <Link to={editLink} className="SingleItem__link">
                  <Button size="small" color="primary" className={classes.blueButton}>Edit</Button>
                </Link>
                <DeleteForeverRoundedIcon className="SingleItem__delete-icon" onClick={this.deleteSingleItem}/>
              </div>
            </CardContent>
          </Card>
        </Box>
      </>
    );
  }
}

export default withStyles(styles)(SingleItem);
