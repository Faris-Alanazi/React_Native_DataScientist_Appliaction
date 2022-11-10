import React, { useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from 'react-native';

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';

export default function RoleScreen({ navigation, route }) {
  const { user, project, invited } = route.params;
  let d = invited.invites;
  let body;
  const types = [
    { label: 'Collect ' + project.project_info.project_type, value: 'Photo' },
    {
      label: project.project_info.project_type + 's' + ' Annotator',
      value: 'Annotator',
    },
  ];
  const [unticost, set_unticost] = useState(null);
  const [desc, set_desc] = useState(null);
  const [role, set_role] = useState(null);

  const [cost, setvaild_cost] = useState(false); //for valaditon
  const [valid_type, setvaild_type] = useState(false);

  const [error, set_error] = useState(null);

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
          <Text style={styles.screenheader}>Assign Role Page</Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '10%',
          width: '100%',
          marginBottom: '5%',
        }}>
        <Text style={styles.text_error}>{error}</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.inputsviewkeyboard}
        enabled
        behavior="padding">
        <View style={styles.inputsview}>
          <TextInput
            placeholderTextColor="grey"
            style={styles.txtinput}
            placeholder={'Per Unit Cost {Collect or Annotate}'}
            onChangeText={(budget) => {
              var vildate = new RegExp('[0-9]');
              if (budget.match(vildate)) {
                setvaild_cost(true);
                set_unticost(budget);
                set_error(null);
              } else {
                set_error('Project Budget must be a Numeric Value');
              }
            }}
            keyboardType={'numeric'}></TextInput>

          <View>
            <Text style={styles.createprojecttxt}>Assign Role</Text>
          </View>
          <RadioButtonRN
            animationTypes={['pulse', 'shake']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '70%',
            }}
            box={true}
            activeColor={ORANGE}
            deactiveColor={SHADOWGREY}
            boxStyle={styles.box}
            data={types}
            textStyle={styles.txttypesstyle}
            selectedBtn={(type) => {
              set_role(type.value);
              setvaild_type(true);
            }}
            icon={<Icon name="check-circle" size={25} color={ORANGE} />}
          />

          <TextInput
            onChangeText={set_desc}
            placeholderTextColor="grey"
            style={styles.txtinputdec}
            placeholder="Decrepiton    *Optional"
            value={desc}></TextInput>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20%',
            }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                const bodycontent = {
                  invite_from: user.user_name,
                  project_name: project.project_name,
                  cost: unticost,
                  duration: project.project_info.time_limit,
                  project_type:project.project_info.project_type,
                  role: role,
                  decs: desc,
                  _id:
                    user.user_name +
                    project.project_name +
                    unticost +
                    project.project_info.time_limit +
                    role +
                    desc,
                };
                if (d == null || d == '') {
                  body = [bodycontent];
                } else {
                  body = d;
                  body.push(bodycontent);
                }

                const urlcont =
                  'https://dsms0-7e9f.restdb.io/rest/contributors/' +
                  invited._id;
                const urlproject =
                  'https://dsms0-7e9f.restdb.io/rest/contributors/' +
                  project._id;
                var optionscontr = {
                  method: 'PATCH',

                  headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': 'your api key',
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    invites: body,
                  }),
                  json: true,
                };
                var optionsproj = {
                  method: 'PATCH',

                  headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': 'your api key',
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    //invites: project.invites.push(body),
                  }),
                  json: true,
                };

                async function postdata(url, options) {
                  try {
                    let res = await fetch(url, options);
                    alert('Invite Sent');
                    navigation.navigate('Home',{user:user})
                  } catch (error) {
                    console.log(error);
                  }
                }

                if (valid_type === true && cost === true) {
                  //postdata(urlproject, optionsproj);
                  postdata(urlcont, optionscontr);
                } else if (unticost == null) {
                  set_error('Enter a unit Cost ( 0 if no unit cost )');
                } else if (role == null) {
                  set_error('Select a Role');
                } else {
                  set_error('Fill All The Fileds');
                }
              }}>
              <Text style={styles.actiontxt}>Send an Invite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  inputsviewkeyboard: {
    paddingTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 2.5,
  },
  txtinputdec: {
    marginTop: 0,
    marginBottom: '5%',
    fontSize: 16,
    textAlign: 'center',
    width: '85%',
    backgroundColor: 'white',
    height: 150,
    borderRadius: 40,
    borderWidth: 1.5,
    color: ALMOSTBLACK,
    borderColor: SHADOWGREY,
    shadowColor: SHADOWGREY,
    shadowOpacity: 1,
  },
  text_error: {
    color: ORANGE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: '10%',
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
  txtinput: {
    marginTop: 0,
    marginBottom: '5%',
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
    borderRadius: '30%',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
    paddingBottom: '50%',
  },
  actiontxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
