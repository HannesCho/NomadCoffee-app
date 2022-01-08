import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Container } from "./shared";

export default function ScreenLayout({ loading, children }) {
  return (
    <Container
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? <ActivityIndicator color="black" /> : children}
    </Container>
  );
}
