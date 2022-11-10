import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, View, Text, SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-shadow-cards';
import * as Progress from 'react-native-progress';
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useState } from "react";

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
const ALMOSTBLACK = '#020044';
const LIGHTBLUE = '#A8CFFF';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class ProjectsFlatList extends Component {
  render() {
    
    return (
      <View style={styles.FlatListView}>


        <FlatList
          // horizontal={true}
          inverted={false}

          style={styles.flatlistStyle}


          data={this.props.data}
          
          ListEmptyComponent={<Text style={{fontSize:26,alignSelf:"center",marginTop:"75%"}}>
            {this.props.onEmptyMsg}{"\n"} <TouchableOpacity onPress={this.props.onHeaderbtnPress}>
              <Text style={{fontSize:14,color:ORANGE,alignSelf:'center'}}>{this.props.onEmptyClicableMsg}
              </Text></TouchableOpacity></Text>}


          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (

              <FlatListItem ProjectStyle={this.props.ProjectStyle}
                item={item} index={index}
                BudgetStyle={this.props.BudgetStyle}
                navigation={this.props.navigation}
                userInfo={this.props.userInfo}
              >
              </FlatListItem>

            )
          }}>


        </FlatList>
        <CreateProjectField onPress={this.props.onHeaderbtnPress}></CreateProjectField>


      </View>
    )
  }
}



class FlatListItem extends Component {
  render() {
    return (

      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('DashBoard', {
          user: this.props.userInfo,
          project: this.props.item,
        });
      }}>
        <Card style={styles.flatlistItemView}>


          <Text style={[this.props.ProjectStyle, { color: ORANGE }]}>
            <Text style={{ fontWeight: "600", color: ALMOSTBLACK }}>
              Project Name: </Text> {this.props.item.project_name}
          </Text>

          <Text style={this.props.ProjectStyle}>
            <Text style={{ fontWeight: "600" }}> Project Budget</Text>: {this.props.item.project_info.project_budget}
          </Text>

          <Text style={this.props.ProjectStyle}>
            <Text style={{ fontWeight: "600" }}> Project Type</Text>:{this.props.item.project_info.project_type}
          </Text>
          <Text style={this.props.ProjectStyle}>
            <Text style={{ fontWeight: "600" }}> Remaining time</Text>:{calcualteTime(this.props.item._created,this.props.item.project_info.time_limit)}
          </Text>
         
          <Text style={this.props.ProjectStyle}>
            <Text style={{ fontWeight: "600" }}> Schedule </Text>: <Progress.Bar unfilledColor={ALMOSTBLACK}  color={"rgba(256, 256, 256,1)"} width={windowWidth * 0.6} 
            progress={((parseInt(calcualteTime(this.props.item._created,this.props.item.project_info.time_limit))/parseInt(this.props.item.project_info.time_limit)).toFixed(3))} />
          </Text>
        </Card>
      </TouchableOpacity>
    )
  }
}


class CreateProjectField extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.CreateProjectView}>

          <Text style={styles.createProjectStyle}><View></View> <Ionicons name="add" color={ORANGE} size={50} /> </Text>

        </View>
      </TouchableOpacity>

    )
  }
}




const styles = StyleSheet.create({
  FlatListView: {
    flex: 1
    //borderWidth: 1
    ,
    // marginTop:5,
    backgroundColor: BACKGROUND,
    height: "100%", width: "100%",
    justifyContent: "center", alignItems: "flex-start", paddingVertical: 20


  },
  createProjectStyle: {
    fontSize: 24,
    fontWeight: "600", color: ORANGE, justifyContent: 'center', //textAlign: "center"
  },

  CreateProjectView: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND, borderRadius: 0, opacity: 0.8,
    width: windowWidth * 0.2, height: windowHeight * 0.06,
    marginTop: 5, shadowColor: SHADOWGREY,
    justifyContent: "space-around", marginLeft: 20
    //alignItems: "flex-start", alignSelf: 'flex-start',alignItems:'flex-start'
  },
  FlatListContent: {
    width: "100%", height: "1000%",

    // alignItems:'center'
  }, flatlistItemView: {
    // flex:1,
    // borderWidth: 1,

    // backgroundColor: LIGHTBLUE, borderRadius: 20, 
    opacity: 0.9,
    borderRadius: 20,
    width: windowWidth * 0.92, height: windowHeight * 0.3,
    // marginVertical: 20, shadowColor: SHADOWGREY, marginHorizontal: 15,
    marginVertical: 20,
    justifyContent: "space-around",
    alignItems: "flex-end", alignSelf: 'center', paddingHorizontal: 10
  },

  flatlistStyle: {
    flex: 1,
    //borderWidth: 1,
    width: "100%", height: "60%"
  }
})


function calcualteTime(projectStartDate,timelimit) {
  
  const start_Date = new Date(projectStartDate);
  var dueDate = new Date(start_Date);

  dueDate.setDate(start_Date.getDate() + parseInt(timelimit))
  var nowD = new Date()

  return days(dueDate, nowD)
}


const days = (date_1, date_2) =>{
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
}
/*


var dueDate = new Date();
  dueDate.setDate(start_Date.getDate() + parseInt(projectData.project_info.time_limit))

    const start_Date = new Date(projectData._created);

    const days = (date_1, date_2) =>{
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
}
console.log(days(date_1, date_2) +" days to world cup");

 var nowD = new Date()
  console.log(nowD)
  console.log(days(dueDate, nowD) +" days to world cup");



*/

var flatListData = [{ "id": "1", "data": [], "members": [], "project_info": { "project_budget": "5000", "project_type": "Photo", "time_limit": "185" }, "project_name": "First Projectnum ", "project_owner": "Dasf7328S" }, { "id": "2", "data": [], "members": [], "project_info": { "project_budget": "155000", "project_type": "Audio", "time_limit": "180" }, "project_name": "Second Projectnum1", "project_owner": "Dasf7328S" }, { "id": "3", "data": [], "members": [], "project_info": { "project_budget": "155000", "project_type": "Audio", "time_limit": "180" }, "project_name": "Project number3 ", "project_owner": "Dasf7328S" }, { "id": "1", "data": [], "members": [], "project_info": { "project_budget": "5000", "project_type": "Photo", "time_limit": "185" }, "project_name": "First Projectnum ", "project_owner": "Dasf7328S" }, { "id": "1", "data": [], "members": [], "project_info": { "project_budget": "5000", "project_type": "Photo", "time_limit": "185" }, "project_name": "First Projectnum ", "project_owner": "Dasf7328S" }, { "id": "1", "data": [], "members": [], "project_info": { "project_budget": "5000", "project_type": "Photo", "time_limit": "185" }, "project_name": "First Projectnum ", "project_owner": "Dasf7328S" }, { "id": "1", "data": [], "members": [], "project_info": { "project_budget": "5000", "project_type": "Photo", "time_limit": "185" }, "project_name": "First Projectnum ", "project_owner": "Dasf7328S" }]


/*
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
 */