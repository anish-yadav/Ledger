import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { getImgSrc } from '../hepler/helper'
const { height, width } = Dimensions.get('screen')
export default function Transaction() {
  return (
    <View>
      <Text>Anish</Text>
    </View>
  )
}

export const TransactionCard = ({ item }) => {
  const { body, amt, debit, date, rcvr } = item
  return (
    <View style={styles.card}>
      <Image style={styles.img} source={getImgSrc(rcvr.toLowerCase())} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 120 }}>
        {/* rcvr description */}
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.primaryText}>{rcvr}</Text>
          <Text>xxxx12487</Text>
        </View>

        {/* amt description */}
        <View style={{alignItems:'flex-end'}}>
          <Text style={styles.primaryText}>{debit ? '-' : '+'} <FontAwesome style={styles.primaryText} name='inr' /> {amt}</Text>
          <Text>{date}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  img: {
    backgroundColor: '#e9edf5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    maxHeight:50,
    width:50
  },
  primaryText: {
    color: '#234F9D',
    fontSize: 16,
    fontWeight: 'bold'
  }
})