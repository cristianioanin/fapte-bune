export default class UsersView {
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
          title: 'Utilizator',
          field: 'username'
        },
        {
          title: 'Metoda autentificare',
          field: 'authMethod'
        },
        {
          title: 'Email',
          field: 'email'
        },
        {
          title: 'Avatar',
          field: 'avatar'
        },
        {
          title: 'Drepturi Admin',
          field: 'isAdmin'
        }
      ]
    });
  }
}