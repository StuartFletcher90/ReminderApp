// Sign in button stufff
document.getElementById("sign-upbtn").addEventListener("click", function() {
    document.getElementById("splash2").style.display = "none";
    document.getElementById("sign-inbtn").style.display = "block";
    document.getElementById("username-input").style.display = "block";
    document.getElementById("email-input").style.display = "block";
    document.getElementById("returnbtn").style.display = "block";
    document.getElementById("register-details").style.display = "none";
});

document.getElementById("returnbtn").addEventListener("click", function() {
    document.getElementById("splash2").style.display = "block";
    document.getElementById("username-input").style.display = "none";
    document.getElementById("email-input").style.display = "none";
    document.getElementById("returnbtn").style.display = "none";
    document.getElementById("sign-inbtn").style.display = "none";
    document.getElementById("register-details").style.display = "none";
});

// Register button stuff almost carbon copy

document.getElementById("register-btn").addEventListener("click", function() {
    document.getElementById("splash2").style.display = "none";
    document.getElementById("sign-inbtn").style.display = "none";
    document.getElementById("username-input").style.display = "block";
    document.getElementById("email-input").style.display = "block";
    document.getElementById("returnbtn").style.display = "block";
    document.getElementById("register-details").style.display = "block";
});

const username =  document.getElementById("username-input");
const email =  document.getElementById("email-input");

const signInButton =  document.getElementById("sign-upbtn");
const registerButton =  document.getElementById("registerbtn");


registerButton.addEventListener("click", async () => {
    let response =  await fetch (`http://localhost:3000/add?username=${username.value}&email=${email.value}`);
    let data = await response.json();
    username.value = "";
    email.value = "";
})

signInButton.addEventListener("click", async () => {
    let response = await fetch (`http://localhost:3000/signIn?username=${username.value}&email=${email.value}`);
    let data = await response.json();
    if (data.length == 0) {
        console.log("You are not registered! Please sign up")
    } else {
        console.log(data.id, data.username, data.email);
    }
    
    username.value = "";
    email.value = "";
});

myRegister = () => {
    document.getElementById('Register').style.display = "none"; 
}
