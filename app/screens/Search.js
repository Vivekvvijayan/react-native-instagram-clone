import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { SearchBar } from "@rneui/themed";
import { Images } from "../../utils/Images";
import { Icons } from "../../utils/Size";

const Search = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          style={{
            backgroundColor: "white",
            height: 90,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              width: "90%",
              height: 40,
              backgroundColor: "#eff3f6",
              borderRadius: 9,

              alignItems: "center",
              flexDirection: "row",
              paddingLeft: 10,
            }}
          >
            <Image source={Images.search} style={{ width: 17, height: 17 }} />
            <TextInput
              placeholder="Search"
              style={{
                backgroundColor: "transparent",
                width: "100%",
                height: 50,
                paddingHorizontal: 10,
              }}
            />
          </View>
        </View>
      ),
    });
  },[]);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          height: "20%",
          width: "32%",
          margin: 2,
        }}
      >
        <Image
          source={{
            uri: "https://w.forfun.com/fetch/05/05eeb93a2e41734ecb6044146351f11e.jpeg",
          }}
          style={{ width: "100%", resizeMode: "cover", height: "100%" }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          height: "20%",
          width: "32%",
          margin: 2,
        }}
      >
        <Image
          source={{
            uri: "https://wallpaperaccess.com/full/271965.jpg",
          }}
          style={{ width: "100%", resizeMode: "cover", height: "100%" }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          height: "20%",
          width: "32%",
          margin: 2,
        }}
      >
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/vivid-transparent-orange-autumn-leaf_23-2148239677.jpg",
          }}
          style={{ width: "100%", resizeMode: "cover", height: "100%" }}
        />
      </View>
    </ScrollView>
  );
};

export default Search;
const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: "white",
    flexWrap: "wrap",
  },
});
