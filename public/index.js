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
  if (document.getElementById("username-input").value === "") {
    document.getElementById("sign-inbtn").disabled = true;
  } else {
    document.getElementById("sign-inbtn").disabled = false;
  }
}

// Main global vars
const sound = new Audio();
const NotRegged = document.getElementById("NotRegged")
const username = document.getElementById("username-input");
const email = document.getElementById("email-input");
const signInButton = document.getElementById("sign-inbtn");
const registerButton = document.getElementById("register-details");
const addToList = document.getElementById("addtolist");
const usersName = document.getElementById("users-name")
let reminderContent = document.getElementById("myInput");
let currentUsername = "";
let currentEmail = "";

//hides the sign in page, opens the reminder page
const showMain = () => {
  cont1.classList.remove("showMe");
  cont1.classList.add("hideMe");
  cont2.classList.remove("hideMe");
  cont2.classList.add("showMe");
}

// main function, resets and builds the list of reminders after fetching from the database
const mainPage = async () => {
  let response = await fetch(`/signin?username=${username.value}&email=${email.value}`, {
    method: 'GET',
    mode: "no-cors",
    content: 'application/json'
  });
  resetList();
  let data = await response.json();
  if (data.length == 0) {
    NotRegged.innerHTML = "Cannot recognize username or email!"
    sound.src = './quack.mp3';
    sound.play();
    NotRegged.style.color = "red"
    const element = document.querySelector('.wobbleMe')
    element.classList.add('animated', 'wobble')
    setTimeout(()=> { 
      element.classList.remove('animated', 'wobble'); 
    }, 1000);
    username.value = "";
    email.value = "";
  } else {
    NotRegged.innerHTML = "";
    showMain();
    buildList(data);
    usersName.innerText = `Welcome back ${username.value}`
  }
  currentUsername = username.value;
  currentEmail = email.value;

}

// deletes all children in the list
const resetList = () => {
  var ReminderList = document.querySelector("ul");
  var child = ReminderList.lastElementChild;
  while (child) {
    ReminderList.removeChild(child);
    child = ReminderList.lastElementChild;
  }
}

// builds list in HTML UL after fetching from the database
const buildList = (data) => {
  if (data[0].reminder_content == null) {
    let ul = document.getElementById("myUL");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("You have no Reminders!"));
    ul.appendChild(li);
  } else {
    for (let i = 0; i < data.length; i++) {
      let deleteButton = "delButton";
      let ul = document.getElementById("myUL");
      let li = document.createElement("li");
      let span = document.createElement("SPAN");
      span.setAttribute('id', deleteButton)
      li.appendChild(document.createTextNode(data[i].reminder_content));
      let txt = document.createTextNode("\u00D7");
      span.appendChild(txt);
      li.appendChild(span);
      ul.appendChild(li);
      span.addEventListener("click", () => {
        removeFromList(data[i].reminder_id)
      })
    }
  }
}

//add reminder to list and database
addToList.addEventListener("click", async () => {
  if (reminderContent.value == "") {
    reminderContent.style.border = "3px solid red"
  } else {
    reminderContent.style.border = "none"
    await fetch(`/addreminder?username=${currentUsername}&email=${currentEmail}&reminderContent=${reminderContent.value}`);
    mainPage();
    reminderContent.value = "";
  }
});

//removes reminder from list and database
const removeFromList = async (reminder_id) => {
  await fetch(`/deletereminder?username=${currentUsername}&email=${currentEmail}&reminder_id=${reminder_id}`);
  mainPage()
};

//signs into reminder user
signInButton.addEventListener("click", ()=> {
  if (username.value === "" || email.value === "") {
    sound.src = './quack.mp3';
    sound.play();
    NotRegged.innerText = "Please enter a valid username and email"
    NotRegged.style.color = "red"
  } else {
    mainPage()
  }
});

//reg new user, chceks if that user already exsists.
registerButton.addEventListener("click", async ()=> {
  let response = await fetch(`/check?username=${username.value}&email=${email.value}`);
  let data = await response.json();
if (data.length > 0) {
    NotRegged.innerText = "Sorry, that username or email already exists"
    NotRegged.style.color = "red"
    sound.src = './quack.mp3';
    sound.play();
    const element = document.querySelector('.wobbleMe')
    element.classList.add('animated', 'wobble')
    setTimeout(()=> { 
      element.classList.remove('animated', 'wobble'); 
    }, 1000);
    username.value = "";
    email.value = "";
} else {
    await fetch(`/add?username=${username.value}&email=${email.value}`);
    NotRegged.innerText = "Thank you for Registering!";
    NotRegged.style.color = "white"
    username.value = "";
    email.value = "";
  
  document.getElementById("splash2").style.display = "block";
  document.getElementById("username-input").style.display = "none";
  document.getElementById("email-input").style.display = "none";
  document.getElementById("returnbtn").style.display = "none";
  document.getElementById("sign-inbtn").style.display = "none";
  document.getElementById("register-details").style.display = "none";
}

});

//signs out, resets vars
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

//function to sign out.
document.getElementById('sign-outbtn').addEventListener('click', () => signOut());

// function to enlarge the reminder screen.

const chg = () => {
  document.getElementById("remindertable").style.width = "80%";
  document.getElementById("remindertable").style.height = "80%";
}

