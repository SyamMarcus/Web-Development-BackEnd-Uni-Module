const db = require('../helpers/database'); 

//create a new user in the database
exports.create = async function create (user) {
    const query = "INSERT INTO users SET ?";
    const data = await db.run_query(query, user);
    return data;
}
