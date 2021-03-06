import API from '../../config.js';
import router from '../../app.js';
import NGOsView from '../views/ngosView.js';

export default class NGO {
  constructor(ngoRecord) {
    this.id = ngoRecord._id;
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
      console.log(ngosList);
      NGOsView.renderListView(ngosList);
    });
  }

  static getRecordById(id) {
    $.ajax({
      url: `${API}/ngos/${id}`,
      method: 'GET'
    }).done((ngo) => {
      console.log(ngo);
      NGOsView.renderEditView(ngo);
    });
  }

  static editRecord(id, $form) {
    const token = localStorage.getItem('faptebune_token');
    const formInputs = $form.serializeArray();
    const data = {
      name: formInputs[0].value,
      description: formInputs[1].value,
      location: formInputs[2].value,
      amountRaised: formInputs[3].value
    };
    $.ajax({
      url: `${API}/ngos/${id}`,
      method: 'PUT',
      data,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `${token}`);
      }
    }).done((ngo) => {
      router.navigate('/ngos');
    });
  }
}