import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,FlatList
} from 'react-native';
import { Dimensions } from 'react-native';

import {isUsernameORemail,isNotEmptyOrSpaces} from '../Function/Validation';
import {getLoginStatus,loginUser,autoLogeIn,getUserData,logoutUser} from '../Function/handlers';

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginScreen({ navigation }) {
  const [user_name, set_user_name] = useState(null);
  const [password, set_password] = useState(null);
  const [error, set_error] = useState(null);
  const empty=null;
  
  useEffect(()=>{
    //content of account is static Change that later 
    
    autoLogeIn(response)
    function response(stst,email){
      if(stst){
        console.log("Signed in")
       getUserData(email,navigation,function (s,n){},"email")
      
      }else{
        console.log("Signed out")
      }

    }
    
   
  },[]);
  
  return (
   
      <View styles={styles.mainview}>
      
           <View style={styles.backgroundimage}>

           <Image
            style={styles.mainicon}
            source={require('./assets/back_ground_icon.png')}
          />
       
          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Your email or username"
            value={user_name}
            onChangeText={(text)=>{
              const user_name = text.replace(/\s/g, '');
              set_user_name(user_name)}}>

              </TextInput>

          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Your password"
            value={password}
            onChangeText={(text)=>{
              const password = text.replace(/\s/g, '');
              set_password(password)}}
            secureTextEntry={true}></TextInput>

          <View>
            <Text style={styles.text_error}>{error}</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {

              loginUser(user_name,password,navigation,ResponseFun);
              function ResponseFun(stat,msg){
                console.log(msg);
                set_error((stat? "":msg))
              }
             
            }}>
            <Text style={styles.btntxt}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            
            }}>
            <Text style={styles.singup_btn}> Don't have account?</Text>
          </TouchableOpacity>

          
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  
  singup_btn: {
    textDecorationLine: 'underline',
    marginTop: '5.5%',
    color: ORANGE,
    shadowOpacity: 0.5,
    shadowOffset: 1,
    shadowColor: SHADOWGREY,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: '30%',
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text_error: {
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  mainview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundimage: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND,
  },
    txtinput: {
    marginTop: 0,
    marginBottom: '5%',
    fontSize: 16,
    textAlign: 'center',
    width: '90%',
    backgroundColor: 'white',
    height: 55,
    borderRadius: 15,
    borderWidth: 1.5,
    color: ALMOSTBLACK,
    borderColor: SHADOWGREY,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
  },
  btn: {
    marginTop: '5%',
    width: '70%',
    backgroundColor: BLUESH,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
  mainicon: {
    height: 250,
    width: '100%',
    margin: '10%',

    shadowOpacity: 0.2,
    shadowColor: ORANGE,
  },
});
