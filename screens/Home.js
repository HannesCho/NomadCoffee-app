import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, Text } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import Shop from "./Shops";

const HOME_QUERY = gql`
  query seeCoffeeShops($lastId: Int!) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
    }
  }
`;

export default function Home() {
  const { data, loading, fetchMore, refetch } = useQuery(HOME_QUERY, {
    variables: {
      lastId: 0,
    },
  });
  const renderShop = ({ item: shop }) => {
    return <Shop {...shop} />;
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={() =>
          fetchMore({
            variables: {
              lastId: data?.seeCoffeeShops?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        data={data?.seeCoffeeShops}
        showsVerticalScrollIndicator={false}
        keyExtractor={(shop) => "" + shop.id}
        renderItem={renderShop}
      />
    </ScreenLayout>
  );
}
