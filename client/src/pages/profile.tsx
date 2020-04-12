import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { RouteComponentProps } from '@reach/router';

import { Header, Loading, LaunchTile } from '../components';
import * as GetMyTripsTypes from './__generated__/GetMyTrips';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_MY_TRIP = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface ProfileProps extends RouteComponentProps { }

const Profile: React.FC<ProfileProps> = () => {
  const { data, loading, error } = useQuery<GetMyTripsTypes.GetMyTrips, any>(
    GET_MY_TRIP,
    { fetchPolicy: 'network-only' }
  );
  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Not found.</p>;
  return (
    <Fragment>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
          <p>You haven't booked any trips yet.</p>
        )}
    </Fragment>
  );
};

export default Profile;
