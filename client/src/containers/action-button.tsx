import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';
import * as LaunchDetailTypes from '../pages/__generated__/LaunchDetails';

const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(id: $launchId) {
      success
      message
      launch {
        id
        isBooked
      }
    }
  }
`;

interface ActionButtonProps
  extends Partial<LaunchDetailTypes.LaunchDetails_launch> { }

const ActionButton: React.FC<ActionButtonProps> = ({
  isBooked,
  id,
  isInCart,
}) => {
  const [mutate, { loading, error }] = useMutation(
    isBooked ? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: {
        launchId: id,
      },
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: id },
        },
      ],
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An Error Occured.</p>;
  return (
    <div>
      <Button onClick={() => mutate()} data-test-id={'action-button'}>
        {isBooked
          ? 'Cancel this trip'
          : isInCart
            ? 'Remove From Cart'
            : 'Add to Cart'}
      </Button>
    </div>
  );
};

export default ActionButton;
