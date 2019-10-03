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
const myRemindersHTML = document.getElementById("my-reminders")
const usersName = document.getElementById("users-name")
const myReminders = []

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
            let li = document.createElement("li");
            let t = document.createTextNode(Object.values(data[i]));
            li.appendChild(t);
            document.getElementById("myUL").appendChild(li);
        }
        usersName.innerText = `Welcome back ${username.value}`
    }
    username.value = "";
    email.value = "";
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
