import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Container } from "../components/shared";

const Header = styled.TouchableOpacity`
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image``;
const Username = styled.Text`
  margin-left: 10px;
  color: white;
`;
const File = styled.Image``;
const Actions = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  font-size: 20px;
  margin-right: 5px;
`;
const Content = styled.View`
  color: white;
  padding: 10px;
`;
const Address = styled.Text`
  color: white;
`;
const Likes = styled.Text`
  color: pink;
`;

export default function Shop({ id, name, photos, user, categories }) {
  const navigation = useNavigation();
  const photo = photos ? photos[0]?.url : null;
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 500);
  useEffect(() => {
    Image.getSize(photo, (width, height) => {
      setImageHeight(height / 3);
    });
  }, [photo]);
  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <UserAvatar
          resizeMode="cover"
          source={{ uri: user?.avatar }}
          style={{ width: 30, height: 30, borderRadius: 25 }}
        />
        <Username>{user ? user.username : null}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{
          width,
          height: imageHeight,
        }}
        source={{ uri: photo ? photo : null }}
      />
      <Actions>
        <Action>
          <Ionicons style={{ color: "white" }} name="heart-outline" size={22} />
        </Action>
        <Action onPress={() => navigation.navigate("Comments")}>
          <Ionicons
            style={{ color: "white" }}
            name="chatbubble-outline"
            size={20}
          />
        </Action>
      </Actions>
    </Container>
  );
}
