/**
 * A module to run SQL queries for the users table.
 * @module models/users
 * @author Syam Marcus
 * @see routes/* for the routes that require this module
 */

const db = require('../helpers/database');

/**
 * Pass SQL query to DB controller for getting all users, return the query result.
 * @returns {object} all users from the DB
 */
exports.getAll = async function getAll() {
  const query = 'SELECT * FROM users;';
  const data = await db.run_query(query);
  return data;
};

/**
 * Pass SQL query to DB controller for creating a users, return the query result.
 * @param {object} user the request body for creating a new users
 * @returns {object} create a new users in the DB
 */
exports.create = async function create(user) {
  const query = 'INSERT INTO users SET ?';
  const data = await db.run_query(query, user);
  return data;
};

/**
 * Pass SQL query to DB controller for getting specified user, return the query result.
 * @param {number} username the username of user being requested
 * @returns {object} a single user by the (unique) username from the DB
 */
exports.findByUsername = async function getByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = ?;';
  const user = await db.run_query(query, username);
  return user;
};
