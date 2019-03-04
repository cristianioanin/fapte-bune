import API from '../../config.js';
import router from '../../app.js';
import NGOsView from '../views/ngosView.js';

export default class NGO {
  constructor(ngoRecord) {
    this.name = ngoRecord.name;
    this.logo = ngoRecord.logo;
    this.description = ngoRecord.description;
    this.location = ngoRecord.location;
    this.lat = ngoRecord.lat;
    this.lng = ngoRecord.lng;
    this.created = new Date(ngoRecord.created).toLocaleDateString();
    this.author = ngoRecord.author;
    this.amountRaised = ngoRecord.amountRaised;
    this.comments = ngoRecord.comments;
    this.donations = ngoRecord.donations;
  }

  static getAllRecords() {
    $.ajax({
      url: `${API}/ngos`,
      method: 'GET'
    }).done((ngos) => {
      const ngosList = ngos.map(ngo => new NGO(ngo));
      NGOsView.renderListView(ngosList);
    });
  }
}