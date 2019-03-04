export default class DonationsView {
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
      groupable: true,
      sortable: true,
      pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5
      },
      columns: [{
          title: 'Suma',
          field: 'amount'
        },
        {
          title: 'Moneda',
          field: 'currency'
        },
        {
          title: 'Donator',
          field: 'author.username'
        },
        {
          title: 'Creat la data',
          field: 'created'
        }
      ]
    });
  }
}