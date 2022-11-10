

import { auth, app } from '../Firebase-config/firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { signOut,onAuthStateChanged } from "firebase/auth";
import { isUsernameORemail, isValidEmail, isValidUserName, isValidPasswd, isUsernameUsed, isNotEmptyOrSpaces } from './Validation';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';






//           ------Loog Out -------

const logoutUser = function (navigationVar, auth2 = auth) {

    //if (getLoginStatus()) {

        signOut(auth2).then(
            (ref) => {

               navigationVar.popToTop()
                console.log('---Signout successful -----byee ')

            }
        ).catch(
            (error) => {
                console.log('----Logout----Falied')
                console.log(error.message)
                console.log(error)

            }
        )
    //} 
    //else {
       // console.log('You are already loged out!!!!!')
     //   navigationVar.popToTop()
   // }


}







const db = getFirestore(app);

const getData = async () => {
    const UsersColection = collection(db, 'Users');
    const UserSnapshot = await getDocs(UsersColection);
    const ListsUsers = UserSnapshot.docs.map(doc => doc.data());
    console.log(ListsUsers);

}













const loginUser = function (email, password, NavigationVar, callBackResponse, auth2 = auth) {

    if ((isNotEmptyOrSpaces(email) && isNotEmptyOrSpaces(password))) {


        if ((isValidEmail(email) || isValidUserName(email)) && isValidPasswd(password)) {


            isUsernameORemail(email, isUserORemailRes);

            function isUserORemailRes(status, emailFromUsername) {
                if (status) {
                    /* 
                    The Entered is username --> fetch email from rest db using username to authenticate using Frirebase
                    then pass fetched email to Firebase
                    */
                    signinWithFirebase(auth2, emailFromUsername, password, NavigationVar, Fireresponse);

                    /*
                    this function take the response from function (signinWithFirebase)
                     the first variable is boolean indecates whether Entered Username or Email 
                    */
                    function Fireresponse(stat, msg) { callBackResponse(stat, msg) }
                } else {

                    /*
                    the Entered is email -->  the convsert email to Loweer case then pass email directly 
                    
                    */
                    signinWithFirebase(auth2, (email.toLowerCase()), password, NavigationVar, Fireresponse);
                    function Fireresponse(stat, msg) { callBackResponse(stat, msg) }

                }
            }
            console.log("email Befor fetching  " + email);


        } else {
            if(isValidEmail(email) || isValidUserName(email)){
                callBackResponse(false, "Incorrect Email/Username or password");
                console.log("Invalid password must be >=8")
                
            }else{
                callBackResponse(false, "Incorrect Email/Username or password");
                console.log("Invalid email");
            }

            

        }

    } else {
        callBackResponse(false, "Empty email or password")

    }
}



function signinWithFirebase(authin, emailORuser, passwd, NavigationVar, callBackResponseFire, passEmailifEntered = "email") {

    signInWithEmailAndPassword(authin, emailORuser, passwd).then(
        (userCridential) => {
            //NavigationVar.navigate(ScreenName);
            //NavigationVar.navigate('Home', { user: res[0] });
            getUserData(emailORuser, NavigationVar,callResponse, passEmailifEntered);
            function callResponse(stat,msg){callBackResponseFire(stat,msg)}
            console.log('-------login Success------ ')
            callBackResponseFire(true, "Welcome :)");


        }).catch((ref) => {
            var errorCode = ref.code;
            console.log('-----login Failed-----');
            console.log(ref.message);
            console.log(ref);
            console.log(errorCode);

            if(errorCode=="auth/wrong-password" || errorCode=="auth/invalid-email" || errorCode=="auth/user-not-found"){
            callBackResponseFire(false, "Incorrect Email/Username or password");
        }else{
            callBackResponseFire(false, "Internal Error please try after 5 minutes");

        }

        })

}











//      Function return true if user signin and false if user sign out 

const getLoginStatus = function () {
    var user = auth.currentUser;

    if (user) {
        return true;
        gooblalvar = "tureee";
    } else {
        return false;
        gooblalvar = "falseee";
    }

}




const SighnupinFirebase = function (email, password, callBack, auth2 = auth) {
    createUserWithEmailAndPassword(auth2, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            // console.log(user.email)
            //console.log(userCredentials)
            console.log("--------Success")
            callBack(true, 'Account created With email (' + user.email + ')');

        }).catch(error => {

            var errorMsg = error.code;
            if (errorMsg == 'auth/email-already-in-use') {

                callBack(false, "Used Email address");

            } else if (errorMsg == 'auth/invalid-email') {

                callBack(false, "Invalid email address");

            } else {
                callBack(false, "internal-error || empty password");
            }

            //console.log(error.code)
            // alert(error)
            //callBack(error.code)
        })
}




function HandelSubmitData(username, email, password, sex, DefaultProfileImage, navigation, CallbackMessage) {

    if (isValidUserName(username) && isValidPasswd(password) && isValidEmail(email) && (sex !== null && sex !== undefined)) {

        isUsernameUsed(username, isUsernameUsedResponse);

        function isUsernameUsedResponse(isUsernameUsedResult) {
            if (!isUsernameUsedResult) {

                console.log("Username is available");
                SighnupinFirebase(email, password, SighnupinFirebaseResponse);

                function SighnupinFirebaseResponse(status, msg) {
                    if (status) {
                        //here we will send data to rest database with the username by function
                        //console.log(status);

                        SubmitDataToRestDB(username, email, password, sex, DefaultProfileImage, callBackResponse);
                        function callBackResponse(stat, msg) {
                            if (stat) {
                                console.log(msg);
                                getUserData(username, navigation,callResponse);
                                function callResponse(stat,msg){CallbackMessage(stat,msg)}

                            } else {
                                console.log(msg);
                                CallbackMessage(false, {
                                    error: "Internal Error ",
                                    usernameError: [false, ""], emailError: [false, ""], passwordError: [false, ""], sexError: [false, ""]
                                })

                            }
                        }

                        console.log(msg);
                    } else {
                        console.log(msg)
                        CallbackMessage(false, {
                            error: "email adress is used try another one",
                            usernameError: [false, ""], emailError: [true, "Used Email address"], passwordError: [false, ""], sexError: [false, ""]
                        })
                    }

                }


            } else {

                console.log("Username Unavailable");

                CallbackMessage(false, {
                    error: "Username Unavailable",
                    usernameError: [true, "username Unavailable"], emailError: [false, ""], passwordError: [false, ""], sexError: [false, ""]
                })


            }
        }





    } else {
        if (
            email === null || email === "" || email === " " ||
            username === null || username == "" || username == " " ||
            password === null || password === "" || password === " " ||
            sex === null || sex === undefined
        ) {
            CallbackMessage(false, {
                error: "Make sure to fill all fields",
                usernameError: "", emailError: "", passwordError: "", sexError: ""
            })
        }

        else if (!isValidUserName(username) || !isValidPasswd(password) || !isValidEmail(email)) {


            CallbackMessage(false, {
                error: "Make sure all fields are valid",
                usernameError: "", emailError: "", passwordError: "", sexError: ""
            })
        }


    }
}




function SubmitDataToRestDB(user_name, email, password, sex, DefaultProfileImage, callBackResponse) {
    const url = 'https://dsms0-7e9f.restdb.io/rest/data-scientist';

    var options = {
        method: 'POST',

        headers: {
            'cache-control': 'no-cache',
            'x-apikey': 'your api key',
            'content-type': 'application/json',
        },

        body: JSON.stringify({
            user_name: user_name,
            password: password,
            email: email,
            gender: sex,
            profile_image: DefaultProfileImage,
            balance: 0
        }),
        json: true,
    };


    fetch(url, options).then((res) => {
        if (res.ok) {
            callBackResponse(true, "")
            console.log("Welcome  " + user_name + " to DSMS :)");

        } else {
            callBackResponse(false, "One or More of the Fields Are Used")
            //console.log(' One or More of the Fields Are Used ');
            callBackResponse(true, "")
            console.log(res.error);
        }
    })
}


async function getUserData(username, navigationVariable,CallBackMsg, getBy = "user_name",SceenNametoNavigate="Test") {
    
    const urlget = 'https://dsms0-7e9f.restdb.io/rest/data-scientist?q={"' + getBy + '":"' + username + '"}';
    var optionsget = {
        method: 'GET',
        headers: {
            'cache-control': 'no-cache',
            'x-apikey': 'your api key',
        },
    };


    let response = await fetch(urlget, optionsget);
    let res = await response.json();
    console.log(Date());
  
    if (res[0]) {
        console.log(username + ' : Data Fetched');
        CallBackMsg(true,"")
        navigationVariable.navigate(SceenNametoNavigate,
             {user: res[0] });
       // console.log(res[0]);
    } else {
       CallBackMsg(false,"Incorrect Username/Email or password \n Make sure Case-sensitivity")
       
        console.log("\n \n error ---------error :( \n from 20 oct 2022 the registered emails will be case insensitive"+
        " \n if you create an account with Capital-letter email ..\n"+"remove your email from rest db and firebase"+
        " \n then create account again with same email the app with consider it insenstive ");
        
        console.log("\n\nOR\n You can find function responsable for convert email to lowercase in  \dsms1\Function\handlers.js \nin loginUser function in line 102")
    }
}




function autoLogeIn(Callback,Fireauth=auth){
   // const userr = {"_id": "63518e8ee4adc85000064dac", "balance": 0, "email": "thamer998@gmail.com", "gender": "male", "password": "Ww123456", "profile_image": "https://secure.gravatar.com/avatar/5f1f3c5353f19cf8e59de4e48c291a80?d=https:%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png", "user_name": "Dasf7328S"}
    const Logout = onAuthStateChanged(auth, (user) => {
        if (user) {
          //  navigation.navigate('Test',{user:userr})
            console.log('loged in automaticlly');
           // console.log(user.email);
            Callback(true,user.email)
        }else{
            Callback(false,null)

        }
    })
}


export {getUserData,autoLogeIn, logoutUser, getLoginStatus, loginUser, getData, SighnupinFirebase, HandelSubmitData }
