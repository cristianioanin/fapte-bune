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
        }
      ]
    });
  }
}