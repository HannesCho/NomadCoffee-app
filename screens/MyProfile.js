import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Button, Text, View } from "react-native";
import { logUserOut } from "../apollo";
import { Container, Content, Logo } from "../components/shared";

const SEEPROFIE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      email
      name
    }
  }
`;

export default function MyProfile() {
  const { data } = useQuery(FEED_QUERY);
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <Content>My Profile Page</Content>
      <Button title="Log Out" onPress={logUserOut} />
    </Container>
  );
}
