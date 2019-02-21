import BouncerView from './js/views/bouncerView.js';
import Bouncer from './js/models/Bouncer.js';
import DashboardView from './js/views/dashboardView.js';
import NGO from './js/models/NGO.js';
import Cause from './js/models/Cause.js';
import Donation from './js/models/Donation.js';
import User from './js/models/User.js';

const router = new kendo.Router();

router.route('/', function () {
  const token = localStorage.getItem('faptebune_token');
  if (token) {
    Bouncer.checkIfValidToken();
  } else {
    BouncerView.showLoginDialog();
    $('.form-signin').on('submit', function (event) {
      event.preventDefault();
      Bouncer.sendLoginCredentials($(this));
    })
  }
});

router.route('/dashboard', function () {
  const user = JSON.parse(localStorage.getItem('faptebune_admin'));
  DashboardView.renderMainView(user);
});

router.route('/ngos', () => NGO.getAllRecords());
router.route('/causes', () => Cause.getAllRecords());
router.route('/donations', () => Donation.getAllRecords());
router.route('/users', () => User.getAllRecords());
// router.route('/comments', () => Comment.renderAll());

$(function () {
  router.start();
  router.navigate('/');
});

export default router;