import React,{useState} from 'react';
import { Text, TouchableOpacity, View ,StyleSheet,TextInput} from 'react-native';
import { RadioButton,  } from 'react-native-paper';

const user = ({navigation}) => {
     const [checked, setChecked] = useState('Male');
     const [Weight ,setWeight] =useState(0);
     const [Age ,setAge]=useState(0);
     const [height ,setHeight]=useState(0)

     const caloriecalculator=()=>{
        
       if (checked == 'Male' && Weight && Age && height){
         const result = 9.99 * Weight + 6.25 * height - 4.92 * Age + 5
         return result.toFixed(0)
       }
       else if(checked == 'Famale' && Weight && Age && height){
        const result = 9.99 * Weight + 6.25 * height - 4.92 * Age -161
        return result.toFixed(0)
       }
     }
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <View style={{flexDirection:'column' ,justifyContent:'space-between',alignItems:'center',width:'90%',}}>
        
          
        <View style={styles.viewRadiobtn}>
            
            <RadioButton
                value="Male"
                status={ checked === 'Male' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('Male')}
            />
            <Text style={{marginRight:20}}>Male</Text>
          
            <Text style={{marginRight:5}}>Famale</Text>
            <RadioButton
                value="Famale"
                status={ checked === 'Famale' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('Famale')}
            />
             
        </View>
        <Text style={{fontSize:23,marginTop:10}}>Weight (Kg)</Text>
        <TextInput
            style={styles.input}
            placeholder=" Y O U R  W E I G H T"
            onChangeText={(value) => setWeight(value)}
            value={Weight}
            keyboardType="numeric"
            maxLength={3}
        />
         <Text style={{fontSize:23,marginTop:10}}>Age</Text>
        <TextInput
            style={styles.input}
            placeholder=" Y O U R  A G E"
            onChangeText={(value) => setAge(value)}
            value={Age}
            keyboardType='number-pad'
            maxLength={2}
        />
             <Text style={{fontSize:23,marginTop:10}}>Height(cm)</Text>
        <TextInput
            style={styles.input}
            placeholder=" Y O U R  H E I G H T"
            onChangeText={(value) => setHeight(value)}
            value={height}
            keyboardType="numeric"
            maxLength={3}
        />
        <TouchableOpacity style={styles.btn} activeOpacity={1}>
            <Text style={{fontSize:18,color:'#fff'}}>CalorieCalC</Text>
        </TouchableOpacity>
        <Text style={{fontSize:20,marginTop:10,color:'#0D8F95FF'}}>Calories🔥Burned : {caloriecalculator()} Kcal/day</Text>
        <Text style={{textAlign:'center',fontWeight:'bold',color:'#7F11CCFF',fontSize:18}}>Based on the Mifflin St. Jeor Method</Text>
        </View>
       
         <TouchableOpacity onPress={() =>navigation.navigate('Tracker')} style={{justifyContent:'center',
            alignItems:'center', width:250 ,height:50,backgroundColor:'#0D8F95FF',borderRadius:25}} >
            <Text style={{fontSize:18,color:'#fff'}}>GoTracker</Text>
         </TouchableOpacity>
    </View>
    );
    
    };

const styles = StyleSheet.create({
viewRadiobtn:{
    flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:250,
    
},
input:{
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
},
btn:{
    justifyContent:'center',
    alignItems:'center',
    width:250 ,
    height:50,
    backgroundColor:'#7F11CCFF',
    borderRadius:25,
    marginTop:20,

}
})

export default user;
