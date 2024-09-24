const selectedpic = document.getElementById("center-circle");
const userpics = document.querySelectorAll(".user-pic");
const templateUserpic = document.getElementById("tpl-user-pic");
const userlist = document.getElementById("team-list");
const selectedUser = document.getElementById("selected-user");
const selectedImg = document.getElementsByClassName("selected");
var css_root = document.querySelector(':root');

loadTeam();

function setSelected(target) {
    selectedpic.style.backgroundImage = target.style.backgroundImage;
    for (var i = 0; i < selectedImg.length; i++) {
        selectedImg[i].classList.remove("selected");
    }
    target.classList.add('selected');
    selectedUser.innerHTML = target.querySelector(".user-name").innerHTML + " - " + target.querySelector(".user-title").innerHTML;
}

function loadTeam() {
    var allUsers = getTeamData();

    for (var i = 0; i < allUsers.length; i++) {
        var newUsertpl = templateUserpic.content.cloneNode(true);
        var newUser = newUsertpl.querySelector(".user-pic");
        newUser.id = allUsers[i].userid;
        newUser.style.backgroundImage = "url(" + allUsers[i].userimg + ")";
        newUser.querySelector(".user-name").innerHTML = allUsers[i].username;
        newUser.querySelector(".user-title").innerHTML = allUsers[i].usertitle;
        newUser.addEventListener("click", function (e) { setSelected(e.target); });
        if (i == 0) {
            setSelected(newUser);
        }
        userlist.appendChild(newUser);
    }

}

function getTeamData() {
    return [
        {
            "userid": 1,
            "username": "Bert Gunnar",
            "usertitle": "Backend Developer",
            "userimg": "https://images.unsplash.com/photo-1678986515371-893047863e81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "userid": 2,
            "username": "Fredenandaus Yacouba",
            "usertitle": "Backend Developer",
            "userimg": "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "userid": 3,
            "username": "Jordyn Julia",
            "usertitle": "Backend Developer",
            "userimg": "https://images.unsplash.com/photo-1533674689012-136b487b7736?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "userid": 4,
            "username": "David Chimo",
            "usertitle": "Backend Developer",
            "userimg": "https://images.unsplash.com/photo-1596075780750-81249df16d19?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "userid": 5,
            "username": "Carmen Dechen",
            "usertitle": "Backend Developer",
            "userimg": "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "userid": 6,
            "username": "Livia Sarita",
            "usertitle": "Backend Developer",
            "userimg": "https://images.unsplash.com/photo-1493050261174-9e48e90f6773?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "userid": 7,
            "username": "Ioan Pieter",
            "usertitle": "Backend Developer",
            "userimg": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "userid": 8,
            "username": "Ingrid Lillemor",
            "usertitle": "Backend Developer",
            "userimg": "https://images.unsplash.com/photo-1495924979005-79104481a52f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];
}