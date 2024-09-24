const conversations = getMessages();

window.onload = function () {
    populateConversation(1);
    popRandom();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getMessages() {
    console.log(getRandomInt(10));
    var messages = [
        "Hey!", "Hello there", "Knock knock", "Are you there?", "Are you around?", "Did you get my email?", "Are you in the office?", "Cake downstairs!", "Meeting's cancelled!", "Is it Friday yet?", "Thank you!", "Nvm. Got it.", "Did I miss your last message?", "Lunch time", "Back in a bit", "Yes", "Hmm, what do you mean?", "On my way", "See you soon", "Have a minute to chat?", "Back", "Let's talk", "Ok to chat?", "Had your coffee yet?"
    ]
    console.log(messages[getRandomInt(messages.length - 1)]);

    var numFriends = 3;
    var numMessages = 4;
    var conversations = Array(numFriends);
    for (var i = 0; i < numFriends; i++) {
        conversations[i] = Array(numMessages);
        for (var j = 0; j < numMessages; j++) {
            conversations[i][j] = messages[getRandomInt(messages.length - 1)];
        }
    }
    return conversations;
}

function popRandom() {
    populateConversationFromRandom(1, conversations[1]);
    console.log(conversations);
}

function populateConversationFromRandom(idx) {
    var msgs = conversations[idx];
    console.log("getting msgs for " + idx + " : " + msgs);
    var selectedUser = document.getElementsByClassName("user-name")[idx];
    var selectedUserImg = document.getElementsByClassName("user-card-img")[idx];
    var selectedUserImgSrc = selectedUserImg.getElementsByTagName("img")[0].src;
    var convoUser = document.getElementById("conversation-username");
    convoUser.textContent = selectedUser.textContent;

    document.getElementById("line1").innerHTML = "<span class='em'>You</span> 13:32";
    document.getElementById("line2").textContent = msgs[0];
    document.getElementById("line3").textContent = msgs[1];
    document.getElementById("line4").textContent = "2 new messages";
    document.getElementById("line5").innerHTML = "<img id='convo-img' src='" + selectedUserImgSrc + "'><span class='em'>" + convoUser.textContent + "</span> 14:04";
    document.getElementById("line6").textContent = msgs[2];
    document.getElementById("line7").textContent = msgs[3];

    for (var i = 4; i < msgs.length; i++) {
        var newSpan = document.createElement("span");
        newSpan.classList = "sent-message";
        newSpan.textContent = newMsgStr.value;
        element.appendChild(newSpan);
    }
}

function populateConversation(idx) {
    var selectedUser = document.getElementsByClassName("user-name")[idx];
    var selectedUserImg = document.getElementsByClassName("user-card-img")[idx];
    var selectedUserImgSrc = selectedUserImg.getElementsByTagName("img")[0].src;
    var convoUser = document.getElementById("conversation-username");
    convoUser.textContent = selectedUser.textContent;

    document.getElementById("line1").innerHTML = "<span class='em'>You</span> 13:32";
    document.getElementById("line2").textContent = "Hey!";
    document.getElementById("line3").textContent = "Okay, let me know!";
    document.getElementById("line4").textContent = "2 new messages";
    document.getElementById("line5").innerHTML = "<img id='convo-img' src='" + selectedUserImgSrc + "'><span class='em'>" + convoUser.textContent + "</span> 14:04";
    document.getElementById("line6").textContent = "Hey!";
    document.getElementById("line7").textContent = "Ready in 5?";
}

function addMessageToConversations() {
    var idx = document.getElementById("conversation-username").dataset.contactnumber;
    var newMsgStr = document.getElementById("new-message");
    // var element = document.createElement("div");
    // element.classList = "conversation-line sender";

    // var newSpan = document.createElement("span");
    // newSpan.classList = "sent-message";
    // newSpan.textContent = newMsgStr.value;    
    conversations[idx].add(newMsgStr.value);

}

function addMessage() {
    var newMsgStr = document.getElementById("new-message");
    var element = document.createElement("div");
    element.classList = "conversation-line sender";

    var newSpan = document.createElement("span");
    newSpan.classList = "sent-message";
    newSpan.textContent = newMsgStr.value;
    element.appendChild(newSpan);

    var conversation = document.getElementById("conversation-content");
    conversation.appendChild(element);

    newMsgStr.value = "";

    // acknowledge missed messages from active conversation
    var idx = document.getElementById("conversation-username").dataset.contactnumber;
    document.getElementById("line4").classList.add("hide");
    var userCard = document.getElementsByClassName("user-card")[idx];
    var userHeader = userCard.getElementsByClassName("user-card-header")[0];
    userHeader.getElementsByClassName("missed-message-count")[0].innerHTML = 0;

    // scroll the conversation so the latest message is visible
    conversation.scrollTop = conversation.scrollHeight;
}

////////////////////////////
// interactive functions
////////////////////////////
window.onclick = function (event) {
    if (event.target.matches("#send")) {
        clickSend();
    } else if (event.target.matches("#conversation-exit")) {
        document.getElementById("conversation-card").classList.toggle("hide");
    } else if (event.target.matches(".user")) {
        switchActiveUser(event.target);
    } else if (event.target.matches(".show-hide-friends") || event.target.matches(".fa-user-friends")) {
        toggleFriendBar();
    } else if (event.target.matches(".show-message-alerts") || event.target.matches(".fa-envelope")) {
        toggleConversation();
    } else {
        console.log("unrecognized " + event.target.outerHTML);
    }
}


function toggleFriendBar() {
    console.log("toggling friend bar");
    var friendBar = document.getElementById("friendbar");
    friendBar.classList.toggle("hide");
    console.log(friendBar.outerHTML);
}

function toggleConversation() {
    var convoCard = document.getElementById("conversation-card");
    convoCard.classList.toggle("hide");
}

function switchActiveUser(ele) {
    populateConversation(ele.dataset.contactnumber);
    var convoCard = document.getElementById("conversation-card");
    var convoClassList = convoCard.classList;
    if (convoClassList.contains("hide")) {
        convoClassList.remove("hide");
    }
    var convoUsername = document.getElementById("conversation-username");
    convoUsername.dataset.contactnumber = ele.dataset.contactnumber;

    populateConversationFromRandom(convoUsername.dataset.contactnumber);
}

function clickSend() {
    if (!formIsValid()) {
        displayValidationReminders();
        return;
    }
    addMessage();
}

function formIsValid() {
    return document.getElementById("new-message").checkValidity();
}

function displayValidationReminders() {
    var numberFormat = document.getElementById("new-message");
    numberFormat.classList.add("failure");
    setTimeout(function () { numberFormat.classList.toggle("failure"); }, 1000);
}


