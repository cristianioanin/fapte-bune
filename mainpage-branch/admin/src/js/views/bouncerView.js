export default class BouncerView {
  static showLoginDialog() {
    const loginView = $(`
      <div class="container">
        <div class="row">
          <div class="auth-form">
            <h1 class="h3 mb-3 font-weight-normal text-center">Admin Login</h1>
            <form class="form-signin" action="/users/login" method="POST">
              <label for="email" class="sr-only">Email</label>
              <input class="form-control" type="text" name="email" placeholder="email" id="email" autofocus required>
              <label for="password" class="sr-only">Password</label>
              <input class="form-control" type="password" name="password" placeholder="Password" id="password" required>
              <button class="btn btn-lg btn-success btn-block" type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    `);

    $('#app-view').empty().addClass('admin-login__view');
    $('#app-view').append(loginView);
  }
}