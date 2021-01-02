import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, Image, TouchableHighlight, Linking } from 'react-native';


export default function App() {
  const [fact, setFact] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [loding, setLoding] = useState(true);

  const getData = ()=>{
   fetch('https://api.thecatapi.com/v1/images/search') 
    .then(response => response.json())
    .then(data => {
      setImgUrl(data[0].url);
    }) 
   fetch('https://catfact.ninja/fact?max_length=140') 
    .then(response => response.json())
    .then(data => {
      setFact(data)
      setLoding(false)
    }) 
  }

  useEffect(()=>{
    getData();
  },[])

  const handleNewFact = () =>{
    getData();
  }


  if(loding){
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Welcome To Cat Facts</Text>
      	<ActivityIndicator size="large" color="#00ff00" />
      </View>)
  }

  return (
    <View style={styles.container}>
     <Image style={styles.img} source={{uri:imgUrl}} />
      <Text style={styles.text}>{fact.fact}</Text>
      <TouchableHighlight
       activeOpacity={0.6}
       underlayColor="#DDDDDD"
       onPress={ ()=>{ Linking.openURL('https://github.com/msebass1')}}>
      	<Text style={styles.subtext}>Created by msebass1</Text>
      </TouchableHighlight>
      <Button 
        onPress={handleNewFact}
  	title="New cat fact"
    />
    </View>
  );
}

const styles = StyleSheet.create({
  btn:{
    width:200,
    height:80,
  },
  img:{
    width:400,
    height:500,
  },
  subText:{
    color: '#ccc',
    fontSize: 22,
    padding: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title : {
    padding: 30,
    fontSize: 22,
  },
  text : {
    padding: 30,
    fontSize: 22,
  },
  container: {
    flex: 1,
    paddingTop:22,
    //flexDirection:'row',//column
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around', 
  },
});
