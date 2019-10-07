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

const showMain = () => {
  cont1.classList.remove("showMe");
  cont1.classList.add("hideMe");
  cont2.classList.remove("hideMe");
  cont2.classList.add("showMe");  
}

const mainPage = async () => {
    let response = await fetch (`/signin?username=${username.value}&email=${email.value}`,{
        method: 'GET',
        mode: "no-cors",
        content: 'application/json'
    });
    var e = document.querySelector("ul"); 
        var child = e.lastElementChild;  
        while (child) { 
        e.removeChild(child); 
        child = e.lastElementChild;
        }
    let data = await response.json();
    if (data.length == 0) {
        const element = document.querySelector('.wobbleMe')
        element.classList.add('animated', 'wobble')
        console.log("You are not registered! Please sign up")
    } else {
        
        showMain();
        for (let i = 0; i < data.length; i++) {
            let deleteButton = "delButton";
            let ul = document.getElementById("myUL");
            let li = document.createElement("li");
            let button = document.createElement("button");
            button.setAttribute('id', deleteButton)
            li.appendChild(document.createTextNode(data[i].reminder_content));
            li.appendChild(button);
            ul.appendChild(li);
            button.addEventListener("click", ()=> {
            removeFromList(data[i].reminder_id)
            })
        }
        usersName.innerText = `Welcome back ${username.value}`  
    }
    currentUsername = username.value;
    currentEmail = email.value;
}

addToList.addEventListener("click", async ()=> {
    let response = await fetch(`/addreminder?username=${currentUsername}&email=${currentEmail}&reminderContent=${reminderContent.value}`);
    mainPage();
});

const removeFromList = async (reminder_id)=> {
  let response = await fetch(`/deletereminder?username=${currentUsername}&email=${currentEmail}&reminder_id=${reminder_id}`);
  mainPage()
};

signInButton.addEventListener("click", ()=> mainPage())

myRegister = () => {
document.getElementById('Register').style.display = "none";
}

const signOut = () => {
    cont1.classList.remove("hideMe");
    cont1.classList.add("showMe");
    cont2.classList.remove("showMe");
    cont2.classList.add("hideMe");
    currentUsername = "";
    currentEmail = "";
    username.value = "";
    email.value = "";
}

document.getElementById('sign-outbtn').addEventListener('click', ()=> signOut());

// function change
function chg() {
    document.getElementById("remindertable").style.width = "80%";
    document.getElementById("remindertable").style.height = "80%";
  }

  function chg2() {
    document.getElementById("remindertable").style.width = "30%";
    document.getElementById("remindertable").style.height = "30%";
  }