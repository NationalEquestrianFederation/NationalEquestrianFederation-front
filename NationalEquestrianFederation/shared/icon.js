import { StyleSheet, View } from "react-native";

export default function Icon(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
      borderRadius: 6,
      elevation: 3,
      backgroundColor: '#fff',
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 12.5,
      marginVertical: 10,
      width: '80%',
      alignSelf: 'flex-start',
      opacity: 0.8
    },
    cardContent: {
      marginHorizontal: 8,
      marginVertical: 10,
      alignSelf: 'center'
    }
  });