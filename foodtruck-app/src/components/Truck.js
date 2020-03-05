import React from 'react';
import { Link } from "react-router-dom";

const Truck = props => {
    return (
        props.trucks.map((truck) => {
          return <div key={truck.id}>
            <div>{truck.truckName}</div>
            <div>{truck.foodType}</div>
            <div>{truck.location}</div>
            </div>
        })
    )
}

export default Truck 