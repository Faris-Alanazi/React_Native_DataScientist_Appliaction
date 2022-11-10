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
import { getDSInvites, cancelInvite, getNameofInvitees } from '../DB-functions'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AntIcon from "react-native-vector-icons/AntDesign";

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function ShowInvitesScreen({ route, navigation }) {

    const { user, project } = route.params;

    const [userr, setUserr] = useState(user);
    const [projectData, setProject] = useState(project)
    const [Invites, setInvites] = useState({ key: true })
    const [whileProcessingMsg, setWhileProcessingMsg] = useState("")
    const [messgae,setMessage] = useState("")
    //console.log(user)

    useEffect(() => {
        //user._id,project._id
       // console.log(userr)
         getDSInvites(userr._id,project._id,(stat, res, msg) => {

            if (stat) {

                setInvites(res);


            } else {
                setMessage(msg)
               
            }

        }) 
    }, [Invites, setInvites])


    /*   getNameofInvitees(Invites[0].InviteeID,(stat,msg,res)=>{
            console.log(res[0].user_name)
        })  */
    /* 
        if(Invites.key != true){ getNameofInvitees(Invites[0].InviteeID, (stat,msg,res)=>{
            return res[0].user_name
        })} */



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
                        <Text style={styles.screenheader}>Invitations sent</Text>
                    </View>

                </View>

            </View>



             
            <View style={styles.bodyView}>
                
      <View style={{borderWidth:0}}>
            <Text style={{alignSelf:"center",fontSize:18,color:ORANGE}}>{messgae}</Text></View>


                <FlatList
                    style={styles.flatliststyle}
                    data={Invites}
                    horizontal={false}
                    inverted={false}
                    contentContainerStyle={styles.FlatlistcontentStyle}

                    renderItem={({ item }) => (
                        
                        <View style={styles.flatlistusers}>
                             

                            <Text style={styles.InvietsText}>{item.Invite_state}</Text>

                            <Text style={styles.InviteeText}>{item.userName}</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    //console.log(item._id)
                                    setWhileProcessingMsg("Processing...")
                                    cancelInvite(item._id, (stat, msg) => {
                                        if (stat) {
                                            setWhileProcessingMsg("")
                                        } else {
                                            setWhileProcessingMsg(msg)
                                        }
                                    })

                                }} >

                                <Text style={styles.btntxt}><AntIcon name="close" color={"#a00"} size={35} /></Text>
                            </TouchableOpacity>


                        </View>



                    )}></FlatList>



                <Text style={{ fontSize: 18, color: "gray" }}>{whileProcessingMsg}</Text>


            </View>



        </View>
    );
}


const styles = StyleSheet.create({
    btntxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        margin: '2%',
    }, InvietsText: {
        marginLeft: 20,
        color: 'white',
        fontSize: 10,
        color: "gray",
        justifyContent: 'flex-start',


    }, bodyView: {
        height: "85%", width: "100%",
        alignItems: 'center',paddingTop:windowHeight*0.05
        
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
        height: 75,
        // borderWidth: 1.5,
        borderColor: 'white',
        shadowOpacity: 1,
        shadowColor: SHADOWGREY,
        borderRadius: 10,
        justifyContent: "space-around",
        alignItems: 'center',
        margin: 10, marginTop: "10%"
    },

    flatliststyle: {

        height: '40%', marginTop: "20%",
        backgroundColor: SHADOWGREY,
        width: '93%',
        // borderBottomRightRadius: 25,
        // borderBottomLeftRadius: 25, 
        borderRadius: 20,
        // borderWidth: 1.5,
        borderColor: ALMOSTBLACK,
        //shadowColor: SHADOWGREY,


        //alignItems: 'center',
    },

    FlatlistcontentStyle: {
        alignItems: 'center',//borderWidth:3
        justifyContent: 'center'

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
    }, InviteeText: {
        fontSize: 18, color: 'white'
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
