import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-client'

import { LoginForm, Loading } from "../components";
import * as LOGIN_TYPES from "./__generated__/login"

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default function Login() {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error }] = useMutation<LOGIN_TYPES.login, LOGIN_TYPES.loginVariables>(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        localStorage.setItem("token", login as string);
        client.writeData({ data: { isLoggedIn: true } });
      }
    });

  if (loading) return <Loading />;
  if (error) return <p>An error occured.</p>;
  return <LoginForm login={login} />;
}
