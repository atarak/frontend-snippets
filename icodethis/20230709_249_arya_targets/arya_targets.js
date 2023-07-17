const users = [
    {
        userID: 1,
        name: "Arya",
        avatar: "https://source.unsplash.com/random/900×700/?headshot&sig=1",
        lists: [

            {
                name: "Targets",
                items: [
                    {
                        itemname: "Cersei Lannister",
                        status: false,
                        itemindex: 0
                    },
                    {
                        itemname: "The Mountain",
                        status: false,
                        itemindex: 1
                    },
                    {
                        itemname: "Walder Frey",
                        status: true,
                        itemindex: 2
                    }
                ],
                index: 0,
                maxitemIndex: 2
            }
        ],
        maxListIndex: 0
    }];


var usersContainer = document.querySelector("#card-user-lists");

var templateListdesc = document.querySelector('#tpl-listdesc');
const templateListItem = document.querySelector("#tpl-listitem");

var listitems = document.querySelector("#listitems");

const currentUser = users[0].name;

const backBtn = document.getElementById("back-btn");
//TODO #45
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
    var listdetails = document.getElementById("card-user-list");
    listdetails.classList.toggle("hide");

    var userlists = document.getElementById("card-user-lists");
    userlists.classList.toggle("hide");
}

function clickAddNewList() {
    var listholder = document.getElementById("lists");
    var desc = templateListdesc.content.cloneNode(true);
    desc.querySelector(".listname").innerHTML = "New List";
    var statusC = 0;
    var number = desc.querySelector(".number");
    number.innerHTML = 0;
    desc.querySelector(".listsummary").addEventListener("touchstart", clickListNameToOpenItemsView, false);
    desc.querySelector(".listsummary").addEventListener("click", clickListNameToOpenItemsView, false);
    listholder.append(desc);
    if (!(addToUserList(currentUser, { name: "New List", items: [] }))) {
        console.log("could not find username: " + currentUser);
    }
    var percentage = 0;
    loadProgress(number, percentage * 100);
    console.log(users[0]);
}

function clickAddNewItem(e) {
    var listitems = document.getElementById("listitems");
    var item = templateListItem.content.cloneNode(true);
    item.querySelector(".itemname").value = "New Item";
    item.querySelector(".itemstatusbox").checked = false;
    item.querySelector(".itemstatus").addEventListener("onclick", clickItemStatus, false);
    listitems.append(item);
    var index = document.getElementById("listname-header").dataset.listindex;
    var newitem = { itemname: "New Item", status: false };
    addToUserListItems(currentUser, index, newitem);
}

function clickBack() {
    console.log(users);
    loadUserLists(getUserDetailsByName(currentUser));
    toggleUserList();
}

function clickListNameToOpenItemsView(e) {
    console.log("clicked list name");
    console.log(e);
    var listname = e;
    if (e.target) {
        listname = e.target.innerHTML;
        if (e.target.querySelector(".listname")) {
            listname = e.target.querySelector(".listname").innerHTML;
        }
    } else if (e.querySelector(".listname")) {
        listname = e.querySelector(".listname").innerHTML;
    }
    loadUserItemList(currentUser, listname);
}

function clickItemNameToEdit(e) {

}

function clickItemStatus(e) {
    var parentItem = e.parentElement;
    console.log("changing " + e.parentElement.innerHTML + " to " + parentItem.querySelector("input").checked);
    e.classList.toggle("completed");
    parentItem.querySelector(".itemstatusbox").checked = !(parentItem.querySelector(".itemstatusbox").checked);
    console.log(parentItem.querySelector("input").checked);


}


function loadUserLists(user) {

    console.log("loading user lists");
    console.log(users);
    var cardlists = document.getElementById("card-user-lists");
    console.log(cardlists);
    var listsumm = cardlists.querySelector("#user-lists-header");
    var useravatar = listsumm.querySelector(".user-avatar");
    useravatar.querySelector("img").src = user.avatar;
    useravatar.querySelector("[user-name]").innerText = user.name;

    const userLists = user.lists;
    var listholder = cardlists.querySelector("#lists");
    listholder.innerHTML = "";


    for (var i = 0; i < userLists.length; i++) {
        var desc = templateListdesc.content.cloneNode(true);
        console.log("empty desc: " + desc);
        desc.querySelector(".listname").innerHTML = userLists[i].name;
        var statusC = statusCounter(userLists[i].items);
        console.log(statusC);
        var number = desc.querySelector(".number");
        number.innerHTML = isNaN(Number(statusC[false])) ? 0 : Number(statusC[false]);
        desc.querySelector(".listsummary").addEventListener("touchstart", clickListNameToOpenItemsView, false);
        listholder.append(desc);
        var percentage = Number(statusC[false]) / ((Number(statusC[false]) + Number(statusC[true])));
        loadProgress(number, percentage * 100);
    }

    var cardExits = listsumm.querySelector("#exit-user-lists");
    cardExits.addEventListener("click", exitCardList, false);
}


function loadUserItemList(username, listname) {
    toggleUserList();
    var listnameheader = document.getElementById("listname-header");
    listnameheader.value = listname;
    var userListDetails = getUserListDetailsByName(username, listname);
    if (userListDetails) {
        listnameheader.dataset.listindex = userListDetails.index;
    }
    var itemlist = getUserListsByName(username, listname);
    if (!(itemlist)) {
        console.log("could not find " + listname);
    }
    listitems.innerHTML = "";
    for (var i = 0; i < itemlist.length; i++) {
        var item = templateListItem.content.cloneNode(true);
        item.querySelector(".itemname").value = itemlist[i].itemname;
        item.querySelector(".itemstatusbox").checked = itemlist[i].status;
        listitems.append(item);
    }
    listnameheader.addEventListener("change", changeListName, false);
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

function getUserListDetailsByName(username, listname) {
    var userlists = getUserLists(username);
    if (userlists) {
        for (var i = 0; i < userlists.length; i++) {
            if (userlists[i].name == listname) {
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


function addToUserList(username, newList) {
    var user = getUserDetailsByName(username);
    if (user) {
        if (user.lists.length == 0) {
            newList.maxItemIndex = 0;
            newList.index = 0;
            user.maxListIndex = 0;
        } else {
            user.maxListIndex += 1;
            newList.index = user.maxListIndex;
            newList.maxItemIndex = newList.length;
        }
        user.lists = user.lists.concat(newList);
        return true;
    }
    return false;
}

function addToUserListItems(username, listIndex, newItem) {
    var userlist = getUserListByIndex(username, listIndex);
    if (userlist) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == currentUser) {
                users[i].lists[listIndex].items.push(newItem);
                console.log(users[i].lists[listIndex]);
                return true;
            }
        }
    }
    return false;
}


function changeListName(e) {
    setUserListName(currentUser, e.target.value, e.target.dataset.listindex);
}

function changeListItemName(e) {
    setUserListItemName(currentUser, e.target.value, e.target.dataset.listindex);
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
    a = document.getElementsByClassName("listname");
    for (i = 0; i < a.length; i++) {
        var txtValue = a[i].innerHTML;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].parentElement.style.display = "";
        } else {
            a[i].parentElement.style.display = "none";
        }
    }
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
