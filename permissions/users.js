/**
 * A module to run JSON Schema based validation on request/response data.
 * @module permissions/users
 * @author Syam Marcus
 * @see routes/* for permission confirmation
 */

const AccessControl = require('role-acl');

const ac = new AccessControl();

/** setting user role permissions for routes */
ac.grant('user').condition({ Fn: 'EQUALS', args: { requester: '$.owner' } }).execute('update')
  .on('user', ['firstName', 'lastName', 'about', 'password', 'email', 'avatarURL']);

ac.grant('user').condition({ Fn: 'EQUALS', args: { requester: '$.owner' } }).execute('read')
  .on('listing');
ac.grant('user').condition({ Fn: 'EQUALS', args: { requester: '$.owner' } }).execute('delete')
  .on('listing');
ac.grant('user').condition({ Fn: 'EQUALS', args: { requester: '$.owner' } }).execute('update')
  .on('listing', ['title', 'breed', 'summary']);

ac.grant('admin').execute('read').on('user');
ac.grant('admin').execute('read').on('users');
ac.grant('admin').execute('update').on('user');
ac.grant('admin').condition({
  Fn: 'NOT_EQUALS',
  args:
    { requester: '$.owner' },
}).execute('delete').on('user');

ac.grant('admin').execute('read').on('listing');
ac.grant('admin').execute('create').on('listing');
ac.grant('admin').execute('update').on('listing');
ac.grant('admin').execute('delete').on('listing');

/** grant permission to readAll users request if the user role matches */
exports.readAllUsers = (requester) => ac.can(requester.role).execute('read').sync().on('users');

/** grant permission to update user request if the user role matches */
exports.updateUser = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.authorID }).execute('update').sync()
  .on('user');

/** grant permission to delete user request if the user role matches */
exports.deleteUser = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.authorID }).execute('delete').sync()
  .on('user');

/** grant permission to read listing request if the user role matches */
exports.readListing = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.authorID }).execute('read').sync()
  .on('listing');

/** grant permission to update listing request if the user role matches */
exports.createListing = (requester) => ac.can(requester.role).execute('create').sync().on('listing');

/** grant permission to update listing request if the user role matches */
exports.updateListing = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.authorID }).execute('update').sync()
  .on('listing');

/** grant permission to delete user request if the user role matches */
exports.deleteListing = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.authorID }).execute('delete').sync()
  .on('listing');
