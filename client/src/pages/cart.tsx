import React, { Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from "@apollo/react-hooks"
import gql from 'graphql-tag';

import { Header, Loading } from '../components';
import { CartItem, BookTrips } from '../containers';
import * as GetCartItemTypes from './__generated__/GetCartItems'

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`

interface CartProps extends RouteComponentProps { }

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery<GetCartItemTypes.GetCartItems>(GET_CART_ITEMS);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Fragment>
      <Header>My Cart</Header>
      {!data || !!data && data.cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
          <Fragment>
            {
              !!data && data.cartItems.map((launchId: any) => (
                <CartItem key={launchId} launchId={launchId} />
              ))
            }
            <BookTrips cartItems={!!data ? data.cartItems : []} />
          </Fragment>
        )}
    </Fragment>
  )
}

export default Cart;
