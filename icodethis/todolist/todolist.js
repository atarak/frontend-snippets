const users = [
    {
        userID: 1,
        name: "Aryana",
        avatar: "https://source.unsplash.com/random/900×700/?headshot&sig=1",
        lists: [

            {
                name: "Targets",
                items: [
                    {
                        itemname: "Cersei Lannister",
                        status: false
                    },
                    {
                        itemname: "The Mountain",
                        status: false
                    },
                    {
                        itemname: "Walder Frey",
                        status: true
                    }
                ],
                index: 0
            }
        ]
    }];


// const chatHeader = document.querySelector("#listsumm-user");
var usersContainer = document.querySelector("#card-user-lists");
const templateListSummary = document.querySelector('#tpl-listsummary');
// console.log("template: " + templateListSummary.innerHTML);

var templateListdesc = document.querySelector('#tpl-listdesc');
// console.log('listdesc template: ' + templateListdesc.innerHTML);

const templateListItem = document.querySelector("#tpl-listitem");
var listitems = document.querySelector("#listitems");

const currentUser = users[0].name;

const backBtn = document.getElementById("back-btn");
if (backBtn) {
    backBtn.addEventListener("click", clickBack, false);
}

window.onload = function () {

    const loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", clickLogin, false);

    users.forEach(user => {
        loadUserLists(user);
    })

    const addNewListBtn = document.getElementById("addNewListBtn");
    addNewListBtn.addEventListener("click", clickAddNewList, false);

}

function statusCounter(itemsList) {
    var statuses = {};
    for (var i = 0; i < itemsList.length; i++) {
        if (!(itemsList[i].status in statuses)) {
            statuses[itemsList[i].status] = 0;
        }
        statuses[itemsList[i].status] += 1;
    }
    return statuses;
}

function setChatHeader(name) {
    chatHeader.innerText = name;
}


function clickLogin() {
    if (!formIsValid()) {
        // displayValidationReminders();
        return;
    }
    toggleUserSelect();
}

function formIsValid() {
    return true;
}

function toggleUserSelect() {
    var logincard = document.getElementById("card-user-login");
    logincard.classList.toggle("hide");

    var userlists = document.getElementById("card-user-lists");
    userlists.classList.toggle("hide");
}

function exitCardList() {
    toggleUserSelect();
}

function toggleUserList() {
    console.log("toggling user list");
    var listdetails = document.getElementById("card-user-list");
    listdetails.classList.toggle("hide");

    var userlists = document.getElementById("card-user-lists");
    userlists.classList.toggle("hide");
}

function loadProgress(number, value) {
    document.documentElement.style
        .setProperty('--dashoffset', (1 - value / 100) * 450 + 'px');

    let counter = 0;

    console.log("number is " + number.innerHTML);
    setInterval(() => {
        if (counter >= value) {
            clearInterval;
        } else {
            counter += 1;
            // number.innerHTML = `${value}%`;
        }
    }, 30);
}

function clickBack() {
    console.log(users);
    loadUserLists(getUserDetailsByName(currentUser));
    toggleUserList();
}

function clickAddNewList() {
    var listholder = document.getElementsByClassName("lists")[0];
    console.log("looking at listholder: " + listholder.innerHTML);
    var desc = templateListdesc.content.cloneNode(true);
    console.log(desc);
    desc.querySelector(".listname").innerHTML = "New List";
    var statusC = 0;
    console.log(statusC);
    // desc.querySelector(".listprogress").innerHTML = statusC[false] + " / " + (Number(statusC[false]) + Number(statusC[true]));
    var number = desc.querySelector(".number");
    number.innerHTML = 0;
    desc.querySelector(".listsummary").addEventListener("touchstart", clickListName, false);
    listholder.append(desc);
    if (!(addToUserList(currentUser, { name: "New List", items: [] }))) {
        console.log("could not find username: " + currentUser);
    }
    var percentage = 0;
    loadProgress(number, percentage * 100);
    console.log(users[0]);
}

function getUserLists(username) {
    var noLists = undefined;
    for (var i = 0; i < users.length; i++) {
        if (users[i].name == username) {
            return users[i].lists;
        }
    }
    return noLists;
}

function addToUserList(username, newList) {
    var userlist = getUserLists(username);
    if (userlist) {
        // console.log("currently, " + userlist.length);
        newList.index = userlist.length;
        userlist = userlist.concat(newList);
        // console.log("now length is " + userlist.length);
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == currentUser) {
                users[i].lists = userlist;
                return true;
            }
        }
    }
    return false;
}

function clickListName(e) {
    console.log("clicked list name");
    var listname = e.target.innerHTML;
    if (e.target.querySelector(".listname")) {
        listname = e.target.querySelector(".listname").innerHTML;
    }
    loadUserItemList(currentUser, listname);
}

function loadUserLists(user) {

    console.log("loading user lists");
    console.log(users);
    const listsumm = templateListSummary.content.cloneNode(true);

    listsumm.querySelector("img").src = user.avatar;
    listsumm.querySelector("[user-name]").innerText = user.name;

    const numLists = user.lists.length;

    // add eventl listener to button
    const listBlock = listsumm.querySelector("[listwrapper]");

    const userLists = user.lists;
    var listholder = listsumm.querySelector(".lists");

    while (listholder.firstElementChild) {
        listholder.removeChild(listholder.firstElementChild);
    }
    console.log("here's listholder's innerhtml");
    console.log(listholder.innerHTML);
    // console.log("user lists: " + listsumm.querySelector(".listname").innerHTML);

    for (var i = 0; i < 1; i++) {
        var desc = templateListdesc.content.cloneNode(true);
        console.log("empty desc: " + desc);
        desc.querySelector(".listname").innerHTML = userLists[i].name;
        var statusC = statusCounter(userLists[i].items);
        console.log(statusC);
        var number = desc.querySelector(".number");
        number.innerHTML = Number(statusC[false]);
        desc.querySelector(".listsummary").addEventListener("touchstart", clickListName, false);
        listholder.append(desc);
        var percentage = Number(statusC[false]) / ((Number(statusC[false]) + Number(statusC[true])));
        loadProgress(number, percentage * 100);
    }

    var cardExits = listsumm.getElementById("exit-user-lists");
    cardExits.addEventListener("click", exitCardList, false);

    // add to dom
    // usersContainer.innerHTML = "";
    var addnewElem = document.getElementById("addnew");
    if (addnewElem) {
        usersContainer.insertBefore(listsumm, addnewElem);
    } else {
        usersContainer.append(listsumm);
    }
}


function loadUserItemList(username, listname) {
    toggleUserList();
    console.log("setting " + username + " and " + listname);
    var listnameheader = document.getElementById("listname-header");
    // listnameheader.innerHTML = listname;
    listnameheader.value = listname;
    listnameheader.dataset.listindex = getUserListDetailsByName(username, listname).index;
    var itemlist = getUserListsByName(username, listname);
    if (!(itemlist)) {
        console.log("could not find " + listname);
    }
    while (listitems.firstElementChild) {
        listitems.removeChild(listitems.firstElementChild);
    }
    for (var i = 0; i < itemlist.length; i++) {
        var item = templateListItem.content.cloneNode(true);
        item.querySelector(".itemname").innerHTML = itemlist[i].itemname;
        item.querySelector(".itemstatus").querySelector("input").checked = itemlist[i].status;
        listitems.append(item);
    }

    listnameheader.addEventListener("change", saveListName, false);
}

function getUserListDetailsByName(username, listname) {
    var userlists = getUserLists(username);
    if (userlists) {
        for (var i = 0; i < userlists.length; i++) {
            console.log("comparing " + userlists[i].name + " vs " + listname);
            if (userlists[i].name == listname) {
                console.log("found " + userlists[i].name);
                return userlists[i];
            }
        }
    }
    return undefined;
}

function getUserListsByName(username, listname) {
    var list = getUserListDetailsByName(username, listname);
    if (list) {
        return list.items;
    }
    return undefined;
}

function saveListName(e) {
    console.log(e.target.value);
    console.log(e.target.dataset.listindex);
    setUserListName(currentUser, e.target.value, e.target.dataset.listindex);
    console.log("save list name");
    console.log(users);
}

function getUserListByIndex(username, listindex) {
    var noList = undefined;
    if (!(listindex >= 0)) {
        return noList;
    }
    var userlists = getUserLists(username);
    if (userlists) {
        return userlists[listindex];
    }
    return noList;
}

function setUserListName(username, newvalue, listindex) {
    var userlist = getUserListByIndex(username, listindex);
    if (userlist) {
        userlist.name = newvalue;
    }
}

function getUserDetailsByName(username) {
    for (var i = 0; i < users.length; i++) {
        if (username == users[i].name) {
            return users[i];
        }
    }
    return undefined;
}


function filterFunction() {
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_filter
    var input, filter, a, i;
    input = document.getElementById("filter-lists");
    filter = input.value.toUpperCase();
    // div = document.getElementById("myDropdown");
    // a = div.getElementsByClassName("country-item");
    a = document.getElementsByClassName("listname");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText || a.innerHTML;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].parentElement.style.display = "";
        } else {
            a[i].parentElement.style.display = "none";
            // a[i].style.display = "none";
        }
    }
}