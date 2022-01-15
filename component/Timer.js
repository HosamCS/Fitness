import  React from 'react';
import { Text, View, StyleSheet ,Button ,TouchableOpacity } from 'react-native';
import { useStopwatch } from 'react-timer-hook';

const MyStopwatch=()=> {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

return (
    <View>
      <View>
        <Text style={{textAlign:'center',fontSize:30}}>{hours}:{minutes}:{seconds}</Text>
      </View>
      <Text style={{textAlign:'center'}}>{isRunning ? 'Running' : 'Not running'}</Text>
      <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',marginTop:25}}>
      
          <TouchableOpacity onPress={start}>
            <Text>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pause}>
            <Text>pause</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={reset}>
            <Text>reset</Text>
          </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
 
});
