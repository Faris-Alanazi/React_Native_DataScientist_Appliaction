import * as React from 'react';
import { useEffect, useState } from 'react';
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
  TextInput,
} from 'react-native';
import { Dimensions } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { getCollectedPhotos } from '../DB-functions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function DashBoard({ route, navigation }) {
  const { user, project } = route.params;
  //console.log("from dashboard")
  // console.log(user)
  //console.log(project)


  const [userr, setUserr] = useState(user);
  const [projectData, setProject] = useState(project)

  const [startDate, setSstartDate] = useState()
  const [collectedData, setCollectedData] = useState({})
  const [isCollectedDataNotNull,setIsCollectedDataNotNull] = useState(false)
  const [isPromiseArrived,setIsPromiseArrived] = useState(false);
  const[progressInfo,setProgressInfo] = useState({Collected:"",annotated:""});
  

  useEffect(() => {
    getCollectedPhotos(projectData._id, (stat, msg, res) => {
     
      if (stat) {
        setCollectedData(res);
        setIsCollectedDataNotNull(true)
        setIsPromiseArrived(true)
        setProgressInfo({ ...progressInfo, Collected: res.length,annotated:returnTotal(res)})
        console.log(returnTotal(res))
        //console.log(res)
        //console.log("Ok here collected data ")
      } else {
        setIsPromiseArrived(true)
        console.log("No collected")
        setProgressInfo({ ...progressInfo, Collected: "Nothing has been collected" })
        //console.log(projectData)
      }
    })
  }, [])

  
  function returnTotal(arr){
    let counter = 0;
    arr.forEach(element => element.annotated?counter=counter+1:"");
    return counter;
  }


  

  const start_Date = new Date(projectData._created);

  //setSstartDate("   "+start_Date.getDate()+"/"+start_Date.getMonth()+"/"+start_Date.getFullYear()+"     "+start_Date.getHours()+":"+start_Date.getMinutes())
  const starDateTime = "   " + start_Date.getDate() + "/" + (start_Date.getMonth() + 1) + "/" + start_Date.getFullYear() + "   " + start_Date.getHours() + ":" + start_Date.getMinutes();
  var dueDate = new Date();
  dueDate.setDate(start_Date.getDate() + parseInt(projectData.project_info.time_limit))
  const DueDateTime = "   " + dueDate.getDate() + "/" + (dueDate.getMonth() + 1) + "/" + dueDate.getFullYear() + "   " + start_Date.getHours() + ":" + start_Date.getMinutes();


// this function calculates amount of days between now day to final day of project

  function calcualteTime(projectStartDate, timelimit) {

    const start_Date = new Date(projectStartDate);
    var dueDate = new Date(start_Date);

    dueDate.setDate(start_Date.getDate() + parseInt(timelimit))
    var nowD = new Date()
  
    return days(dueDate, nowD)
  }


  const days = (date_1, date_2) => {
    let difference = date_1.getTime() - date_2.getTime();
    //console.log(date_1.getTime(),date_2.getTime())
    //console.log(difference)
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  //  console.log(TotalDays)
    return TotalDays;
  }



  return (
    <View style={styles.backgroundview}>
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
            <Text style={styles.screenheader}>DashBoard</Text>
          </View>

        </View>

      </View>




      <View style={styles.bodyView}>
       
          
        <View style={{ borderWidth: 0, marginBottom: windowHeight * 0.1 }}><Text style={{ color: ORANGE, fontSize: 28 }}>{projectData.project_name}</Text></View>


        <Card style={{ padding: 10, margin: 10 }}>
          <Text style={[styles.datesTitleText, { fontSize: 18 }]}>Schedule  {"\n"}</Text>
          <Text style={styles.dateText}><Text style={styles.datesTitleText}>Start Date:</Text>{starDateTime} </Text>

          <Text style={styles.dateText}><Text style={styles.datesTitleText}>Due Date:</Text>{DueDateTime}</Text>
          <Text style={styles.dateText}><Text style={styles.datesTitleText}>Days left:  </Text>{calcualteTime(projectData._created, projectData.project_info.time_limit)}</Text>
          <Text style={styles.dateText}><Text style={styles.datesTitleText}>Days spent:  </Text>{parseInt(projectData.project_info.time_limit) - calcualteTime(projectData._created,projectData.project_info.time_limit)}</Text>

        </Card>



        <Card style={{ padding: 10, margin: 5 }}>
          <Text style={[styles.datesTitleText, { fontSize: 18 }]}>Progress  {"\n"}</Text>
          <Text style={styles.dateText}><Text style={styles.datesTitleText}>Collected :  </Text>{progressInfo.Collected}</Text>
          <Text style={styles.dateText}><Text style={styles.datesTitleText}>Annotated :  </Text>{progressInfo.annotated}</Text>
         
        </Card>

       <ScrollView style={{ paddingVertical:8,width:"100%",height:windowHeight*0.3,borderWidth:0}}contentContainerStyle={{alignItems:"center"}}>
        
        <View style={{backgroundColor:'white',width:"95%",height:windowHeight*0.1, flexDirection:'row',borderRadius:15,justifyContent:'space-evenly',alignItems:'center'}}>
        <Text style={{fontSize:16}}><Text style={{fontWeight:"600"}}>Collector:</Text> Dasf7328SS</Text>
          <Image source={{uri:"https://i.pinimg.com/564x/82/3d/89/823d89bda9bfc916b2165dc61b239d7d.jpg"}} style={{width:70,height:70}} />
        </View> 

        <View style={{backgroundColor:'white',width:"95%",height:windowHeight*0.1, flexDirection:'row',borderRadius:15,justifyContent:'space-evenly',alignItems:'center'}}>
        <Text style={{fontSize:16}}><Text style={{fontWeight:"600"}}>Collector:</Text> Dasf7328SS</Text>
          <Image source={{uri:"https://i.pinimg.com/564x/7e/f7/08/7ef7083b42c8606ebe32f5523622f475.jpg"}} style={{width:70,height:70}} />
        </View> 
       </ScrollView>
        <View>
         
        {isCollectedDataNotNull?<Image source={{uri:collectedData[0].data}}style={styles.gobackarrow} onError={(err)=>console.log("Fetching image error")} />:""}
        </View>       

        <View style={styles.Bodyfottor}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('InviteScreen', { user: userr, project: projectData, }); }}
            style={styles.btn}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: 'white' }}>Invite user</Text>
          </TouchableOpacity>


      </View>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({

  bodyView: {
    height: "90%", width: "100%",
    //borderWidth: 5, borderColor: 'yellow',
    alignItems: "center",
    justifyContent: 'center'

  },
  datesTitleText: {
    fontSize: 16, fontWeight: "600"
  }, dateText: {
    fontSize: 16, fontWeight: "normal", marginBottom: 8
  },
  Bodyfottor: {
    height: "20%", width: "100%",
    alignItems: 'center', marginBottom: "3%"
  },
  pagebody: {
    backgroundColor: 'yellow',
    height: "80%",
    // borderWidth: 3, borderColor: 'blue',
    width: "100%",
    // justifyContent:"center",
    // alignItems:"cetner"
  },
  text_error: {
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btn: {
    alignItems: 'center',
    marginTop: '5%',
    width: '60%',
    backgroundColor: BLUESH,
    height: 50,
    borderRadius: 18,
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
    borderRadius: 40,
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

  gobackarrow: {
    height: 40,
    width: 40,
    paddingRight: '20%',
  },
  view_goback: {
    //borderWidth: 2,
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
    borderRadius: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  addprojectbtn: {
    backgroundColor: BACKGROUND,
    width: '55%',
    height: '25%',
    borderRadius: '60%',
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
    //borderWidth:2,
    justifyContent: 'flex-end',
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
    borderRadius: '30%',
    //borderWidth: 1,
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
    borderRadius: '30%',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_icon: {
    height: 90,
    width: 90,
    borderRadius: '100%',
    borderWidth: 1.5,
    borderColor: ORANGE,
    margin: 10,
  },
  backgroundview: {

    height: '100%',
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  },
  actiontxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
