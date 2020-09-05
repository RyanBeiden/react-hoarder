import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './ItemCard.scss';

const styles = {
  root: {
    maxWidth: 345,
  },

  media: {
    height: 140,
  },

  content: {
    background: '#eceff1',
    color: '#323232',
  },

  redButton: {
    background: 'linear-gradient(45deg, #97110f 30%, #c94e4c 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 38,
    padding: '0 20px',
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
  render() {
    const { item, classes } = this.props;

    return (
      <Box p={1}>
        <Card className={classes.root} variant="outline">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={item.itemImage}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h5" component="h2">
                {item.itemName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.itemDescription}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" className={classes.blueButton}>
              View
            </Button>
            <Button size="small" color="primary" className={classes.redButton}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
}

export default withStyles(styles)(ItemCard);
