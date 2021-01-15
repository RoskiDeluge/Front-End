import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const FETCH_DATA = "FETCH_DATA";
export const UPDATE_TRUCKS = "UPDATE_TRUCKS";
export const ADD_TRUCK = "ADD_TRUCK";
export const SET_ERROR = "SET_ERROR";
export const DELETE_TRUCK = "DELETE_TRUCK";

export const getData = () => dispatch => {
    dispatch({ type: FETCH_DATA });
    axios
      .get("http://localhost:5000/api/trucks")
      .then(res => {
        console.log("rd: getData, actions", res.data);
        dispatch({ type: UPDATE_TRUCKS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: SET_ERROR, payload: "error fetching Trucks from api", err });
      })
  }

export const getMyTrucks = () => dispatch => {
  axiosWithAuth()
    .get("http://localhost:5000/api/trucks/mytrucks")
    .then(res => {
      console.log("rd: getMyTrucks, actions", res.data);
      dispatch({ type: UPDATE_TRUCKS, payload: res.data });
      // console.log("rd: actions: getMyTrucks", res.data)
    })
    .catch(err => {
      dispatch({ type: SET_ERROR, payload: "error fetching MyTrucks from api", err });
    })
}

export const postData = (item) => dispatch => {
  axiosWithAuth()
    .post("http://localhost:5000/api/trucks/add", item)
    .then(res => {
      console.log("rd: postData, actions", res.data)
      dispatch({type: ADD_TRUCK, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SET_ERROR, payload: "error posting Truck to api", err });
    })
}

export const putData = (item) => dispatch => {
  axiosWithAuth()
    .put(`/api/trucks/update/${item.id}`, item)
    .then(res => {
      console.log("rd: putData, actions", res.data);
      // dispatch({type: ADD_TRUCK, payload: res.data });
      // dispatch({ type: UPDATE_TRUCKS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SET_ERROR, payload: "error putting Truck to api", err });
    })
}

export const delTruck = (item) => dispatch => {
  axiosWithAuth()
    .delete(`/api/trucks/remove/${item.id}`)
    .then(res => {
      console.log("rd: delTruck: actions, ", res.data);
      dispatch({ type: DELETE_TRUCK, payload: res.data })   
    })
    .catch(err => {
      dispatch({ type: SET_ERROR, payload: "error deleting Truck from api", err });
    })
}