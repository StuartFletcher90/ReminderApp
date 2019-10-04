const cont1 = document.getElementsByClassName("container")[0];
const cont2 = document.getElementsByClassName("container-two")[0];

// Sign in button stufff
document.getElementById("sign-upbtn").addEventListener("click", function () {
    document.getElementById("splash2").style.display = "none";
    document.getElementById("sign-inbtn").style.display = "block";
    document.getElementById("username-input").style.display = "block";
    document.getElementById("email-input").style.display = "block";
    document.getElementById("returnbtn").style.display = "block";
    document.getElementById("register-details").style.display = "none";
});

//return button
document.getElementById("returnbtn").addEventListener("click", function () {
    document.getElementById("splash2").style.display = "block";
    document.getElementById("username-input").style.display = "none";
    document.getElementById("email-input").style.display = "none";
    document.getElementById("returnbtn").style.display = "none";
    document.getElementById("sign-inbtn").style.display = "none";
    document.getElementById("register-details").style.display = "none";
});

// Register button stuff almost carbon copy

document.getElementById("register-btn").addEventListener("click", function () {
    document.getElementById("splash2").style.display = "none";
    document.getElementById("sign-inbtn").style.display = "none";
    document.getElementById("username-input").style.display = "block";
    document.getElementById("email-input").style.display = "block";
    document.getElementById("returnbtn").style.display = "block";
    document.getElementById("register-details").style.display = "block";
});


// input empty test
mySuccess = () => {
    if (document.getElementById("username-input").value===""){
        document.getElementById("sign-inbtn").disabled = true;
    } else {
        document.getElementById("sign-inbtn").disabled = false;
    }
}


const username =  document.getElementById("username-input");
const email =  document.getElementById("email-input");
const signInButton =  document.getElementById("sign-inbtn");
const registerButton =  document.getElementById("register-details");
const addToList = document.getElementById("addtolist");
const usersName = document.getElementById("users-name")
const reminderContent = document.getElementById("myInput");
let currentUsername = "";
let currentEmail = "";

registerButton.addEventListener("click", async () => {
    let response = await fetch(`/add?username=${username.value}&email=${email.value}`);
    let data = await response.json();
    username.value = "";
    email.value = "";
})

signInButton.addEventListener("click", async () => {
    let response = await fetch (`/signin?username=${username.value}&email=${email.value}`,{
        method: 'GET',
        mode: "no-cors",
        content: 'application/json'
    });

    let data = await response.json();
    if (data.length == 0) {
        console.log("You are not registered! Please sign up")
    } else {
        showMain();
        for (let i = 0; i < data.length; i++) {
            let ul = document.getElementById("myUL");
            let li = document.createElement("li");
            let button = document.createElement("button");
            li.appendChild(document.createTextNode(Object.values(data[i])));
            li.appendChild(button);
            ul.appendChild(li);
        }
        usersName.innerText = `Welcome back ${username.value}`
        
    }
    currentUsername = username.value;
    currentEmail = email.value;
});

addToList.addEventListener("click", async ()=> {
    let response = await fetch(`/addreminder?username=${currentUsername}&email=${currentEmail}&reminderContent=${reminderContent.value}`);
    let response2 = await fetch(`/refresh?username=${currentUsername}&email=${currentEmail}`)
    let data = await response2.json();
    for (let i = data.length-1; i < data.length; i++) {
      let ul = document.getElementById("myUL");
      let li = document.createElement("li");
      let button = document.createElement("button");
      li.appendChild(document.createTextNode(Object.values(data[i])));
      li.appendChild(button);
      ul.appendChild(li);
    }
});

removeFromList.addEventListener("click", async ()=> {
  let response = await fetch(`/addreminder?username=${currentUsername}&email=${currentEmail}&reminderContent=${reminderContent.value}`);
    let response2 = await fetch(`/refresh?username=${currentUsername}&email=${currentEmail}`)
    let data = await response2.json();
    for (let i = data.length-1; i < data.length; i++) {
      let ul = document.getElementById("myUL");
      let li = document.createElement("li");
      let button = document.createElement("button");
      li.appendChild(document.createTextNode(Object.values(data[i])));
      li.appendChild(button);
      ul.appendChild(li);
    }
});





myRegister = () => {

    document.getElementById('Register').style.display = "none";
}

const showMain = () => {
    
    cont1.classList.remove("showMe");
    cont1.classList.add("hideMe");
    cont2.classList.remove("hideMe");
    cont2.classList.add("showMe");
    
}

// function change
function chg() {
    document.getElementById("remindertable").style.width = "80%";
    document.getElementById("remindertable").style.height = "80%";
  }

  function chg2() {
    document.getElementById("remindertable").style.width = "30%";
    document.getElementById("remindertable").style.height = "30%";
  }





/! PETERS JS FILE -- REMAINDER PAGE/




// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Please write a reminder!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}