import router from "../../app.js";

export default class NGOsView {
  static renderListView(list) {
    const container = $('section#main-content');
    container.empty();
    const gridDivision = $('<div id="grid"></div>');
    container.append(gridDivision);
    gridDivision.kendoGrid({
      dataSource: {
        data: list,
        pageSize: 10
      },
      height: 550,
      groupable: true,
      sortable: true,
      pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5
      },
      columns: [{
          template: "<div class='ngo-logo'" +
            "style='background-image: url(#:logo#)'></div>",
          title: 'Logo'
        },
        {
          title: 'Nume',
          field: 'name'
        },
        {
          title: 'Locație',
          field: 'location'
        },
        {
          title: 'Suma',
          field: 'amountRaised'
        },
        {
          title: 'Creat la data',
          field: 'created'
        },
        {
          title: 'Control',
          template: `
          <a class="btn btn-warning" href="/ngos/#:id#/edit">Edit</a>
          <a class="btn btn-danger" href="/ngos/#:id#/delete">Delete</a>
          `
        }
      ]
    });

    NGOsView.addEventListeners();
  }

  static renderEditView(ngo) {
    const container = $('section#main-content');
    container.empty();
    container.append(`
    <form id="ngo-update">
      <div class="form-group">
        <label for="name">Nume ONG/Asociație/Fundație</label>
        <input type="text" class="form-control" id="name" value="${ngo.name}">
      </div>
      <div class="form-group">
        <label for="description">Descriere</label>
        <input type="text" class="form-control" id="description" value="${ngo.description}">
      </div>
      <div class="form-group">
        <label for="description">Locație</label>
        <input type="text" class="form-control" id="description" value="${ngo.location}">
      </div>
      <button type="submit" class="btn btn-primary">Actualizează</button>
    </form>
    `);
  }

  static addEventListeners() {
    $('a.btn').click(function (e) {
      e.preventDefault();
      router.navigate('/ngos/:id/edit');
    });
  }
}