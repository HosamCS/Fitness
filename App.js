
import React,{useState} from 'react';
import {SafeAreaView,StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import MapView , { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import haversine from 'haversine-distance';




const FirtLocation = { latitude: 30.367378, longitude: 30.5163834 }
const EndLocation = { latitude: 30.284204664756928, longitude: 30.41094053998792 } 
const Distance = haversine(FirtLocation, EndLocation).toFixed(0);
 const Steps = 1/2 * Distance;


export default function App (){

  const [userlocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324 ,
  });

  const [startbtn, setStartbtn] = useState('on');
  const [distance, setDistance] = useState(0);

  // const  Fristlocation = userlocation;
  // const Endlocation = userlocation;
  // console.warn(Fristlocation);
  // console.warn(Endlocation);
  // const Distance =haversine(Fristlocation, Endlocation).toFixed(0)/1000  // 13.757 (in Km)
  const EndLocation =()=>{
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {  
     setUserLocation(location) // set the state to the location
     startbtn=="off"?setStartbtn("on"):setStartbtn("off");
     
  })
  .catch(error => {
      console.warn(error.code, error.message)
  })
} 

  const StartLocation =()=>{
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {  
     
     setUserLocation(location) // set the state to the location
     startbtn =="off"?setStartbtn("on"):setStartbtn("off");
     console.warn()
  })
  .catch(error => {
      console.warn(error.code, error.message)
  })
} 
  return (
    
    <SafeAreaView style={styles.continer}>
      
      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       showsCompass={true}
      //  toolbarEnabled={false}
       scrollEnabled={true}
       region={{
         latitude: userlocation.latitude,
         longitude: userlocation.longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
   
     >
        <Marker
            coordinate={{
              latitude: userlocation.latitude,
              longitude: userlocation.longitude,
            }}             
            title='Hi'
            description='I am here'
            opacity={1}

          />

     </MapView>
     

  <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30,height:120}}>
  <View >
        <Text style={[styles.txt,{color:'#bbb',fontSize:20}]}>01:30:10⌚</Text>
        <Text style={styles.txt}>Timer</Text>
     </View>
     <View>
        <Text style={[styles.txt,{color:'#bbb',fontSize:20}]}>{Distance} m ♋</Text>
        <Text style={styles.txt}>Distance</Text>
     </View>
  </View>
      <View style={{justifyContent:'center',alignItems:'center'}}>
         <Text style={[styles.txt,{color:'#bbb',fontSize:20}]}>{Steps} 👣</Text>
         <Text style={styles.txt}>Steps</Text>
      </View>
    
    <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
      {startbtn==="on"? <TouchableOpacity style={[styles.btn,styles.activeOn]} onPress={()=>StartLocation()}>
        <Text style={styles.txt}>on</Text>
      </TouchableOpacity> : <TouchableOpacity style={[styles.btn,styles.activeOff]} onPress={()=>EndLocation()}>
        <Text style={styles.txt}>off</Text>
      </TouchableOpacity> }
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
  txt: {
    color:'#000',
    fontSize: 23,
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
  },
  map: {
    alignItems: 'center',
    width: "100%",
    height: '50%',
  
  },
  btn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeOn: {
    borderColor:'green',borderWidth:2
  },
  activeOff:{
    borderColor:'red',borderWidth:2
  }

  
});

 
