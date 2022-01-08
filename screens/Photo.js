import React from "react";
import { Container, Content, Logo } from "../components/shared";

export default function Photo() {
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <Content>Photo</Content>
    </Container>
  );
}
