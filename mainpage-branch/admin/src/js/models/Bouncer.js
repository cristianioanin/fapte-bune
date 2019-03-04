import API from '../../config.js';
import router from '../../app.js';

export default class Bouncer {
  static sendLoginCredentials($form) {
    const formInputs = $form.serializeArray();
    const data = {
      email: formInputs[0].value,
      password: formInputs[1].value
    };
    $.ajax({
      url: `${API}/users/login`,
      method: 'POST',
      data,
      dataType: 'json',
      content: 'application/json',
    }).done(userData => {
      const {
        token,
        user
      } = userData;
      if (user.isAdmin) {
        localStorage.setItem('faptebune_token', token);
        localStorage.setItem('faptebune_admin', JSON.stringify(user));

        router.navigate('/dashboard');
      }
    });
  }

  static checkIfValidToken() {
    const token = localStorage.getItem('faptebune_token');
    $.ajax({
      url: `${API}/users/validate`,
      method: 'POST',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `${token}`);
      }
    }).done((userData) => {
      const {
        token,
        user
      } = userData;
      if (user.isAdmin) {
        localStorage.setItem('faptebune_token', token);
        localStorage.setItem('faptebune_admin', JSON.stringify(user));
        router.navigate('/dashboard');
      }
    }).fail(() => {
      localStorage.removeItem('faptebune_token');
      localStorage.removeItem('faptebune_admin');
      router.navigate('/');
    });
  }

  static adminLogout() {
    const token = localStorage.getItem('faptebune_token');
    $.ajax({
      url: `${API}/users/logout`,
      method: 'POST',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `${token}`);
      }
    }).done(() => {
      localStorage.removeItem('faptebune_token');
      localStorage.removeItem('faptebune_admin');
      router.navigate('/');
    });
  }
}