import API from '../../config.js';
import router from '../../app.js';
import UsersView from '../views/usersViews.js';

export default class User {
  constructor(userRecord) {
    this.authMethod = userRecord.authMethod;
    this.username = userRecord[this.authMethod].username;
    this.email = userRecord[this.authMethod].email;
    this.avatar = userRecord[this.authMethod].avatar;
    this.isAdmin = userRecord.isAdmin;
  }

  static getAllRecords() {
    const token = localStorage.getItem('faptebune_token');
    $.ajax({
      url: `${API}/users`,
      method: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `${token}`);
      }
    }).done((users) => {
      const usersList = users.map(user => new User(user));
      UsersView.renderListView(usersList);
    });
  }
}