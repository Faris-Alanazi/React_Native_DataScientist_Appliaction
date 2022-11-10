import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';


export default function VisitProfileInvite({ route, navigation }) {
  const { owner, visited, project } = route.params;

  const [Powner, setPowner] = useState(owner);
  const [Pvisited, setPvisited] = useState(visited);
  const [Thisproject,setThisProject] = useState(project);

  return (

    <View style={styles.backgroundimage}>
      <View style={styles.header}>

        <View style={styles.view_2}>
          <View style={styles.view_goback}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={require('./assets/GoBackArrow.png')} style={styles.gobackarrow} />
            </TouchableOpacity>
          </View>

          <View style={styles.view_4}>
            <Text style={styles.screenheader}> Profile</Text>
          </View>

          <View style={styles.view_5}>
            <Text></Text>
          </View>
        </View>
      </View>

      <View style={styles.view_5}></View>
        <View style={styles.view_profilebackground}>
        <Image style={styles.profileimage} source={{ uri:Pvisited.profile_image}}/>
            
            <View style={styles.editview}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                   //   console.log(Pvisited.profile_image)



                        navigation.navigate('Role', { user: owner, project: project, invited: visited })


                    }}>
                    <Text style={styles.btntxt}>Assign Role</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.infocard}>
            <Text style={styles.userinfoHeader}>Info</Text>
            <Text style={styles.userinfo}>Username : {visited.user_name}</Text>
            <Text style={styles.userinfo}>Email : {visited.email}</Text>
            <Text style={styles.userinfo}>Phone : 05342304928</Text>
        </View>





    </View>
  );
}

const styles = StyleSheet.create({
  changephoto: {
    textDecorationLine: 'underline',
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  }, header: {

    height: "10%", width: "100%", //borderWidth: 1,
    justifyContent: 'flex-end'
  },
  userinfo: {
    color: ALMOSTBLACK,
    textAlign: 'center',

    fontSize: 16,
    margin: 10,
  },
  userinfoHeader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },

  profileimage: {
   //opacity: 1,
    // borderRadius: '220%',
    marginTop: '15%',
   // marginBottom: '5%',
   // alignContent: 'center',
   // justifyContent: 'cetner',
   // alignItems: 'center',"50%" 
  
    height:" 50%",
    width: "55%",
   // borderWidth: 2.5,
   // borderColor: ORANGE,
  },
  gobackarrow: {
    height: 40,
    width: 40,
    margin: 5,
  },
  screenheader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  view_2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  },
  view_goback: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
    margin: 10,
  },
  view_4: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '40%',
    margin: 5,
  },
  view_5: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
    margin: 5,
  },
  view_profilebackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '40%',
    marginTop: '15%',//borderWidth:3,
  },
  editview: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '50%',
    width: '100%',
  },

  infocard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '20%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: SHADOWGREY,
    //borderRadius: '60%',
  },
  view_8: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: '10%',
    width: '50%',
    backgroundColor: BLUESH,
    height: 50,
     borderRadius: 15,
    justifyContent: 'center',
  },
  backgroundimage: {
    height: '100%',
    width: '100%',
    //justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  },
});
