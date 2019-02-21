import Bouncer from '../models/Bouncer.js';
import router from '../../app.js';

export default class DashboardView {
  static renderMainView(admin) {
    const mainView = $(`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5">
      <a class="navbar-brand" href="/admin">
        <i class="fas fa-tools"></i>
        Admin
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/admin">Home<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">Go Live</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/logout">Logout</a>
          </li>
        </ul>
        <div class="float-right">
          <span class="text-white">
            Salut, ${admin.local.username}!
          </span>
          <img class="avatar" src="https://avatars0.githubusercontent.com/u/37038281?s=460&v=4">
        </div>
      </div>
    </nav>
    <div class="jumbotron jumbotron-fluid px-5 py-3">
      <div class="overlay">
        <h1 class="display-4">Admin Dashboard</h1>
        <hr>
        <div class="donations-dash">
          <p class="lead"><span id="donations-dash__total-number">123.464</span> de donații efectuate anul acesta</p>
          <div class="donations-dash__eur">
            <span id="donations-dash__amount-eur">1,563.00</span> <i class="fas fa-euro-sign"></i>
          </div>
          <div class="donations-dash__ron">
            <span id="donations-dash__amount-eur">266,533.00</span> <span class="ron-sign">RON</span>
          </div>
          <div class="donations-dash__usd">
            <span id="donations-dash__amount-eur">10,555.22</span> <i class="fas fa-dollar-sign"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid px-5">
      <aside id="side-menu">
        <div class="list-group list-group-flush">
          <a href="/ngos" class="list-group-item list-group-item-action active">
            ONG-uri/Asociatii
          </a>
          <a href="/causes" class="list-group-item list-group-item-action">Cauze sociale</a>
          <a href="/donations" class="list-group-item list-group-item-action">Donații</a>
          <a href="/users" class="list-group-item list-group-item-action">Utilizatori</a>
          <a href="/comments" class="list-group-item list-group-item-action">Comentarii/Postări</a>
        </div>
      </aside>
      <section id="main-content">
        <h1>Main Content on the page</h1>
        <article id="main-details">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda a eligendi inventore corporis, laborum
            qui? Id, expedita molestias, vel totam fugiat quam magni natus reiciendis quisquam asperiores eveniet!
            Nesciunt, optio!
            Nisi in ratione, molestiae animi laborum placeat eaque est nostrum velit facere rerum cumque temporibus
            ullam ipsa repudiandae aliquid explicabo? Impedit dolore iure nemo, earum voluptas nam libero perspiciatis
            odio.
            Sapiente necessitatibus rerum illum quis vero, amet similique laudantium sequi commodi quam ex quos qui
            dolore sint optio facere inventore rem, libero ipsum tempore illo eum harum, at architecto? Dolorum.
          </p>
        </article>
      </section>
    </div>      
    `);

    const footer = $(`
      <footer>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5">
          <p class="w-100 text-center text-light">
            &copy; Școala Informală de IT, Craiova, 2019
          </p>
        </nav>
      </footer>
    `);

    $('#app-view').removeClass('admin-login__view');
    $('#app-view').empty().append(mainView);
    // footer.insertAfter('#app-view');

    DashboardView.addEventListeners();
  }

  static navigateToRouteByHref($anchor) {
    const route = $anchor.attr('href');
    router.navigate(route);
  }

  static clearActiveLink() {
    const sideMenuLinks = $('.list-group.list-group-flush a');
    sideMenuLinks.each(function () {
      $(this).removeClass('active');
    });
  }

  static addEventListeners() {
    $('a[href="/ngos"]').click(function (e) {
      e.preventDefault();
      DashboardView.clearActiveLink();
      DashboardView.navigateToRouteByHref($(this));
      $(this).addClass('active');
    });

    $('a[href="/causes"]').click(function (e) {
      e.preventDefault();
      DashboardView.clearActiveLink();
      DashboardView.navigateToRouteByHref($(this));
      $(this).addClass('active');
    });

    $('a[href="/donations"]').click(function (e) {
      e.preventDefault();
      DashboardView.clearActiveLink();
      DashboardView.navigateToRouteByHref($(this));
      $(this).addClass('active');
    });

    $('a[href="/users"]').click(function (e) {
      e.preventDefault();
      DashboardView.clearActiveLink();
      DashboardView.navigateToRouteByHref($(this));
      $(this).addClass('active');
    });

    $('a[href="/comments"]').click(function (e) {
      e.preventDefault();
      DashboardView.clearActiveLink();
      DashboardView.navigateToRouteByHref($(this));
      $(this).addClass('active');
    });

    $('a[href="/logout"]').click(function (e) {
      e.preventDefault();
      Bouncer.adminLogout();
    });
  }
}