/**
 * A module to run JSON Schema based validation on request/response data.
 * @module permissions/users
 * @author Syam Marcus
 * @see routes/* for permission confirmation
 */

const AccessControl = require('role-acl');

const ac = new AccessControl();

/** setting user role permissions */
ac.grant('user').condition({ Fn: 'EQUALS', args: { requester: '$.owner' } }).execute('read')
  .on('user', ['*', '!password', '!passwordSalt']);
ac.grant('user').condition({ Fn: 'EQUALS', args: { requester: '$.owner' } }).execute('update')
  .on('user', ['firstName', 'lastName', 'about', 'password', 'email', 'avatarURL']);

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

/** grant permission to readAll request if the user role matches */
exports.readAll = (requester) => ac.can(requester.role).execute('read').sync().on('users');

/** grant permission to read request if the user role matches */
exports.read = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.ID }).execute('read').sync()
  .on('user');

/** grant permission to update request if the user role matches */
exports.update = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data }).execute('update').sync()
  .on('user');

/** grant permission to update request if the user role matches */
exports.update = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.authorID }).execute('update').sync()
  .on('listing');

/** grant permission to delete request if the user role matches */
exports.delete = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.ID }).execute('delete').sync()
  .on('user');
