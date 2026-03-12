Ext.define("TDK.insentif.Gridsum", {
  extend: "Ext.form.Panel",
  alias: "widget.Gridsum",
  reference: "Gridsum",
  xtype: "Gridsum",

  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  layout: { type: "hbox", pack: "start", align: "stretch" },
  border: false,
  frame: false,

  initComponent: function () {
    var me = this;

    Ext.apply(me, {
      items: [
        {
          xtype: "panel",
          border: false,
          frame: false,
          width: 450,
          layout: { type: "vbox", pack: "start", align: "stretch" },
          items: [
            {
              xtype: "grid",
              pid: "Gridsum",
              emptyText: "No Matching Records",
              flex: 1,
              autoScroll: true,
              border: true,
              frame: false,
              store: {
                fields: [
                  { name: Ext.isEmpty(me.groupField) ? "GROUP_FIELD" : me.groupField, type: "string" },
                  { name: "KAR", type: "float" },
                  { name: "TOTAL", type: "float" },
                ],
              },

              plugins: ["filterfield"],
              viewConfig: {
                enableTextSelection: true,
                columnLines: true,
              },
              columns: {
                defaults: {
                  width: 50,
                  menuDisabled: true,
                  sortable: false,
                  filter: { xtype: "textfield" },
                },
                items: [
                  { xtype: "rownumberer", width: 30, filter: false },
                  {
                    header: Ext.isEmpty(me.groupField) ? "Group" : me.groupField.charAt(0).toUpperCase() + me.groupField.slice(1).toLowerCase(),
                    dataIndex: Ext.isEmpty(me.groupField) ? "GROUP_FIELD" : me.groupField,
                    width: 200,
                  },
                  {
                    header: "Kar",
                    dataIndex: "KAR",
                    width: 75,
                    align: "right",
                    tdCls: "column-biru",
                    // renderer: function (v) {
                    //   return Ext.util.Format.number(v || 0, "0,000/i");
                    // },
                  },
                  {
                    header: "Total",
                    dataIndex: "TOTAL",
                    width: 120,
                    align: "right",
                    tdCls: "column-biru",
                    // renderer: function (v) {
                    //   return Ext.util.Format.number(v || 0, "0,000.00/i");
                    // },
                  },
                ],
              },
              listeners: {
                itemclick: function (grid, record, item, index, e) {
                  try {
                    var panel = grid.up("Gridsum");
                    panel.handler_itemclick(grid, record, item, index, e);
                  } catch (ex) {
                    COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
                  }
                },
              },
            },
          ],
          dockedItems: [
            {
              xtype: "toolbar",
              height: 30,
              dock: "bottom",
              style: {
                background: "rgba(237, 231, 246)",
              },
                items: [
                  {
                    // xtype: "tdk-grid-summary",
                    // lokasiPage: me,
                    // lokasiGrid: "grid[pid=GRIDmain]",
                    columnIndex: "TOTAL",
                    width: 180,
                    labelField: "Total Nilai",
                  },
                  "-",
                  {
                    // xtype: "tdk-grid-summary",
                    // lokasiPage: me,
                    // lokasiGrid: "grid[pid=GRIDmain]",
                    columnIndex: "KAR",
                    width: 110,
                    valueFormat: "0,00/i",
                    labelField: "Total Kar",
                  },
                ],
            },
          ],
        },
        { xtype: "tbspacer", width: 10 },
        {
          xtype: "panel",
          border: false,
          frame: false,
          pid: "CTNsubmain",
          flex: 1,
          layout: { type: "fit" },
          items: [
            {
              xtype: "grid",
              pid: "GRIDsubmain",
              emptyText: "No Matching Records",
              autoScroll: true,
              border: true,
              frame: false,
              store: {
                fields: [{ name: "_dummy", type: "string" }],
                data: [],
              },
              plugins: ["filterfield"],
              viewConfig: {
                enableTextSelection: true,
                columnLines: true,
              },
              columns: {
                defaults: {
                  width: 50,
                  menuDisabled: true,
                  sortable: false,
                  filter: { xtype: "textfield" },
                },
                items: [
                  { xtype: "rownumberer", width: 30, filter: false },
                  { header: "Periode", dataIndex: "PRDNO", width: 80 },
                  { header: "NIK", dataIndex: "NIK", width: 80 },
                  { header: "Nama", dataIndex: "NAMA", width: 200 },
                  { header: 'BPJS TK % JHT', dataIndex: 'BPJS_TK_%_JHT', width: 100, },
                  { header: 'BPJS TK % JKM', dataIndex: 'BPJS_TK_%_JKM', width: 100, },
                  { header: 'BPJS TK % JKK', dataIndex: 'BPJS_TK_%_JKK', width: 100, },
                  { header: 'BPJS TK NILAI JHT', dataIndex: 'BPJS_TK_NILAI_JHT', width: 120, },
                  { header: 'BPJS TK NILAI JKM', dataIndex: 'BPJS_TK_NILAI_JKM', width: 120, },
                  { header: 'BPJS TK NILAI JKK', dataIndex: 'BPJS_TK_NILAI_JKK', width: 120, },
                  { header: 'BPJS TK NILAI TOTAL', dataIndex: 'BPJS_TK_NILAI_TOTAL', width: 120, },
                  { header: "Jabatan", dataIndex: "NAMA_JABATAN", width: 110 },
                  { header: "Golongan", dataIndex: "NAMA_GOLONGAN", width: 100 },
                  { header: "St. Kar", dataIndex: "NAMA_STKAR", width: 80 },
                  { header: "St. Kel", dataIndex: "KODE_STKEL", width: 80 },
                  { header: "Divisi", dataIndex: "DIVISI", width: 120 },
                  { header: "Department", dataIndex: "DEPARTMENT", width: 160 },
                  { header: "Seksi", dataIndex: "SEKSI", width: 160 },
                  { header: "Subseksi", dataIndex: "SUBSEKSI", width: 160 },
                  { header: "Maker", dataIndex: "MAKER", width: 100 },
                  { header: "Carline", dataIndex: "CARLINE", width: 100 },
                  { header: "DLIDL", dataIndex: "DLIDL", width: 60 },
                  { header: "PAFA", dataIndex: "PAFA", width: 80 },
                  { header: "Kode Cost", dataIndex: "KODE_COSTCENTER", width: 100 },
                  { header: "Cost Center", dataIndex: "NAMA_COSTCENTER", width: 150 },
                  { header: "Area", dataIndex: "AREA", width: 100 },
                  { header: "Sub Area", dataIndex: "SUBAREA", width: 100 },
                  { header: "Lokasi", dataIndex: "LOKASI", width: 100 },
                  { header: "Sub Lokasi", dataIndex: "SUBLOKASI", width: 100 },
                  { header: "Nama Proses", dataIndex: "NAMAPROSES", width: 100 },
                ],
              },
            },
          ],
        },
      ],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          style: {
            background: "rgba(237, 231, 246)",
          },
          items: [
        "->",
        {
          text: "download",
          icon: vconfig.getstyle + "icon/excel.ico",
        },
      ],
        },
      ],
    });

    me.callParent(arguments);
  },

  listeners: {
    afterrender: function (cmp) {
      // cmp.handler_afterrender_load();
    },
  },
});


