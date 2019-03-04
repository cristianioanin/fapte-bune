import API from '../../config.js';
import router from '../../app.js';
import CausesView from '../views/CausesView.js';

export default class Cause {
  constructor(causeRecord) {
    this.name = causeRecord.name;
    this.description = causeRecord.description;
    this.location = causeRecord.location;
    this.lat = causeRecord.lat;
    this.lng = causeRecord.lng;
    this.created = new Date(causeRecord.created).toLocaleDateString();
    this.author = causeRecord.author;
    this.needsToRaise = causeRecord.needsToRaise;
    this.amountRaised = causeRecord.amountRaised;
    this.comments = causeRecord.comments;
    this.donations = causeRecord.donations;
  }

  static getAllRecords() {
    $.ajax({
      url: `${API}/causes`,
      method: 'GET'
    }).done((causes) => {
      const causesList = causes.map(cause => new Cause(cause));
      CausesView.renderListView(causesList);
    });
  }
}