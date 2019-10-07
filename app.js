const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ReminderAppDB",
});

const promisifiedQuery = promisify(connection.query).bind(connection);


const addUser = async (username, email) => {
    try {
        let data = await promisifiedQuery(
        `INSERT INTO users (username, email) VALUES ('${username}', '${email}')`);
        console.log("User Added");
        signIn(username, email);
    } catch (error) {
        console.log("There was an error adding the user");
    }
}

const addReminder = async (username, email, reminderContent) => {
    try {
        let data = await promisifiedQuery (
            `INSERT INTO reminders (user_id, reminder_content) SELECT id, "${reminderContent}" FROM users WHERE username="${username}" AND email="${email}"`);
            console.log("Reminder Added");

    } catch (error) {
        console.log(error)
        console.log("There was an error adding a reminder")
    }
}

const signIn = async (username, email) => {
    try {
        let data = await promisifiedQuery(
            `SELECT username, reminder_id, reminder_content FROM reminders
            RIGHT JOIN users ON reminders.user_id = users.id
            WHERE username="${username}" AND email="${email}" `

        );
        if (data.length == 0) {
            //console.log("You are not registered! Please sign up");
            return data;
        } else {
            console.log("Logging you in....")
            return data;
        }   

    } catch (error) {
        console.log(error)
        console.log("There was an error Signing In")
        
    }
}

const refresh = async (username, email) => {
    try {
        let data = await promisifiedQuery(
            `SELECT reminder_content FROM reminders
            RIGHT JOIN users ON reminders.user_id = users.id
            WHERE username="${username}" AND email="${email}"`
        );
        return data;

    } catch (error) {
        console.log(data)
    }
}

const deleteRem = async (username, email, reminder_id) => {
    try {
        let data = await promisifiedQuery(
            `DELETE reminders FROM reminders 
            RIGHT JOIN users ON reminders.user_id = users.id
            WHERE reminder_id="${reminder_id}" AND username="${username}" AND email="${email}"`
        );
        console.log("Reminder Removed");
        return data;
    } catch (error) {
        console.log(data)
    }
}


module.exports = {
    addUser,
    signIn,
    addReminder,
    refresh,
    deleteRem,
}

