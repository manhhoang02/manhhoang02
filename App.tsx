import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import ApiSearchBar from "./app/screens/ApiSearchBar";
import { Modalize } from "react-native-modalize";

export default function App() {
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => modalizeRef.current?.open();
  const onClose = () => modalizeRef.current?.close();

  return (
    <View style={styles.container}>
      {/* <ApiSearchBar /> */}
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Text>abc</Text>

      <Modalize withReactModal ref={modalizeRef}>
        <Text>abc</Text>

        <TouchableOpacity onPress={onClose}>
          <Text>Close the modal</Text>
        </TouchableOpacity>
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
});
