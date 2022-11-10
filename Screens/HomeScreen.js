import * as React from 'react';
import { useEffect, useState } from 'react';
//import ImagePicker from 'react-native-image-picker';
import ProjectsFlatList from '../components/FlatList';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';
const LIGHTBLUE = '#A8CFFF';

export default function HomeScreen({ route, navigation }) {
  
  const { user } = route.params;
  const [projects, setprojects] = useState(null);
  const [userr, setuser] = useState(user);
  useEffect(() => {
    const urlinfo =
      'https://dsms0-7e9f.restdb.io/rest/data-scientist?q={"user_name":"' +
      userr.user_name +
      '"}';

    const urlprojects =
      'https://dsms0-7e9f.restdb.io/rest/data-scientist-projects?q={"project_owner":"' +
      userr.user_name +
      '"}';
    var options = {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': 'your api key',
      },
    };

    getinfo();
    getprojects();

    async function getinfo() {
      let response = await fetch(urlinfo, options);
      let res = await response.json();
      setuser(res[0]);
    }
    async function getprojects() {
      let response = await fetch(urlprojects, options);
      let res = await response.json();
      setprojects(res);
     // console.log(res);
    }
  }, [userr, setuser]);

  return (
    <View style={styles.backgroundview}>
      <View style={styles.headerview}>
        <Text style={styles.screenheader}>Home Page</Text>
      </View>
      <View style={styles.infoview}>
        <View style={styles.iconeditview}>
          <Image
            style={styles.profile_icon}
            source={{ uri: userr.profile_image }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', { user: userr });
            }}>
            <Text style={styles.changephoto}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.usernameview}>
          <Text style={styles.usernametxt}>Name : {userr.user_name}</Text>
        </View>
      </View>
      <View style={styles.projectsview}>
        <Text style={styles.screenheader}>Projects</Text>
        
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={projects}
          style={styles.flatliststyle}
          horizontal={false}
          inverted={false}

          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.flatlistusers}
              onPress={() => {
                navigation.navigate('DashBoard', {
                  user: userr,
                  project: item,
                });
              }}>
              <Text style={styles.projectsinfo}>
                Project Name : {item.project_name}
              </Text>
              <Text style={styles.projectsinfo}>
                Project Budget : {item.project_info.project_budget}
              </Text>
              <Text style={styles.projectsinfo}>
                Project Type : {item.project_info.project_type}
              </Text>
            </TouchableOpacity>
          )}></FlatList>
     
        <View style={styles.addproject}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateProject', { user: userr });
            }}
            style={styles.addprojectbtn}>
            <Text style={styles.changephoto}>Create Project</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  addproject: {
    width: '100%',
    height: '20%',
    backgroundColor:BACKGROUND
    , justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  addprojectbtn: {
    backgroundColor: ALMOSTBLACK,
    width: '55%',
    height: '27%',
    borderRadius: 30,
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
    alignItems: 'center', borderWidth: 0,
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: SHADOWGREY,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
    marginBottom: 15,
  },
  flatliststyle: {
    height: '60%',
    backgroundColor: BACKGROUND,
    width: '100%', 

    //alignItems: 'center',
  },
  flatlistusers: {
    backgroundColor: LIGHTBLUE,
    borderWidth: 2.5,
    borderColor: SHADOWGREY,

    width: "100%",
    height: 370,
    shadowOpacity: 0.25,
    shadowColor: SHADOWGREY,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
    margin: '10%',
  },
  projectscards: {
    backgroundColor: ORANGE,
    width: '50%',
    height: '80%',
    borderWidth: 1.5,
    borderColor: SHADOWGREY,
    shadowOpacity: 1,
    shadowColor: SHADOWGREY,
    borderRadius: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_icon: {
    height: 90,
    width: 90,
    //borderRadius: '100%', //  ---- invalid 
    borderWidth: 1.5,
    borderColor: ORANGE,
    margin: 10,
  },
  backgroundview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  },
  changephoto: {
    textDecorationLine: 'underline',
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});