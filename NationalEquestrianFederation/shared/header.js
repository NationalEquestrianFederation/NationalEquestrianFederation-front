import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ title, navigation }) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <View>
        <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} color='#9c9998' />
        <View style={styles.headerTitle}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#9c9998',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
  },
  headerTitle: {
    flexDirection: 'row',
    marginLeft: 35
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10
  },
});