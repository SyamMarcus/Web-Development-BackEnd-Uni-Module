const db = require('../helpers/database'); 

//fetch all listings
exports.getAll = async function getAll (page, limit, order) { 
  let query = "SELECT * FROM listings;"; 
  let data = await db.run_query(query); 
  return data; 
}

//get a single article by its id 
exports.getById = async function getById (id) { 
  let query = "SELECT * FROM listings WHERE ID = ?";
  let values = [id]; 
  let data = await db.run_query(query, values); 
  return data; 
}

//create a new article in the database
exports.create = async function create (article) {
  const query = "INSERT INTO listings SET ?";
  const data = await db.run_query(query, article);
  return data;
}
