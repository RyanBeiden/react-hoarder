import React from 'react';

import Box from '@material-ui/core/Box';

import itemsData from '../../../helpers/data/itemsData';
import authData from '../../../helpers/data/authData';
import ItemCard from '../../shared/ItemCard/ItemCard';

import './Stuff.scss';

class Stuff extends React.Component {
  state = {
    items: [],
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    itemsData.getItemsByUid(authData.getUid())
      .then((items) => this.setState({ items }))
      .catch((err) => console.error('Getting items by UID did not work -> ', err));
  }

  render() {
    const { items } = this.state;

    const getItemCards = items.map((item) => <ItemCard
      key={item.id}
      item={item}
    />);

    return (
      <div className="Stuff">
        <div className="page-title">
          <h3>My Stuff</h3>
        </div>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" p={1} m={1}>
          {getItemCards}
        </Box>
      </div>
    );
  }
}

export default Stuff;
