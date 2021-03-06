import axios from 'axios';
import { FETCHING_FRIENDS, FRIENDS_FETCHED, FETCHING_FRIENDS_ERROR } from './action';
import { constantUrl } from '../sync';
import socket from '../sync';

export function getAllFriends () {
  return function (dispatch) {
    dispatch({type: FETCHING_FRIENDS });
    axios.get(constantUrl + '/friends/findAll')
      .then((response) => {
        dispatch({type: FRIENDS_FETCHED, payload: response.data });
      })
      .catch((error) => {
        dispatch({type: FETCHING_FRIENDS_ERROR, error: error });
      });
  };
};

export function addFriend (friendid, friendname) {
  return function (dispatch) {
    dispatch({type: FETCHING_FRIENDS});
    axios.post(constantUrl + '/friends/add', {
      friendid,
      friendname
    })
    .then((response) => {
      dispatch(getAllFriends());
    })
    .catch((error) => {
      dispatch({
        type: FETCHING_FRIENDS_ERROR,
        payload: error
      });
    });
  }
};

export function deleteFriend (friendname) {
  let data = {
    userid: global.localStorage.userid,
    friendname
  };
  socket.emit('delete friend', data);
};
