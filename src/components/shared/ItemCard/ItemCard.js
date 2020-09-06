import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

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
  }

  render() {
    const { item, classes } = this.props;
    const viewLink = `/stuff/${item.id}`;

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
            <CardActions>
              <Button size="small" color="primary" className={classes.blueButton}>
                Edit
              </Button>
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
