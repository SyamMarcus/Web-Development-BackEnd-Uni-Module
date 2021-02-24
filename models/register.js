const db = require('../helpers/database'); 

//create a new user in the database
exports.add = async function add (user) {
    const query = "INSERT INTO users SET ?";
    const data = await db.run_query(query, user);
    return data;
}
