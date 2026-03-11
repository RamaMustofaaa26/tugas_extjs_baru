Ext.define("TDK.Gridins", {
  extend: "Ext.form.Panel",
  alias: "widget.Gridins",
  reference: "Gridins",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
    items: [{
        xtype: 'grid',
        pid: "Gridins",
        layout: 'fit',
        padding: 5,
        flex: 1,
        border: true,
        store: {
          // autoLoad: true,
          // autoSync: true,
          fields: ['MODUL', 'NO', 'JENIS_PENDAPATAN', 'HASIL'],
          data: [{ MODUL: 'PENDAPATAN', NO: 1, JENIS_PENDAPATAN: 'Gaji Pokok', },
            { MODUL: 'PENDAPATAN', NO: 2, JENIS_PENDAPATAN: 'HAT (Hadiah Akhir Tahun)'},
            { MODUL: 'PENDAPATAN', NO: 3, JENIS_PENDAPATAN: 'Insentif'},
            { MODUL: 'PENDAPATAN', NO: 4, JENIS_PENDAPATAN: 'BPJS Kesehatan (Perusahaan)'},
            { MODUL: 'PENDAPATAN', NO: 5, JENIS_PENDAPATAN: 'BPJS Ketenagakerjaan (Perusahaan)'}
          ]
        },
        
        plugins: ['filterfield'],
        viewConfig: {
        enableTextSelection: true,
        columnLines: true,
      },
      columns: {
        defaults: {
          filter: { xtype: 'textfield' },
          sortable: true,
        },
        items: [
          { header: 'MODUL', dataIndex: 'MODUL', width: 150, filter: false  },
          { header: 'NO', dataIndex: 'NO', width: 30, filter: false  },
          { header: 'JENIS PENDAPATAN', dataIndex: 'JENIS_PENDAPATAN', width: 200, filter: false  },       
          { header: 'HASIL', dataIndex: 'HASIL', width: 50,
            xtype: 'actioncolumn',
            align: 'center',
            menuDisabled: true,
            stopSelection: false,
            sortable: false,
            filter: false,
            items: [{
              icon: vconfig.getstyle + '/icon/grid.png',
              handler: function (grid, rowIndex, colIndex, item, e, record) {
                  var Gridins = grid.up("Gridins");
                  Gridins.handler_grid_item_click(grid, rowIndex, colIndex, e, item, record);
                },
                tooltip: "Detil Data",
            }]
          },  
        ]
      },
    }],
    dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        "-",
        {
          xtype: 'button',
          tooltip: 'Refresh',
          icon: vconfig.getstyle + "/icon/refresh.gif ",
        },
        "-"
         ]
       }
     ],

     // Handler Actiocolumn
     handler_grid_item_click: function (grid, rowIndex, colIndex, e, item, record) {
      try {
        var mainpage = grid.up('mainpage');
        var popup = Ext.create('TDK.insentif.Layoutins');
        popup.mainpage = mainpage;

        // var FRM = popup.query("form")[0];
        // FRM.getForm().setValues(rec.data);
        popup.show();
      } catch (ex) {
        COMP.TipToast.msgbox('Error', ex.message, { cls: 'danger', delay: 2000 });  
      }
    }
});