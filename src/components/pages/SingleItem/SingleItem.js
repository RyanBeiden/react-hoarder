import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import itemsData from '../../../helpers/data/itemsData';

import './SingleItem.scss';

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

  render() {
    const { item } = this.state;

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
            </CardContent>
          </Card>
        </Box>
      </>
    );
  }
}

export default SingleItem;
