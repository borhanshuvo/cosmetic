import * as React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function Input(props) {
  const { placeholder, wi, pa, align, onChangeText } = props;
  return (
    <View style={{ width: wi, paddingLeft: pa, paddingRight: pa }}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={[style.input, { textAlign: align }]}
      />
    </View>
  );
}
export default Input;
const style = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 11,
    borderRadius: 11,
    marginTop: 12,
  },
});
