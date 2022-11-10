import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../Firebase-config/firebase-config';
import {createUserWithEmailAndPassword } from "firebase/auth"; 
import {isValidUserName,isValidPasswd,isValidEmail,isUsernameUsed} from '../Function/Validation';
import {handleSighnup,HandelSubmitData} from '../Function/handlers';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';









const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

const IMAGE =
  'https://secure.gravatar.com/avatar/5f1f3c5353f19cf8e59de4e48c291a80?d=https:%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png';









export default function RegisterScreen({ navigation, route }) {
  const types = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const [user_name, set_user_name] = useState("");
  const [password, set_password] = useState("");
  const [email, set_email] = useState("");
  const [sex, setsex] = useState(null);


  const [user_name_error, set_user_name_error] = useState(null); //for Setting error msgs
  const [password_error, set_password_error] = useState(null);
  const [email_error, set_email_error] = useState(null);
  const [error, set_error] = useState(null);

  const [vaild_user_name, set_vaild_user_name] = useState(false); //for valaditon
  const [vaild_password, set_vaild_password] = useState(false);
  const [vaild_email, set_vaild_email] = useState(false);

  


  return (
   
      <View styles={styles.mainview}>
      
        <View style={styles.backgroundimage}>

          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Your username"
            value={user_name}
            onChangeText={(text) => {
              const user_name = text.replace(/\s/g, '');
             
               set_user_name(user_name);
                if(isValidUserName(user_name)){
                //set_user_name(user_name);
                set_user_name_error(null);
                set_error(null);
                set_vaild_user_name(true);
              }
               else {
                set_user_name_error(
                  "User Name Should be \n 1 - Between 6 - 14 Charachters \n 2 - Shouldn't have empty spaces \n 3 - Shouldn't end with a Specia Charachter "
                );
              }
            }}></TextInput>



          <View>
            <Text style={styles.text_error}>{user_name_error}</Text>
          </View>

          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Your password"
            value={password}
            onChangeText={(text) => {
              const password = text.replace(/\s/g, '');
              set_password(password);
              if (isValidPasswd(password)) {
               
                set_password_error(null);
                set_error(null);
                set_vaild_password(true);
              } else {
                set_password_error(
                  "Password Should be \n 1 - Between 8 - 20 Charachters \n 2 - Shouldn't have empty spaces \n 3 - Shouldn't end with a Specia Charachter "
                );
              }
            }}

            secureTextEntry={true}></TextInput>

          <View>
            <Text style={styles.text_error}>{password_error}</Text>
          </View>

          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder="Your email"
         
            onChangeText={(text) => {
          
              const email = (text.replace(/\s/g, '').toLowerCase());
          
              set_email(email);
             
              console.log(email +"   "+email.length);

              if (isValidEmail(email)) {
                set_email_error(null);
                set_error(null);
                set_vaild_email(true);
              } else {
                set_email_error('Please enter a vaild Email');
              }
            }}
            keyboardType="email-address"></TextInput>
          <View>
            <Text style={styles.text_error}>{email_error}</Text>
          </View>

          <View style={styles.gender_view}>
            <RadioButtonRN
             // animationTypes={['pulse', 'shake']}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60%'
              }}
             
              box={true}
              activeColor={ORANGE}
              deactiveColor={SHADOWGREY}
              boxStyle={styles.box}
              data={types}
              textStyle={styles.txttypesstyle}
              selectedBtn={(type) => {
                setsex(type.value);
              }}
              //icon={<Icon name="check-circle" size={20} color={ORANGE} />}
            />
          </View>
          <View>
          <Text style={styles.text_error}>{error}</Text>
</View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {                       
              
              HandelSubmitData(user_name,email,password,sex,IMAGE,navigation,givenErrorMsg);
              
              function givenErrorMsg(status,errorMsg){
                if(status){console.log("ok")}
                else{

                
                set_error(errorMsg.error)
                set_user_name_error((errorMsg.usernameError[0]?errorMsg.usernameError[1]:user_name_error))
                set_email_error((errorMsg.emailError[0]?errorMsg.emailError[1]:email_error));
               
              }
                

                 console.log(errorMsg.error)}   

            }

            }>
            <Text style={styles.btntxt}>Create an Account</Text>
          </TouchableOpacity>
        </View>
       
      </View>
    
  );
}
const styles = StyleSheet.create({
  txttypesstyle: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontSize: 14,fontWeight:"600",
   // paddingLeft: '19%',
    marginHorizontal:8
  }, 
  box: {
   // marginTop: 0,
   // marginBottom: '5%',
  // marginHorizontal:5,
    fontSize: 16,
    alignItems: 'center',
    width: '60%',
   // backgroundColor: 'white',
   backgroundColor:BACKGROUND,
    height: 55,
    //borderRadius: 40,
    borderWidth: 0,
    color: ALMOSTBLACK,
    
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
  },
  gender_view: {
    flexDirection: 'row',width:"90%",
    justifyContent: 'space-evenly',//borderWidth:1,

    margin: 5,
    alignItems: 'center',
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
  //  fontWeight: 'bold',
    fontSize: 18,
  },
  text_error: {
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom:"3%"
  },
  mainview: {
    height: '100%',
    width: '100%',
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
    borderRadius:15,
    borderWidth: 1.5,
    color: ALMOSTBLACK,
    borderColor: SHADOWGREY,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
  },
  btn: {
    marginTop: '10%',
    width: '70%',
    backgroundColor: BLUESH,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
});
