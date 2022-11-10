


const PostInvite = (Inviter_ID, Invitee_ID,username, Projectid, callBack) => {

    const url = 'https://dsms0-7e9f.restdb.io/rest/invites';
    var options = {
        method: 'POST',

        headers: {
            'cache-control': 'no-cache',
            'x-apikey': 'your api key',
            'content-type': 'application/json',
        },

        body: JSON.stringify({
            InviterID: Inviter_ID,
            InviteeID: Invitee_ID,
            Project_id: Projectid,
            userName:username,
            Invite_state: "Pendening"
        }),
        json: true
    };

    fetch(url, options).then(
        (res) => {
            if (res.ok) {
                //  callBack(true, "")
                console.log("Sent:)");
                callBack("Sent")

            } else {
                // callBack(false, "One or More of the Fields Are Used")
                //console.log(' One or More of the Fields Are Used ');
                //  callBack(true, "")
                console.log('invite POST error-----')
                console.log(res.error);
                callBack("invite POST error")
            }
        }

    )

}

async function getDSInvites(InviterId,ProjectId,callback) {

    const url = 'https://dsms0-7e9f.restdb.io/rest/Invites?q={"Invite_state":"Pendening","InviterID":"'+InviterId+'","Project_id":"'+ProjectId+'"}';
    var options = {
        method: 'GET',
        headers: {
            'cache-control': 'no-cache',
            'x-apikey': 'your api key',
        },
    };
    let response = await fetch(url, options);
    let res = await response.json();

    if (res[0]) {

        callback(true, res, "")
    } else {
        callback(true, "")
        callback(false, {}, "No Invites")
    }


}



async function isInviteSent(inviter, inviteee, ProjectID, callBack) {

    const url = 'https://dsms0-7e9f.restdb.io/rest/Invites?q={"InviterID":"' + inviter + '","InviteeID":"' + inviteee + '","Project_id": "' + ProjectID + '"}';
    var options = {
        method: 'GET',
        headers: {
            'cache-control': 'no-cache',
            'x-apikey': 'your api key',
        },
    };

    let response = await fetch(url, options);
    let res = await response.json();

    if (res[0]) {

        callBack(false, "Already sent")
    } else {
        callBack(true, "")

    }

}


async function cancelInvite(InviteID, callBack) {

    const url = 'https://dsms0-7e9f.restdb.io/rest/invites/' + InviteID + ''

    var options = {
        method: 'DELETE',

        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': 'your api key',
            'content-type': 'application/json'
        }
    };

    //console.log(url)

    let response = await fetch(url, options);
    let res = await response.json();
    //console.log(res)
    if (res.result[0]) {
        console.log("Invite canceled ")
        callBack(true, "Invite canceled")
    } else {
        console.log(" erorr in deletion of invite")
        callBack(false, "Erorr")
    }

}


async function PostNewProject(username, projectname, Pinfo, roles, callBack, navigation, userdata) {

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
            defultRoles: roles
        }),
        json: true,
    };

    try {
        let res = await fetch(url, options);
        let jsondata = await res.json();
        //console.log('The User : ' + username + ' Create a New PROJECT');
        console.log(Date());
       // console.log(userdata)
        navigation.navigate('Test', { userr: userdata[0] });
    } catch (error) {

        alert(error);
        callBack(false, error);
    }

}

async function getCollectedPhotos(ProjectID,callback) {

    const url = 'https://dsms0-7e9f.restdb.io/rest/data?q={"data_belongs_to_project_id":"' + ProjectID + '"}';
    var options = {
        method: 'GET',
        headers: {
            'cache-control': 'no-cache',
            'x-apikey': 'your api key',
        },
    };

    let response = await fetch(url, options);
    let res = await response.json();
    // console.log(res)
    if (res[0]) {

        callback(true, "",res)
    } else {
        callback(false, "No collected Samples")

    }


}

/* 
    async function getNameofInvitees(ID,callback){
        //&h={"$fields": {"user_id": 1, "status": 1}

            const url = 'https://dsms0-7e9f.restdb.io/rest/contributors?q={"_id":"' + ID + '"}&h={"$fields": {"user_name": 1}}';
    var options = {
        method: 'GET',
        headers: {
            'cache-control': 'no-cache',
            'x-apikey': 'your api key',
        },
    };

    let response = await fetch(url, options);
    let res = await response.json();
    // console.log(res)
    if (res[0]) {

        callback(true, "",res)
    } else {
        callback(false, "Error")

    }


    }
 */



    async function CollectedDataQuery(ProjectID,callback){
        //https://dsms0-7e9f.restdb.io/rest/data


        const url = 'https://dsms0-7e9f.restdb.io/rest/data?q={"data_belongs_to_project_id":"' + ProjectID + '"}';
        var options = {
            method: 'GET',
            headers: {
                'cache-control': 'no-cache',
                'x-apikey': 'your api key',
            },
        };
    
        let response = await fetch(url, options);
        let res = await response.json();
        // console.log(res)
        if (res[0]) {
    
            callback(true, "",res)
        } else {
            callback(false, "Error")
    
        }
    }



export {CollectedDataQuery,getCollectedPhotos, PostNewProject, PostInvite, isInviteSent, getDSInvites, cancelInvite }