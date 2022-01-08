import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";

const SEARCH_SHOP = gql`
  query searchShops($keyword: String!) {
    searchShops(keyword: $keyword) {
      id
      name
    }
  }
`;

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MessageText = styled.Text`
  margin-top: 10px;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: rgba(129, 129, 129, 0.8);
  padding: 5px 10px;
  border-radius: 10px;
  color: white;
  width: ${(props) => props.width / 1.5}px;
`;

export default function Search({ navigation }) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { setValue, register, handleSubmit, watch } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_SHOP);

  const onValid = (keyword) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      autoCapitalize="none"
      placeholder="Search Shop"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
    });
  }, []);

  const renderItem = ({ item: shop }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: shop.url }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <Text>1</Text>
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by Keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchShops !== undefined ? (
          data?.searchShops.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchShops}
              keyExtractor={(shop) => "" + shop.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
