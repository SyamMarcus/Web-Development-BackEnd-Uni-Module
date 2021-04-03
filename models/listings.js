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
 * @param {number} id the ID of listing being requested
 * @returns {object} a single listing by its id from the DB
 */
exports.getById = async function getById (id) { 
  let query = "SELECT * FROM listings WHERE ID = ?";
  let values = [id]; 
  let data = await db.run_query(query, values); 
  return data; 
}

/**
 * Pass SQL query to DB controller for creating a listing, return the query result.
 * @param {object} listing the request body for creating a new listing
 * @returns {object} create a new listing in the DB
 */
exports.create = async function create (listing) {
  const query = "INSERT INTO listings SET ?";
  const data = await db.run_query(query, listing);
  return data;
}

/**
 * Pass SQL query to DB controller for updating a listing, return the query result.
 * @param {object} listing the request body for information to update a listing with
 * @returns {object} update a listing in the DB
 */
exports.update = async function update (listing) {
  const query = "UPDATE listings SET ? WHERE ID = ?;";
  const values = [listing, listing.ID];
  const data = await db.run_query(query, values);
  return data;
}


/**
 * Pass SQL query to DB controller for deleting a listing, return the query result.
 * @param {object} id the ID of listing requesting deletion
 * @returns {object} delete a listing in the DB
 */
exports.deleteListing = async function deleteListing (id) { 
  let query = "DELETE FROM listings WHERE ID = ?";
  let values = [id]; 
  let data = await db.run_query(query, values); 
  return data; 
}