export default class CausesView {
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
          title: 'Nume',
          field: 'name'
        },
        {
          title: 'Locație',
          field: 'location'
        },
        {
          title: 'Suma necesară',
          field: 'needsToRaise'
        },
        {
          title: 'Donații până acum',
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