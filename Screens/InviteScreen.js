import * as React from 'react';
import { useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput, ToastAndroid
} from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PostInvite, isInviteSent,getDSInvites} from '../DB-functions';
const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function InviteScreen({ route, navigation }) {


  const { user, project } = route.params;
  const [searched_users, set_search_users] = useState(null);
  const [invites,setInvites] = useState({});
  const setToastMessage = message => {
    ToastAndroid.showWithGravity(
      message, ToastAndroid.SHORT, ToastAndroid.CENTER,);
  };



  return (
    <View style={styles.backgroundview}>
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
          <Text style={styles.screenheader}>Invite Page</Text>
        </View>
      </View>
      <TextInput
        style={styles.txtinput}
        onChangeText={(searching) => {
          const url =
            'https://dsms0-7e9f.restdb.io/rest/contributors?q={ "user_name": {"$regex" :"' +
            searching +
            '"}}';
          var options = {
            method: 'GET',
            headers: {
              'cache-control': 'no-cache',
              'x-apikey': 'your api key',
            },
          };

          if (searching.length != '') {
            getdata();
          } else {
            set_search_users(null);
          }

          async function getdata() {
            let res = await fetch(url, options);

            let data = await res.json();

            set_search_users(data);
          }
        }}
        placeholderTextColor="grey"
        placeholder="Search For a User . ."></TextInput>

      <FlatList
        style={styles.flatliststyle}
        data={searched_users}
        horizontal={false}
        inverted={false}
        contentContainerStyle={styles.FlatlistcontentStyle}

        renderItem={({ item }) => (
          <View style={styles.flatlistusers}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
              //  console.log("project info is --------------------------------------")
              // console.log(project)
              navigation.navigate('InviteInProfile', { owner: user, visited: item, project: project })
            }} >
              <Image style={styles.usericon} source={{ uri: item.profile_image }} />
              <Text style={styles.btntxt}>{item.user_name}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              isInviteSent(user._id, item._id,project._id, (stat, msg) => {
                console.log(project._id)
                if (stat) {
                  PostInvite(user._id, item._id,item.user_name, project._id,msg =>setToastMessage(msg))
                } else {
                  //console.log(msg);
                  setToastMessage(msg)
                }
              });
              //PostInvite(user.user_name,item.user_name, project._id) 
            }
            }>
              <Text style={{ marginLeft: 30 }}><AntDesign name="adduser" size={30} color={ORANGE} /></Text>
            </TouchableOpacity>

          </View>



        )}></FlatList>

      <TouchableOpacity style={styles.btn} onPress={()=>{
        navigation.navigate('ShwoInvitesScreen', { user: user, project: project })
      }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: 'white', alignSelf: 'center' }}>View Inviets</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    margin: '2%',
  },
  usericon: {
    height: 50,
    width: 50,
    // borderRadius: '100%',
    borderColor: ORANGE,
    marginRight: '10%',
  },

  flatlistusers: {
    backgroundColor: ALMOSTBLACK,
    flexDirection: 'row',
    width: windowWidth * 0.85,
    height: 70,
    borderWidth: 1.5,
    borderColor: 'white',
    shadowOpacity: 1,
    shadowColor: SHADOWGREY,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },

  flatliststyle: {
    height: '40%',
    backgroundColor: SHADOWGREY,
    width: '90%',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderWidth: 1.5,
    borderColor: SHADOWGREY,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
    //alignItems: 'center',
  },

  FlatlistcontentStyle: {
    alignItems: 'center',//borderWidth:3

  },
  text_error: {
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btn: {
    marginTop: '5%',
    width: '50%',
    backgroundColor: BLUESH,
    height: 50,
    borderRadius: 22,

    justifyContent: 'center',
  },
  box: {
    marginTop: 0,
    marginBottom: '5%',
    fontSize: 16,
    alignItems: 'center',
    width: '60%',
    backgroundColor: 'white',
    height: 55,
    borderRadius: 30,
    borderWidth: 1.5,
    color: ALMOSTBLACK,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
  },
  txttypesstyle: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontSize: 13,
    paddingLeft: '19%',
  },
  createprojecttxt: {
    color: ALMOSTBLACK,

    textAlign: 'center',
    fontSize: 18,
    margin: '2%',
  },
  inputsview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 2.5,
  },
  txtinput: {
    fontSize: 16,
    textAlign: 'center',
    width: '90%',
    backgroundColor: 'white',
    height: 55,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 1,
    color: ALMOSTBLACK,
    borderColor: ORANGE,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
  },
  gobackarrow: {
    height: 40,
    width: 40,
    paddingRight: '20%',
  },
  view_goback: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 0.5,
  },
  addproject: {
    width: '100%',
    height: '20%',
    backgroundColor: BACKGROUND,
    // borderRadius: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  addprojectbtn: {
    backgroundColor: BACKGROUND,
    width: '55%',
    height: '25%',
    // borderRadius: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectsinfo: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  projectsview: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameview: {
    width: '60%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernametxt: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconeditview: {
    width: '20%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    marginBottom: '5%',
  },
  screenheader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  infoview: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '15%',
    width: '90%',
    backgroundColor: 'white',
    // borderRadius: '30%',
    borderWidth: 1,
    borderColor: SHADOWGREY,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
    marginBottom: 15,
  },
  projectscards: {
    backgroundColor: ORANGE,
    width: 300,
    height: 200,
    borderWidth: 1.5,
    borderColor: SHADOWGREY,
    shadowOpacity: 1,
    shadowColor: SHADOWGREY,
    //borderRadius: '30%',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_icon: {
    height: 90,
    width: 90,
    // borderRadius: '100%',
    borderWidth: 1.5,
    borderColor: ORANGE,
    margin: 10,
  },
  backgroundview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
    paddingBottom: '25%',
  },
  actiontxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
