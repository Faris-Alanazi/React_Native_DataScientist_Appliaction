
import { useState } from "react";
import { CheckBox } from 'react-native-elements'
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
//import {getData} from '../functions/handlers';

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function Roles({ navigation, route }) {
    const { user } = route.params;
    const { Types } = route.params;
    const { projectname } = route.params;
    const { ProjectInfo } = route.params;

    const [Rprojectname, setRprojectname] = useState(projectname);
    const [userr, setuser] = useState(user);
    const [ProjectInformation, setProjectInfo] = useState(ProjectInfo);
    const [isSelected, setisSelected] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [Ptypes, setPtype] = useState([]);


    const [projectTypeBool, setprojectTypeBool] = useState({
        Photo: false,
        Video: false,
        Audio: false,
        Text: false
    })

    Object.keys(projectTypeBool).forEach(key => {
        if (key == ProjectInformation.project_type) {
            projectTypeBool[key] = true;
            // console.log(projectTypeBool)
        }

    })
    //console.log(projectTypeBool)

    const [collectText, setCollectText] = useState(projectTypeBool.Text ? true : false);
    const [annotateText, setaAnotateText] = useState(projectTypeBool.Text ? true : false);

    const [collectPhoto, setCollectPhoto] = useState(projectTypeBool.Photo ? true : false);
    const [annotatePhoto, setaAnotatePhoto] = useState(projectTypeBool.Photo ? true : false);

    const [collectVideo, setCollectVideo] = useState(projectTypeBool.Video ? true : false);
    const [annotateVideo, setaAnotateVideo] = useState(projectTypeBool.Video ? true : false);

    const [collectAudio, setCollectAudio] = useState(projectTypeBool.Audio ? true : false);
    const [annotateAudio, setaAnotateAudio] = useState(projectTypeBool.Audio ? true : false);




    return (
        <View style={getRolePage.container}>

            <Text style={{ fontSize: 22 }}> Assigin roles to "{Rprojectname}" Project  </Text>
            <Text style={{fontSize:11}}>assign the default roles that users play when{"\n"} they join the project (You can modify later)</Text>
            <Text style={{ color: "#f00" }}> {errorMsg}  </Text>

            <View style={getRolePage.rolesContainer}>

                <View style={getRolePage.textView}>

                    <Text>Collect</Text>
                    <Text>Annotate</Text>
                    <Text>       </Text>

                </View>


                <View style={getRolePage.textView}>

                    <CheckBox disabled={!projectTypeBool.Text} title='' checked={collectText} onPress={() => { setCollectText(!collectText) }} />
                    <CheckBox disabled={!projectTypeBool.Text} title='' checked={annotateText} onPress={() => { setaAnotateText(!annotateText) }} />
                    <Text>Text  </Text>

                </View>


                <View style={getRolePage.textView}>

                    <CheckBox disabled={!projectTypeBool.Photo} title='' checked={collectPhoto} onPress={() => { setCollectPhoto(!collectPhoto) }} />
                    <CheckBox disabled={!projectTypeBool.Photo} title='' checked={annotatePhoto} onPress={() => { setaAnotatePhoto(!annotatePhoto) }} />
                    <Text>Photo</Text>

                </View>


                <View style={getRolePage.textView}>

                    <CheckBox disabled={!projectTypeBool.Video} title='' checked={collectVideo} onPress={() => { setCollectVideo(!collectVideo) }} />
                    <CheckBox disabled={!projectTypeBool.Video} title='' checked={annotateVideo} onPress={() => { setaAnotateVideo(!annotateVideo) }} />
                    <Text>Video</Text>

                </View>


                <View style={getRolePage.textView}>
                    <CheckBox disabled={!projectTypeBool.Audio} title='' checked={collectAudio} onPress={() => { setCollectAudio(!collectAudio) }} />
                    <CheckBox disabled={!projectTypeBool.Audio} title='' checked={annotateAudio} onPress={() => { setaAnotateAudio(!annotateAudio) }} />
                    <Text>Audio</Text>


                </View>





            </View>




            <TouchableOpacity style={getRolePage.buttonStyle} onPress={() => {
                var roles = {
                    Text: { "collect": collectText, "annotate": annotateText },
                    Photo: { "collect": collectPhoto, "annotate": annotatePhoto },
                    Video: { "collect": collectVideo, "annotate": annotateVideo },
                    Audio: { "collect": collectAudio, "annotate": annotateAudio },
                };


                // console.log(roles.Photo.annotate);

                // console.log(listofTypea)
                /*
                
                    Object.keys(roles).forEach(key => {
                        Object.keys(roles[key]).forEach(item =>{
                            console.log((roles[key][item]))
                            if((roles[key][item])){
                                setisSelected((roles[key][item]))
                        
    
                               console.log((roles[key][item]))
                            }
                            console.log((roles[key][item]))
                        })
                      });*/


                // console.log("State is "+ isSelected)

                PostNewProject(userr.user_name, Rprojectname, ProjectInformation,roles[ProjectInformation.project_type], FunctionCalled, navigation, userr)

                function FunctionCalled(sts, msg) {
                    setErrorMsg(msg)
                    console.log(sts, msg);
                    console.log(roles)
                }
               
               
                console.log(roles[ProjectInformation.project_type])



                // getData()
            }} >
                <Text style={getRolePage.buttonText}> Create </Text>
            </TouchableOpacity>
        </View>
    )

}


async function PostNewProject(username, projectname, Pinfo,roles, callBack, navigation, userdata) {

    const url =
        'https://dsms0-7e9f.restdb.io/rest/data-scientist-projects';

    var options = {
        method: 'POST',

        headers: {
            'cache-control': 'no-cache',
            'x-apikey': 'your api key',
            'content-type': 'application/json',
        },

        body: JSON.stringify({
            project_owner: username,
            project_name: projectname,
            project_info: Pinfo,
            members: [],
            data: [],
            defultRoles:roles
        }),
        json: true,
    };

    try {
        let res = await fetch(url, options);
        let jsondata = await res.json();
        //console.log('The User : ' + username + ' Create a New PROJECT');
        console.log(Date());
        console.log(userdata)
        navigation.navigate('Test', { userr: userdata[0] });
    } catch (error) {

       // alert(error);
        callBack(false, "Error in creating new project");
    }

}









const getRolePage = StyleSheet.create({
    container: {
        flex: 1, alignItems: "center",
        backgroundColor: BACKGROUND,
        justifyContent: 'center'
    },
    rolesContainer: {
        width: "92%", height: "43%",
        backgroundColor: "#fff",
        borderRadius: 15, margin: 10
    }, textView: {
        flex: 0.2, borderWidth: 0, alignItems: 'center',
        flexDirection: "row", justifyContent: "space-evenly"

    }, photoView: {
        flex: 0.2, borderWidth: 0, flexDirection: "row",

    }, videoView: {
        flex: 0.2, borderWidth: 0, flexDirection: "row",

    }, audioView: {
        flex: 0.2, borderWidth: 0, flexDirection: "row",

    }, buttonText: {
        fontSize: 19, fontWeight: "700",
        color: "#efefef",
        letterSpacing: 2,

    }, buttonStyle: {
        // marginTop:25,
        alignItems: "center", justifyContent: "center",
        backgroundColor: "#223366",
        width: 230,
        height: 48,
        borderRadius: 7

    }


});
