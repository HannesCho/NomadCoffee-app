import React from "react";
import { Container, Content, Logo } from "../components/shared";

export default function Profile() {
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <Content>Profile</Content>
    </Container>
  );
}
