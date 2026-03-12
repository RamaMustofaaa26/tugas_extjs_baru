Ext.define("TDK.insentif.pen", {
  extend: "Ext.form.Panel",
  alias: "widget.pen",
  reference: "pen",
  frame: false,
  border: false,
  autoScroll: false,
  layout: "fit",
  items: [
    {
      xtype: "grid",
      pid: "pen",
      emptyText: "No Matching Records",
      autoScroll: true,
      border: true,
      frame: false,
      flex: 1,
      store: {
        fields: [ "PRDNO", "NIK", "NAMA", "BPJS_TK_%_JHT", "BPJS_TK_%_JKM", "BPJS_TK_%_JKK",
          "BPJS_TK_NILAI_JHT", "BPJS_TK_NILAI_JKM", "BPJS_TK_NILAI_JKK", "BPJS_TK_NILAI_TOTAL",
          "NAMA_JABATAN", "NAMA_GOLONGAN", "NAMA_STKAR", "KODE_STKEL", "DIVISI", "DEPARTMENT",
          "SEKSI", "SUBSEKSI", "MAKER", "CARLINE", "DLIDL", "PAFA", "KODE_COSTCENTER", "NAMA_COSTCENTER",
          "AREA", "SUBAREA", "LOKASI", "SUBLOKASI", "NAMAPROSES"
        ],
        autoLoad: true,
      },
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
        columnLines: true,
      },
      columns: {
        defaults: {
          sortable: false,
          filter: { xtype: "textfield" },
        },
        items: [
          { xtype: "rownumberer", width: 30, filter: false },
          {
            xtype: "actioncolumn",
            width: 40,
            align: "center",
            menuDisabled: true,
            stopSelection: false,
            sortable: false,
            filter: false,
            items: [
              {
                icon: vconfig.getstyle + "icon/setting.ico",
                tooltip: "Edit Insentif",
                // handler: function (xgrid, rowIndex, colIndex, e, a, rec) {
                //   try {
                //     var layout_pen_insentif = xgrid.up("layout_pen_insentif");
                //     layout_pen_insentif.handler_edit_gaji_pokok(xgrid, rowIndex, colIndex, e, a, rec);
                //   } catch (ex) {
                //     COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
                //   }
                // },
              },
            ],
          },
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
    {
      xtype: "toolbar",
      height: 30,
      dock: "bottom",
      style: {
        background: "rgba(237, 231, 246)",
      },
      items: [
        {
          // lokasiPage: "insentif.Layoutins",
          columnIndex: "NOMINAL",
          width: 180,
          labelField: "Total Nilai",
        },
        "-",
        {
          // lokasiPage: "insentif.Layoutins",
          width: 150,
          labelField: "Total Rows",
        },
      ],
    },
  ],
});
