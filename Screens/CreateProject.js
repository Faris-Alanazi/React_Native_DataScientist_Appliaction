import React, { Component, useState, useCallback } from 'react';
import * as EmailValidator from 'email-validator';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements'
import CurrencyPicker from "react-native-currency-picker"

import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Image, ScrollView
} from 'react-native';

import { Dimensions } from 'react-native';
import Roles from './getRoles';
import { PostNewProject } from '../DB-functions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function CreateProject({ navigation, route }) {
  const { user } = route.params;
  const [userr, setuser] = useState(user);

  const types = [
    { label: 'Photo', value: 'Photo' },
    { label: 'Video', value: 'Video' },
    { label: 'Text', value: 'Text' },
    { label: 'Audio', value: 'Audio' },
  ];

  const [projectTypes, setProjectType] = useState({ Photo: false, Video: false, Text: false, Audio: false });

  const [project_name, set_project_name] = useState(null);
  const [project_budget, set_project_budget] = useState(null);
  const [project_time, set_project_time] = useState(null);
  const [project_type, set_project_type] = useState(null);
  const [collectAnnotatePer, setCollecAnnotatetPer] = useState({ collect: " 0.5", annotate: "0.2" })
  const [minMaxRange, setMinMaxRange] = useState({ Min: "0", Max: "100" })

  const [role, setRole] = useState({ collect: true, annotate: true });
  const [tragetTocollect, setTargetTocollect] = useState("1000");

  const[collectAnotBudgetDefult,setCollectAnotBudgetDefult] = useState({collectBud:0,annotateBud:0})

  const [Currency, SetCurrency] = useState("SAR");
  const [problemType, setProblemType] = useState("classification")
  const [classes, setClasses] = useState("no classes")

  const [vaild_name, setvaild_name] = useState(false); //for valaditon
  const [vaild_budget, setvaild_budget] = useState(false);
  const [vaild_time, setvaild_time] = useState(false);
  const [valid_type, setvaild_type] = useState(false);
  const [error, set_error] = useState(null);



  let currencyPickerRef = undefined;

  //currencyPickerRef.open();
  //currencyPickerRef.close();


  return (

    <SafeAreaView style={styles.backgroundview}>

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
          <Text style={styles.screenheader}>Create Project</Text>
        </View>
      </View>
      <View style={styles.bodyView}>
        <Text style={styles.text_error}>{error}</Text>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.ScrollContainerStyle}>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '10%',
              width: '100%',
              marginBottom: '5%',
            }}>

          </View>

          <View style={styles.inputsview}

          >
            <TextInput
              onChangeText={(name) => {
                var vildate = new RegExp('^\\w[\\w.]{6,14}\\w$');
                if (name.match(vildate)) {
                  setvaild_name(true);
                  set_project_name(name);
                  set_error(null);
                } else {
                  set_error('Project Name must be 8 - 14 length');
                }
              }}
              placeholderTextColor="grey"
              style={styles.txtinput}
              placeholder="Project Name"
              value={project_name}></TextInput>

            <TextInput
              placeholderTextColor="grey"
              style={styles.txtinput}
              placeholder={'Project Budget'}
              onChangeText={(budget) => {
                var vildate = new RegExp('[1-9]d{0,5}');
                if (budget.match(vildate)) {
                  
                  setCollectAnotBudgetDefult({collectBud:(parseFloat(budget)*0.66).toFixed(2),annotateBud:(parseFloat(budget)*0.33).toFixed(2)})
                  console.log(collectAnotBudgetDefult)
                  setvaild_budget(true);
                  set_project_budget(budget);
                  set_error(null);
                } else {
                  set_error('Project Budget must be a Numeric Value');
                }
              }}
              keyboardType={'number-pad'}></TextInput>

            <TextInput
              placeholderTextColor="grey"
              style={styles.txtinput}
              placeholder={'Project Duration in Days'}
              onChangeText={(time) => {
                var vildate = new RegExp('[1-9]d{0,5}');
                if (time.match(vildate)) {
                  setvaild_time(true);
                  set_project_time(time);
                  set_error(null);
                } else {
                  set_error('Project Duration must be a Numeric Value');
                }
              }}
              keyboardType={'number-pad'}></TextInput>

            <View >
              <Text style={styles.createprojecttxt}>Project Type</Text>
            </View>


            <View style={styles.CheckboxContainer} >




            </View>



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
                set_project_type(type.value);
                setvaild_type(true);
              }} />




            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20%',
              }}>

              <View style={styles.CurrencyView}>

                <CurrencyPicker
                  currencyPickerRef={(ref) => { currencyPickerRef = ref }}
                  //enable={true}
                  darkMode={false}
                  currencyCode={"SAR"}
                  //showFlag={true}
                  //showCurrencyName={true}
                  //showCurrencyCode={true}
                  onSelectCurrency={(data) => {
                    SetCurrency(data.code)
                    //console.log(Currency)
                  }}
                  onOpen={() => { console.log("Open") }}
                  onClose={() => { console.log("Close") }}
                  // showNativeSymbol={true}
                  //showSymbol={false}
                  containerStyle={styles.containerStyleCurrency}

                  modalStyle={styles.modalStyleCurrency}
                  title={"Currency"}
                  searchPlaceholder={"Search"}
                  showCloseButton={true}
                  showModalTitle={true}
                />
                <Text style={{ color: ALMOSTBLACK, fontSize: 18, paddingRight: 10, fontWeight: "600" }}>Currency:</Text></View>
              <View style={styles.textViewTarget}>
                <TextInput
                  value={tragetTocollect}

                  onChangeText={(text) => { setTargetTocollect(text) }}
                  keyboardType='number-pad'
                  style={[styles.PerAnnotateCollectStyle, { height: windowHeight * 0.06, marginHorizontal: 10, }]}>

                </TextInput>
                <Text>Target no. of fields to be collected
                  <Text style={{ fontSize: 10, color: 'gray' }}>{"\n"}number of fields to reach project objective</Text></Text>

              </View>

              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 60 }}>Cost Per </Text>

              <View style={styles.PerAnnotateCollectCardView}>



                <TextInput keyboardType='number-pad' style={styles.PerAnnotateCollectStyle}
                  value={collectAnotBudgetDefult.collectBud>0? ((collectAnotBudgetDefult.collectBud/parseInt(tragetTocollect)).toFixed(2)).toString() :collectAnnotatePer.collect}
                  onChangeText={(text) => {
                    setCollecAnnotatetPer({ ...collectAnnotatePer, collect: text })
                    collectAnotBudgetDefult.collectBud>0? console.log((collectAnotBudgetDefult.collectBud/parseInt(tragetTocollect))) :console.log(collectAnnotatePer.collect)
                    // console.log(collectAnnotatePer);
                  }}></TextInput>
                <Text style={styles.PerAnnotateCollectStylTexte}>collect</Text>

                <TextInput
                  value={collectAnotBudgetDefult.annotateBud>0? ((collectAnotBudgetDefult.annotateBud/parseInt(tragetTocollect)).toFixed(2)).toString() :collectAnnotatePer.annotate}
                  onChangeText={(text) => {
                    setCollecAnnotatetPer({ ...collectAnnotatePer, annotate: text })
                    //console.log(collectAnnotatePer)
                  }} keyboardType='number-pad' style={styles.PerAnnotateCollectStyle}></TextInput>
                <Text style={styles.PerAnnotateCollectStylTexte}>annotate</Text>
              </View>


              <View style={styles.ClassificationView}>


                <Text style={{ fontSize: 16, fontWeight: "600" }}>Problem type</Text>
                <RadioButtonRN
                  // animationTypes={['pulse', 'shake']}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center', //borderWidth: 1,
                    width: '100%'
                  }}

                  box={true}
                  initial={2}
                  activeColor={ORANGE}
                  deactiveColor={SHADOWGREY}
                  boxStyle={{
                    fontSize: 16,
                    alignItems: 'center',
                    width: '45%',
                    backgroundColor: BACKGROUND,
                    height: 55,
                    borderWidth: 1,
                    color: ALMOSTBLACK, marginHorizontal: 2,

                    shadowColor: SHADOWGREY,
                    shadowOpacity: 1,
                  }}
                  data={[
                    { label: 'regression', value: 'regression' },
                    { label: 'classification', value: 'classification' },

                  ]}
                  textStyle={styles.txttypesstyle}
                  selectedBtn={(type) => {
                    setProblemType(type.value);

                  }} />

              </View>

              <View style={styles.afterProblemComponentsStyleView}>
                {problemType === "regression" ? <View style={styles.PerAnnotateCollectCardView}>

                  <TextInput keyboardType='number-pad' style={styles.PerAnnotateCollectStyle}
                    value={minMaxRange.Max}
                    onChangeText={(text) => {
                      setMinMaxRange({ ...minMaxRange, Max: text })

                    }}></TextInput>
                  <Text style={styles.PerAnnotateCollectStylTexte}>Max Range</Text>

                  <TextInput
                    value={minMaxRange.Min}
                    onChangeText={(text) => {
                      setMinMaxRange({ ...minMaxRange, Min: text })


                    }} keyboardType='number-pad' style={styles.PerAnnotateCollectStyle}></TextInput>
                  <Text style={styles.PerAnnotateCollectStylTexte}>Min Range</Text>
                </View>


                  : <TextInput style={styles.getClassesInput}
                    multiline={true} placeholder="define classes separated with commas E.g [Cat,Dog,Cow]"
                    onChangeText={(text) => { setClasses(text) }} />}

              </View>




              <View style={styles.textView}>

                <CheckBox textStyle={styles.CheckboxTextStyle} containerStyle={styles.CheckboxStyle} title='Collect' checked={role.collect}
                  onPress={() => { setRole({ ...role, collect: !role.collect }) }} />

                <CheckBox textStyle={styles.CheckboxTextStyle} containerStyle={styles.CheckboxStyle} title='Annotate' checked={role.annotate}
                  onPress={() => { setRole({ ...role, annotate: !role.annotate }) }} />


              </View>






              <TouchableOpacity
                style={styles.btn}
                onPress={() => {


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
                      project_owner: userr.user_name,
                      project_name: project_name,
                      project_info: {
                        project_budget: project_budget,
                        time_limit: project_time,
                        project_type: project_type,
                        currency: Currency,
                        CostPerCollect: collectAnnotatePer.collect,
                        CostPerAnnotate: collectAnnotatePer.annotate,
                        ProblemType: problemType,
                        ClassesOrRange: problemType == "classification" ? classes : minMaxRange
                      },
                      members: [],
                      data: [],
                    }),
                    json: true,
                  };
                  if (
                    vaild_name === true &&
                    vaild_time === true &&
                    vaild_budget === true && valid_type
                  ) {


                    const info = {
                      project_budget: project_budget,
                      time_limit: project_time,
                      project_type: project_type,
                      currency: Currency,
                      TargetToCollect: tragetTocollect,
                      CostPerCollect: collectAnnotatePer.collect,
                      CostPerAnnotate: collectAnnotatePer.annotate,
                      ProblemType: problemType,
                      ClassesOrRange: (problemType == "classification" ? classes : minMaxRange)
                    }



                    // navigation.navigate('getRoles', { user: userr, Types: projectTypes, ProjectInfo: info, projectname: project_name })
                    //console.log(info.project_type)
                    console.log(userr)
                    PostNewProject(userr.user_name, project_name, info, role, CallBackResponse, navigation, userr)
                    function CallBackResponse(stat, msg) { set_error(!stat ? msg : "") }


                  } else if (project_name == null) {
                    set_error('Enter Project Name');
                  } else if (project_budget == null) {
                    set_error('Enter Project Budget');
                  } else if (project_time == null) {
                    set_error('Enter Project Duration');
                  } else if (project_type == null) {
                    set_error('Enter Project Type');
                  } else {
                    set_error('Fill All The Fileds');
                  }

                  async function uploadproject() {
                    try {
                      let res = await fetch(url, options);
                      let jsondata = await res.json();
                      console.log(
                        'The User : ' + userr.user_name + ' Create a New PROJECT'
                      );
                      console.log(Date());
                      navigation.navigate('Home', { user: userr });
                    } catch (error) {
                      alert(error);
                    }
                  }
                }}>
                <Text style={styles.actiontxt}>Submit</Text>


              </TouchableOpacity>


            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>

  );
}






const styles = StyleSheet.create({
  text_error: {
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  bodyView: {
    width: "100%",
    height: "77%",//borderColor:"blue",borderWidth:3
  },

  modalStyleCurrency: {
    container: {},
    searchStyle: {},
    tileStyle: {},
    itemStyle: {
      itemContainer: {},
      flagWidth: 25,
      currencyCodeStyle: {},
      currencyNameStyle: {},
      symbolStyle: {},
      symbolNativeStyle: {}
    }

  }, containerStyleCurrency: {

    container: { borderWidth: 1, padding: 10, marginVertical: 15, backgroundColor: SHADOWGREY, borderColor: 'gray' },
    flagWidth: 30,
    currencyCodeStyle: {},
    currencyNameStyle: {},
    symbolStyle: {},
    symbolNativeStyle: {}

  }, CurrencyView: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',
    marginTop: 30
  },


  scrollView: {
    backgroundColor: BACKGROUND,
    // marginHorizontal: 20,
    //borderWidth: 3,
    width: windowWidth,//alignItems:"center"
  }, ScrollContainerStyle: {
    //borderWidth: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: "330%",
    width: '100%', //paddingVertical: "10%"
  },

  CheckboxContainer: {
    flexDirection: 'row', width: "100%",
  }, checkbox: {
    width: 200
  }, CheckboxTitle: {
    fontSize: 12
  }, checkboxItemContainer: {
    width: "20%", backgroundColor: BACKGROUND, borderWidth: 0
  },
  btn: {
    marginTop: windowHeight * 0.03,
    width: '50%',
    backgroundColor: BLUESH,
    height: 50,
    borderRadius: 22,

    justifyContent: 'center',
  },
  box: {

    fontSize: 16,
    alignItems: 'center',
    width: '42%',
    backgroundColor: BACKGROUND,
    height: 55,
    borderWidth: 0,
    color: ALMOSTBLACK,

    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
  },
  txttypesstyle: {
    color: ALMOSTBLACK,
    alignSelf: 'center',
    fontSize: 14, fontWeight: "600",
    // paddingLeft: '19%',
    marginHorizontal: 6
  },
  createprojecttxt: {
    color: ALMOSTBLACK,

    textAlign: 'center',
    fontSize: 18,
    margin: windowHeight * 0.02,
  },
  inputsview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // flex: 2.5,//borderWidth:3

  },
  txtinput: {
    marginTop: 0,
    marginBottom: windowHeight * 0.05,
    fontSize: 16,
    textAlign: 'center',
    width: '85%',
    backgroundColor: 'white',
    height: 55,
    borderRadius: 40,
    borderWidth: 1.5,
    color: ALMOSTBLACK,
    borderColor: SHADOWGREY,
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
    height: "10%", //borderWidth: 2,
    marginBottom: windowHeight * 0.09
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
  screenheader: {
    color: ALMOSTBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
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
    //borderRadius: '100%',
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
  },
  actiontxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  PerAnnotateCollectStyle: {
    backgroundColor: 'white', width: "20%", height: "70%",
    borderWidth: 1,
    borderColor: 'gray', borderRadius: 10,
    paddingHorizontal: 3,
  }

  , PerAnnotateCollectCardView: {
    paddingHorizontal: 10,
    width: "100%", height: windowHeight * 0.09,
    // borderWidth: 1,
    justifyContent: "space-around", alignItems: 'center'
    , flexDirection: 'row'
  }, PerAnnotateCollectStylTexte: {
    fontSize: 16
  }, ClassificationView: {
    marginVertical: windowHeight * 0.05,
    // borderWidth: 1,
    width: "100%", height: windowHeight * 0.15, //flexDirection: 'row'
    justifyContent: 'space-around', alignItems: "center"
  }, afterProblemComponentsStyleView: {
    // borderWidth: 1,
    width: "100%", height: windowHeight * 0.15, marginVertical: windowHeight * 0.1
  }, getClassesInput: {
    paddingHorizontal: 5,
    backgroundColor: 'white',
    width: windowWidth * 0.97, height: windowHeight * 0.12,
    alignSelf: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 10,

  }, getRolesViewStyle: {
    width: "100%", height: windowHeight * 0.18,
    //borderWidth: 1,
    justifyContent: 'center',
  },
  textView: {
    height: windowHeight * 0.15,// borderWidth: 1,
    alignItems: 'flex-start',
    flexDirection: "row", justifyContent: "space-evenly"

  }, CheckboxStyle: {
    width: "40%"
  }, CheckboxTextStyle: {
    // alignItems:"center" 
    color: ALMOSTBLACK
  }, textViewTarget: {
    marginVertical: windowHeight * 0.06, paddingHorizontal: 10,
    height: windowHeight * 0.15, width: "100%",// borderWidth: 1,
    alignItems: 'center',
    flexDirection: "row", justifyContent: "space-around",//borderWidth:1
  }
});
