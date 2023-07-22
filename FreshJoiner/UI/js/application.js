function callGroup() {
    console.log("hello");
    var groupId = document.getElementById("groupId").value;
    var playerName = document.getElementById("playerName").value;
    console.log(groupId,playerName);
    localStorage['url'] = 'http://localhost:8123/api';
    localStorage['groupId'] = groupId;
    localStorage['playerName'] = playerName;
    joinGroup().then(data=>{
        location.replace('./messages.html');
        return data;
    }).then(data=>{
        var element = document.getElementById("messageBoard");
        for(each in data){
            console.log(data[each]['message']);
            var para = document.createElement("p");
            var node = document.createTextNode(data[each]['playerName']+'::'+data[each]['message']);
            para.appendChild(node);
            element.appendChild(para);
        }
    });
}

async function joinGroup(){
    var url = localStorage['url'];
    var groupId = localStorage['groupId'];
    var playerName = localStorage['playerName'];
    let response = await fetch(url+'/group/join/'+groupId+'/'+playerName);
    if(response.status == 200){
        return await getAllMessages();
    }
    else{
        return await createGroup();
    }
}

async function createGroup(){
    var url = localStorage['url'];
    var groupId = localStorage['groupId'];
    var playerName = localStorage['playerName'];

    let response = await fetch(url+'/group/create/'+groupId+'/'+playerName);
    if(response.status == 200){
        return await getAllMessages();
    }
    else {
        return await response.json();
    }
}

async function getAllMessages(){
    var url = localStorage['url'];
    var groupId = localStorage['groupId'];
    var playerName = localStorage['playerName'];
    let response = await fetch(url+'/messages/'+groupId);
    let data = response.json();
    return data;
}