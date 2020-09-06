import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getItemsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allItems = response.data;
      const myItems = [];

      if (allItems) {
        Object.keys(allItems).forEach((itemId) => {
          allItems[itemId].id = itemId;
          myItems.push(allItems[itemId]);
        });
      }
      resolve(myItems);
    })
    .catch((err) => reject(err));
});

const getItemById = (itemId) => axios.get(`${baseUrl}/items/${itemId}.json`);

const addNewItem = (newItem) => axios.post(`${baseUrl}/items.json`, newItem);

export default {
  getItemsByUid,
  getItemById,
  addNewItem,
};
