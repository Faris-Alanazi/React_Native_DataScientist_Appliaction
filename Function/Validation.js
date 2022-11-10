import * as EmailValidator from 'email-validator';

 function isValidUserName(username){
    var vildate = new RegExp('^\\w[\\w.]{4,14}\\w$');
    if(username.match(vildate)){
        return true;
    }else{
        return false;
    }
}

function isValidPasswd(pass){
    var vildate = new RegExp('^\\w[\\w.]{6,20}\\w$');
    if(pass.match(vildate)){
        return true;
    }else{
        return false;
    }
}


 const isUsernameUsed = async function (username1,myCallback){

    const urlget ='https://dsms0-7e9f.restdb.io/rest/data-scientist?q={"user_name":"' +username1+'"}';
    var optionsget = {
    method: 'GET',
    headers: {
      'cache-control': 'no-cache',
      'x-apikey': 'your api key',
    },
  };


    let response = await fetch(urlget, optionsget);
    let res = await response.json().then(res => {
        if(res[0]){
            console.log("username used")
            
        return true;
         }
          else{
             console.log("username is free")
        return false;
     }

    });
    //console.log(res)
   myCallback(res)
   

}





function isValidEmail(emailtaken) {

    //const noWhitespaceEmail = emailtaken.replace(/\s/g, '');

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(emailtaken) && EmailValidator.validate(emailtaken)) {
        return true;

    } else {

        //alert('Please provide a valid email address');
        // emailtaken.focus;
        return false;
    }
}






function PasswordFiltering(passTaken){

    var passw = /^[A-Za-z]\w{7,14}$/;

    
        if (passTaken.value.match(passw)) {
       
            return true;
        }
        else {
           
            return false;
        } 
}


 function isNotEmptyOrSpaces(str){
    return !(str === null || str.match(/^ *$/) !== null);
}



async function isUsernameORemail(token,callBack){
   
    const urlget ='https://dsms0-7e9f.restdb.io/rest/data-scientist?q={"user_name":"' +token +'"}';
    var optionsget = {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': 'your api key',
      },
    };

    if(isValidEmail(token)){
        console.log('is an email');
        callBack(false,"is an email");
    }else{
        if(isValidUserName(token)){

            console.log('is a username');
      let response = await fetch(urlget, optionsget);
      let res = await response.json();
      
      if(res[0]){
        console.log("ok")
        console.log(res[0].email);
      //  return ([true,res[0].email]);
        callBack(true,res[0].email);
      }else{
        callBack(false,"Incorrect credentials");
       // return ([true,"Incorrect credentials"]);
        console.log("error user not found in rest db");     
      }
      console.log(res[0].email);
      console.log(Date());
      //console.log(token + ' : Data Fetched');
      
    }else{
        console.log("Ivalid username or email");
        callBack(false,"Ivalid username or email");
    }
    }


}

/*

function isUsernamel(token){
    if(isValidEmail(token)){
        return {stat:false,msg:"is an email"};

    }else{
        if(isValidUserName(token)){
            return {stat:true,msg:"is an usernmae"};
        }else{
            return {stat:false,msg:"Inavlid"};
        }

    }


}
*/




export {isValidEmail,isUsernameORemail, PasswordFiltering, isNotEmptyOrSpaces,isValidUserName,isValidPasswd,isUsernameUsed}