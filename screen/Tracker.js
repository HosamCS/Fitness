
import React,{useEffect, useState,useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform, PermissionsAndroid,CheckBox } from 'react-native';
import MapView , { Marker, PROVIDER_GOOGLE ,Polyline,AnimatedRegion } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import haversine from 'haversine-distance';
import darkmapStyle from '../custommap';
import lightmapStyle from '../lightmapstyle';


export default function Tracker({navigation}) {
  
    const [dark, setDark] = useState('light');
    const [location, setLocation] = useState({
      latitude: 0,
      longitude: 0,
    });
    const [routeCoordinates, setRouteCoordinates] = useState([]); // array of coordinates for the route polyline 
    const [prevlatlang, setPrevlatlang] = useState({});
    const [value, setValue] = useState('');
    const [distanceTravelled, setDistanceTravelled] = useState(0);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState('first');
    const watchID = useRef(null)
  
    const clearWatch = () => {
      if (watchID.current) {
        Geolocation.clearWatch(watchID.current);
        console.warn('watch cleared');
        setStep(0);
        setDistanceTravelled(0);
      }
     else {
       console.warn('watch not cleared');
     }
    } 
    const calcDistance = newLatLng => {
      if (prevlatlang === undefined) {
       return 0;
      }
      else {  
        const dis = haversine(prevlatlang, newLatLng).toFixed(2);
        return dis;
      }
    };
    // const countersteps =() =>{
    //   let s =0 ;
    //   setStep(()=>step+1);
    //   console.warn('step',step);
    //   return step;
    // }
    const watch = () => { //listener to location
       setLoading(true)
       console.warn('watch');
      watchID.current = Geolocation.watchPosition(
         (location) => {
           const { latitude, longitude } = location.coords;
          setLocation({
            latitude,
            longitude,
          });
          
          setLoading(false);
          setStep((prevStep) => prevStep + 1);
  
  
          setRouteCoordinates(routeCoordinates.concat([latitude, longitude]));
          setPrevlatlang({ latitude:latitude, longitude:longitude });
          setDistanceTravelled( calcDistance({ latitude:latitude, longitude:longitude }));   
          
          // console.warn(routeCoordinates); // [30.367378, 30.5163834 ...]
          //  console.warn( distanceTravelled); // distance in km
          // console.warn(prevlatlang); // { latitude: 37.4219983, longitude: -122.084 }
          // console.warn(step); // step
        },
        (error) => {
          console.error(error);
        },
        {enableHighAccuracy : true, distanceFilter: 1 , timeout:20000, maximumAge:1000},
      )
  
    }
   
      useEffect (() => {
        if (Platform.OS === 'android'){
          PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
         } 
          watch();
          console.warn(step);
        },[]);
  
    return (
      <>
      <View style={styles.continer}>
         <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={dark ==='dark' ? darkmapStyle : lightmapStyle }
            zoomControlEnabled = {true}
            showsUserLocation
            zoomEnabled = {true}
            userLocationPriority='high'
            followsUserLocation
            loadingEnabled
            mapType={'standard'}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
              {/* <Polyline  strokeWidth={2} /> */}
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
              }}/>
              
          </MapView>
        </View> 
  
         {/* Button_Dark_Mode */}
        <View style={[styles.buttonContainer,{backgroundColor:dark ==='light'?'#bbbb':'#000'}]}>
            <TouchableOpacity
              onPress={() => setDark(dark === 'light' ? 'dark' : 'light')}
              >
              {dark === 'light' ?<Text style={{color:'#fff',fontSize:23}}>🌞</Text> 
              :<Text style={{color:'#fff',fontSize:23}}>🌙</Text>} 
            </TouchableOpacity>
          </View>
  
       <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',height:70,}}>
          <View style={[styles.btn,{borderColor:'#1BD644FF',borderWidth:3, }]}>
          <Text style={[styles.txt,{color:'#696969FF',fontSize:15}]}>00:01:10</Text>
          <Text style={styles.txt}>Timer</Text>
       </View>
       <View style={[styles.btn,{borderColor :'#3C43E9FF',borderWidth:3}]}>
           <Text style={[styles.txt,{color:'#696969FF',fontSize:18}]}> {step}👣</Text>
           <Text style={[styles.txt,{color:'#3C43E9FF'}]}>Steps</Text>
        </View>
       <View style={[styles.btn,{borderColor :'#DBA727FF',borderWidth:3}]}>
          <Text style={[styles.txt,{color:'#696969FF',fontSize:18}]}>{distanceTravelled} m</Text>
          <Text style={[styles.txt,{color:'#DBA727FF'}]}>Distance</Text>
       </View>
     </View>
       
      
      
      <View style={{justifyContent:'center',alignItems:'center',marginTop:30,flexDirection:'row' ,}}>
      <TouchableOpacity style={[styles.btn,styles.activeOn]} onPress={()=>watch()}>
          <Text style={styles.txt}>on</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn,styles.activeOff]} onPress={()=>clearWatch()}>
          <Text style={styles.txt}>off</Text>
        </TouchableOpacity>
      </View>
       <View style={{justifyContent:'center',alignItems:'center',marginTop:50 ,flexDirection:'row',}}>
          <Text style={{color:'#000'}}>curr: {location.latitude}|{location.longitude}))</Text>
          <Text style={{color:'#000'}}> ((prev : {prevlatlang.latitude}|{prevlatlang.longitude}</Text>
        </View>
        <TouchableOpacity onPress={() =>navigation.navigate('user')} style={{justifyContent:'center',
            alignItems:'center',alignSelf:'center' ,width:250 ,height:50,backgroundColor:'red',borderRadius:25}} >
            <Text>UserInfo</Text>
         </TouchableOpacity>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    continer: {
  
      height: '50%',
      
    },
    txt: {
      color:'#7BC138',
      fontSize: 20,
      fontFamily: 'Times',
      fontWeight: 'bold',
    },
    map: {
      flex :1
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
    },
    buttonContainer:{
      height: 40,
      borderRadius: 20,
      width: 40,
      alignItems: "center",
      justifyContent: "center",
      bottom:20,
      alignSelf: "center",
    },
    
  });
  

 
