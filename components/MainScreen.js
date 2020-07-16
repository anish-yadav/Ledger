import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, PermissionsAndroid, FlatList, SafeAreaView, Dimensions, Image } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SmsAndroid from 'react-native-get-sms-android'
import { TransactionCard } from './Transaction'
import { getCreditCardMsg } from '../hepler/helper'

const {height, width} = Dimensions.get('screen')
export default function MainScreen() {
  let monthData = [{
    label:'Jan',
    value:0
  },
  {
    label:'Feb',
    value:1
  },
  {
    label:'Mar',
    value:2
  },
  {
    label:'Apr',
    value:3
  },
  {
    label:'May',
    value:4
  },
  {
    label:'Jun',
    value:5
  },
  {
    label:'July',
    value:6
  },
  {
    label:'Aug',
    value:7
  },
  {
    label:'Sep',
    value:8
  },
  {
    label:'Oct',
    value:9
  },
  {
    label:'Nov',
    value:10
  },
  {
    label:'Dev',
    value:11
  }]
  
  const [messages,setMessages] = useState([]) 
  const [ month, setMonth ] = useState(new Date().getMonth())
  const [ total,setTotal ] = useState(0)
 
  const requestSMSRead = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          'title': 'Cool App ...',
          'message': 'App needs access to sms'
        }
      );

      if(granted == PermissionsAndroid.RESULTS.GRANTED){
        console.log(month-1,' to ', month)
        var fromDate = new Date('2020',(month).toString(),'01').getTime()
        var toDate = new Date('2020',(month+1).toString(),'01').getTime()
        var filter = {
          box: 'inbox',
          minDate: fromDate, // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
          maxDate: toDate, // timestamp (in milliseconds since UNIX epoch)
          indexFrom: 0, // start from index 0
          maxCount: 1000, // count of SMS to return each time
        };
    
        SmsAndroid.list(
          JSON.stringify(filter),
          (fail) => {
            console.log('Failed with this error: ' + fail);
          },
          (count, smsList) => {
            var arr = JSON.parse(smsList)
            console.log('Starting')
            // arr.forEach(sms => {
            //   if(sms.address.match('PNBSMS')){
            //     var db = sms.body.match(pattern.debit)
            //     db = sms.body.match(pattern.rcvr)
            //     var debit = pattern.debit.exec(sms.body)
            //     var credit = pattern.credit.exec(sms.body)
            //     var rcvr = pattern.rcvr.exec(sms.body)
            //     if(debit)
            //       pnbSMS.push({ body: sms.body, debit: true, amt: debit[2], date: debit[4],rcvr:rcvr? rcvr[2]: 'Unknown', key: k})
            //     else if(credit)
            //       pnbSMS.push({body: sms.body, debit: false, amt: credit[2], date: credit[4],rcvr:rcvr? rcvr[2]: 'Unknown', key: k})
            //     k = k+1
            //   }
            // });
            var msgs = getCreditCardMsg(arr)
            setMessages(msgs)
            var sum = 0
            msgs.forEach(msg => {
              sum = sum + parseFloat(msg.amt)
            })
            setTotal(sum)
          },
        )
      }
    }
    catch (err) {
      //Handle this error
      return false;
    }
  }

  useEffect(() => {
    console.log('requestinf')
  requestSMSRead()
  },[month])

    return (
      <View style={styles.container}>
        <View style={[styles.topContainer,{flexDirection:'row'}]}>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}><FontAwesome style={styles.stats} name='inr' /> {total}</Text>
          <Text style={{color:'white'}}>Total spent</Text>
        </View>
        </View>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',paddingHorizontal:20}}>
          <Text style={{color:'#234F9D', marginRight:20}}>Month</Text>
        <DropDownPicker
          items={monthData}
          defaultValue={month}
          containerStyle={{height: 40,width:80}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item =>setMonth(item.value)}
        />
        </View>
        
        <SafeAreaView>
          <FlatList data={messages} style={{maxHeight:height-280}} key={item => item.key.toString()} 
            renderItem={({item}) => (
              <TransactionCard item={item} />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Image style={styles.emptyImage} source={require('../assets/cards.png')} />
                <Text style={[styles.primaryText]}>No transactions yet</Text>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#e9edf5'
    },
    statsContainer:{
      backgroundColor:'#234F9D',
      paddingVertical:50
    },
    topContainer:{
      backgroundColor:'#234F9D',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:30,
    },
    stats:{
      color:'#fff',
      fontSize:24,
      fontWeight:'bold'
    },
    emptyContainer:{
      justifyContent:'center',
      alignItems:'center',
      height: height/2
    },
    emptyImage:{
      width:268,
      height: 198
    },
    primaryText: {
      color: '#234F9D',
      fontSize: 18,
    }
  })

  