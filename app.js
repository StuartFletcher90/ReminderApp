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


module.exports = {
    getData,
    addUser,
}

