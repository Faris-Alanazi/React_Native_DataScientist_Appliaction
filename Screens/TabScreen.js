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
    StatusBar, FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectsFlatList from '../components/FlatList';
import ProfileScreen from './ProfileScreen';
const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';
const LIGHTBLUE = '#A8CFFF';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Tab = createBottomTabNavigator();


export default function TabScreen({ route, navigation }) {
    const { user } = route.params;
    const [projects, setprojects] = useState(null);
    const [userr,setUser]=useState(user)
    
    return (

        <SafeAreaView style={{ width: "100%", height: windowHeight + 15 }} >

            <Tab.Navigator screenOptions={{
                tabBarStyle: {
                    width: windowWidth - 120, alignSelf: "center", borderRadius:15
                },
                tabBarItemStyle: {
                    margin: 5,
                    borderRadius: 10,
                },tabBarShowLabel:false
            }}>


                <Tab.Screen name="Home" component={HomeTab}
                    initialParams={{ user: userr }}
                    options={{
                        headerShown: false,title:""
                        ,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={size+13} />
                        ),
                    }} />

                <Tab.Screen name="Account" component={ProfileScreen}
                initialParams={{user:userr}}
                    options={{

                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size+18} />
                        )
                    }} />

            </Tab.Navigator>
        </SafeAreaView>

    )
}


const HomeTab = ({ route, navigation }) => {
    const { user } = route.params;
    const [userr, setuser] = useState(user);
    const [projects, setprojects] = useState(null);
    const [emptProjectyMsg, setEmptProjectyMsg] = useState("")
    const [emptyClicableMsg , setEmptyClicableMsg] = useState("");

    setTimeout(()=>{
        setEmptyClicableMsg("add new Project")
        setEmptProjectyMsg("You have no projects")
    },5000)


    useEffect(() => {
        const urlinfo =
            'https://dsms0-7e9f.restdb.io/rest/data-scientist?q={"user_name":"' +
            userr.user_name +
            '"}';

        const urlprojects =
            'https://dsms0-7e9f.restdb.io/rest/data-scientist-projects?q={"project_owner":"' +
            userr.user_name +
            '"}&metafields=true';
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
           // console.log("from get info",res[0])
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


            <View style={styles.projectsview}>

                <Text style={styles.screenheader}>Projects</Text>
           
           <ProjectsFlatList onHeaderbtnPress={
                    () => { navigation.navigate('CreateProject', { user: userr }) }}
                    navigation={navigation}
                    ProjectStyle={styles.projectsinfo}
                    data={projects}
                    onEmptyClicableMsg={emptyClicableMsg}
                    onEmptyMsg={emptProjectyMsg}
                    userInfo={userr}></ProjectsFlatList>
            
       


            </View>
        </View>
    )
}

const ChatFun = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 28 }}>User Account </Text>
        </View>
    )
}















const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 15,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },

    addproject: {
        width: '100%',
        height: '10%',
        backgroundColor: BACKGROUND
        , justifyContent: 'center',
        alignItems: 'center', opacity: 0.1
        //marginBottom: '10%',
    },
    addprojectbtn: {
        backgroundColor: ALMOSTBLACK,
        width: '55%',
        height: '50%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    projectsinfo: {
        color: ALMOSTBLACK,
        textAlign: 'center',
        fontSize: 18,
        // fontWeight: 'bold',
    },

    projectsview: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center', borderWidth: 0, backgroundColor: BACKGROUND
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
        fontSize: 24, marginTop: "15%",
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