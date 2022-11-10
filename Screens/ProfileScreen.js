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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logoutUser} from '../Function/handlers'
import * as ImagePicker from 'expo-image-picker';

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function ProfileScreen({ route, navigation }) {
  const { user } = route.params;

  const [profileimg, setprofileimg] = useState(user.profile_image);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    const url =
      'https://dsms0-7e9f.restdb.io/rest/data-scientist/' + user._id;

    var options = {
      method: 'PATCH',
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': 'your api key',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        profile_image: pickerResult.uri,
      }),
      json: true,
    };

    async function upload_photo() {
      const data = await fetch(url, options);
      const res = await data.json();

      if (data.ok) {
        setprofileimg(pickerResult.uri);
      }
    }
    upload_photo();
  };
  return (
    <View style={styles.backgroundimage}>
      <View style={styles.headerview}>
        <View style={styles.view_goback}>
          <View style={{ width: '20%' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('./assets/GoBackArrow.png')}
                style={styles.gobackarrow}
              />
            </TouchableOpacity>
          </View>

          <View style={{ width: '50%', marginRight: '20%' }}>
            <Text style={styles.screenheader}>Profile</Text>
          </View>
          <Text><TouchableOpacity
          onPress={()=>{
            logoutUser(navigation)
          }}
          ><AntDesign name="logout" size={30} color={"#cc0000"} /></TouchableOpacity></Text>


        </View>

      </View>












      <View style={styles.body}>

        <View style={styles.view_profilebackground}>
          <Image style={styles.profileimage} source={{ uri: profileimg }} />


        </View>

        <TouchableOpacity onPress={() => { openImagePickerAsync(); }}>
          <Text style={styles.changephoto}>Edit</Text>
        </TouchableOpacity>

        <View style={styles.infocard}>
          <Text style={styles.userinfo}><Text style={{fontWeight:"600"}}>Username : </Text>{user.user_name}</Text>
          <Text style={styles.userinfo}><Text style={{fontWeight:"600"}}>Email : </Text>{user.email}</Text>
          <Text style={styles.userinfo}><Text style={{fontWeight:"600"}}>Projects :  </Text></Text>

        </View>

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
    fontSize: 18,
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
  }, body: {
    width: "100%", height: "90%", alignItems: "center"

  },

  profileimage: {
    opacity: 1,
    borderRadius: 170,
    // marginTop: '15%',
    // marginBottom: '5%',
    alignContent: 'center',
    //justifyContent: 'cetner',
    alignItems: 'center',
    height: '75%',
    width: '60%',
    borderWidth: 2,
    borderColor: ORANGE,
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
  header: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: BACKGROUND,
    borderWidth: 1, width: "100%", height: "12%", justifyContent: 'center'
  },
  view_goback: {
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '15%',
    //margin: 10,
    borderWidth: 1, alignSelf: 'flex-end'
  },
  view_4: {
    // justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%',
    margin: 5, borderWidth: 1
  },
  view_5: {
    //  justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
    margin: 5,
  },
  view_profilebackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '40%',
    marginTop: '15%', //borderWidth: 1
  },
  editview: {
    //  justifyContent: 'flex-start',
    alignItems: 'center',
    height: '50%',
    width: '100%', borderWidth: 1, borderColor: 'blue'
  },

  infocard: {
     justifyContent: 'center',
    alignItems: 'flex-end',
    width: '90%',
    height: '20%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: SHADOWGREY, marginTop: "10%"
    // borderRadius: '60%',
  },
  view_8: {
    height: '20%',
    // justifyContent: 'center',
    alignItems: 'center',
  },

  mainview: {
    height: '100%',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundimage: {
    height: '100%',
    width: '100%',
    //  justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  }, headerview: {
    //borderWidth:2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    marginBottom: '5%',
  }, view_goback: {
    //borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 0.5,
  }, gobackarrow: {
    height: 40,
    width: 40,
    paddingRight: '20%',
  },
});
