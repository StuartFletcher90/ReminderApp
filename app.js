const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ReminderAppDB",
});

const promisifiedQuery = promisify(connection.query).bind(connection);

const getData = async () => {
    try {
        let data = await promisifiedQuery("SELECT * FROM users");
        return data;
    } catch (error) {
        console.log(error.sqlMessage);
    }
    connection.end();
}

const addUser = async (username, email) => {
    try {
        let data = await promisifiedQuery(
            `INSERT INTO users (username, email) VALUES ('${username}', '${email}')`);
            console.log("User Added");
    } catch (error) {
        console.log("There was an error adding the user");
    }
}

const signIn = async (username, email) => {
    try {
    let data = await promisifiediQuery(
        `SELECT DISTINCT users.id, reminders.reminder_content, reminders.id AS rId FROM users
        LEFT JOIN reminders ON users.id = reminders.user_id
        WHERE username="${username}" AND email="${email}"`);

        if (data.length == 0) {
            console.log("You are not registered! Please sign up");
            return data;
        } else {
            console.log("Logging you in....")
            return data;
            // {
            // id: data[0].id,
            // username: data[0].username,
            // email: data[0].email, 
            // reminderId: data[0].rId,
            // reminderContent: data[0].reminder_content
            // };
        }   
    } catch (error) {
        console.log("There was an error Signing In")
        
    }
}



    

module.exports = {
    getData,
    addUser,
    signIn,
}

