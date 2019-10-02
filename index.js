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
    // console.log(data);
    if (data.length == 0) {
        console.log("You are not registered! Please sign up")
    } else {
        console.log(data.id, data.username, data.email, data.reminderId, data.reminderContent);
    }
    
    username.value = "";
    email.value = "";
});

