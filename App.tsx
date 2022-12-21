import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
type Type = {
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  id: number;
};

export default function App() {
  const [data, setData] = useState<Type[]>();
  const [searchData, setSearchData] = useState<Type[]>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("https://api.sampleapis.com/coffee/hot");
      const dataFetch = await resp.json();
      setData(dataFetch);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const tmp = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchData(tmp);
    }
  }, [data, search]);

  const getHighlightedText = (text: string) => {
    const parts = text?.split(new RegExp(`(${search})`, "gi"));
    return (
      <Text style={styles.text}>
        {parts?.map((word, index) =>
          word.toLowerCase() === search.toLowerCase() ? (
            <Text
              key={index}
              style={[styles.text, { backgroundColor: "cyan" }]}
            >
              {word}
            </Text>
          ) : (
            word
          )
        )}
      </Text>
    );
  };

  const Clear = () => setSearch("");

  const renderItem = ({ item }: { item: Type }) => {
    return (
      <TouchableOpacity activeOpacity={0.6} style={styles.item}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          {/* <Text style={styles.text}>{item.title}</Text> */}
          {getHighlightedText(item.title)}
          <Text>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* <Button title="Get Data" onPress={fetchData} /> */}
      <View style={styles.inputCont}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
        <Text onPress={Clear} style={styles.clear}>
          Clear
        </Text>
      </View>
      <FlatList
        data={searchData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clear: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  input: {
    backgroundColor: "yellow",
    color: "green",
    height: 40,
    width: 320,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    paddingLeft: 10,
  },
  list: { marginTop: 20, width: 375 },
  image: { height: 50, width: 50 },
  item: {
    flexDirection: "row",
    padding: 10,
    height: 150,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 8,
  },
  text: { color: "black", fontSize: 16, fontWeight: "bold" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
});
