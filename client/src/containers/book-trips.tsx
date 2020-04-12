import React from 'react';
import { useMutation } from "@apollo/react-hooks"
import gql from 'graphql-tag';

import Button from '../components/button';
import { GET_LAUNCH } from "./cart-item";
import * as GetCartItemsTypes from '../pages/__generated__/GetCartItems';
import * as BookTripTypes from "./__generated__/BookTrips"

export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(laucnhIds: $launchIds) {
      success
      message
      launch {
        id
        isBooked
      }
    }
  }
`;

interface BookTripsProps extends GetCartItemsTypes.GetCartItems { }

const BookTrips: React.FC<any> = ({ cartItems }) => {
  return <div />;
}

export default BookTrips;
