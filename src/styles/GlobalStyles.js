import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  authTextField: {
    // Refers to input space, not the underline below nor the text placeholder
    borderColor: "#3F6DB3",
    borderWidth: 20,
    padding: 10,
    margin: 20,
  },
  authButton: {
    backgroundColor: "#3F6DB3",
    margin: 10,
    marginTop: 30
  },
  authButtonText: {
    color: "white",
  },
  authIconStyle: {
    marginBottom: 2,
    color: "#3F6DB3",
  },
  error: {
    justifyContent: "center",
    textAlign: "center",
    color: "red"
  }
});
