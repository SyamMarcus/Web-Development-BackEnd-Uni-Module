const db = require('../helpers/database'); 

exports.getAll = async function getAll (page, limit, order) { 
    // TODO: use page, limit, order to give pagination 
    let query = "SELECT * FROM users;"; 
    let data = await db.run_query(query); 
    return data; 
}

//create a new user in the database
exports.create = async function create (user) {
    const query = "INSERT INTO users SET ?";
    const data = await db.run_query(query, user);
    return data;
}

//get a single user by the (unique) username
exports.findByUsername = async function getByUsername(username) {
    const query = "SELECT * FROM users WHERE username = ?;";
    const user = await db.run_query(query, username);
    return user;
}