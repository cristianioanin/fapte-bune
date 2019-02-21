import API from '../../config.js';
import router from '../../app.js';
import DonationsView from '../views/donationsView.js';

export default class Donation {
  constructor(donationRecord) {
    this.amount = donationRecord.amount;
    this.currency = donationRecord.currency;
    this.created = new Date(donationRecord.created).toLocaleDateString();
    this.author = donationRecord.issuedBy;
  }

  static getAllRecords() {
    const token = localStorage.getItem('faptebune_token');
    $.ajax({
      url: `${API}/donations`,
      method: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `${token}`);
      }
    }).done((donations) => {
      const donationsList = donations.map(donation => new Donation(donation));
      DonationsView.renderListView(donationsList);
    });
  }
}