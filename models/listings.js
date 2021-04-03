/**
 * A module to run SQL queries for the listings table.
 * @module models/listings
 * @author Syam Marcus
 * @see routes/* for the routes that require this module
 */

 const db = require('../helpers/database'); 

/**
 * Pass SQL query to DB controller for getting all listings, return the query result.
 * @returns {object} all listings from the DB
 */
exports.getAll = async function getAll (page, limit, order) { 
  let query = "SELECT * FROM listings;"; 
  let data = await db.run_query(query); 
  return data; 
}

/**
 * Pass SQL query to DB controller for getting specified listing, return the query result.
 * @param {number} id the ID of article being requested
 * @returns {object} a single article by its id from the DB
 */
exports.getById = async function getById (id) { 
  let query = "SELECT * FROM listings WHERE ID = ?";
  let values = [id]; 
  let data = await db.run_query(query, values); 
  return data; 
}

/**
 * Pass SQL query to DB controller for creating a listing, return the query result.
 * @param {object} article the request body for creating a new listing
 * @returns {object} create a new article in the DB
 */
exports.create = async function create (article) {
  const query = "INSERT INTO listings SET ?";
  const data = await db.run_query(query, article);
  return data;
}


exports.deleteListing = async function deleteListing(id) { 
  let query = "DELETE FROM listings WHERE ID = ?";
  let values = [id]; 
  let data = await db.run_query(query, values); 
  return data; 
}