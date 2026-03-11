var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.insentif.Layoutins", {
  extend: "Ext.window.Window",
  alias: "widget.Layoutins",
  reference: "Layoutins",
  modal: true,
  title: "Module Pendapatan: Gaji Pokok", 
  closeAction: "destroy",
  centered: true,
  maximizable: true,
  width: 700,  
  height: 500,

  requires: [],

  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  layout: "fit",
  border: false,
  frame: false,

  items: [
    {
      xtype: 'form'
    }
  ],

  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 50,
    margin: "5 10 0 5",
  },

  config: {
    tabPanelConfig: [
      { title: "Insentif", xtype: "pen" },
      { title: "Data Belum Verifikasi", items: [] },
      {
        title: "====Summary====",
        disabled: true,
        tabConfigStyle: {
          textAlign: "right",
          marginTop: "30px",
          background: "transparent",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
        },
      },
      { title: "by Department2", xtype: "Gridsum", groupField: "DEPARTMENT"},
      { title: "by Seksi" , xtype: "Gridsum", groupField: "SEKSI"},
      { title: "by Subseksi" , xtype: "Gridsum", groupField: "SUBSEKSI"},
      { title: "by Jabatan", xtype: "Gridsum", groupField: "NAMA_JABATAN"},
      { title: "by Golongan", xtype: "Gridsum", groupField: "NAMA_GOLONGAN"},
      { title: "by Area", xtype: "Gridsum", groupField: "AREA" },
      { title: "by Status Kontrak", xtype: "Gridsum", groupField: "STATUS_KONTRAK" },
      {
        title: "====Pengaturan====",
        disabled: true,
        tabConfigStyle: {
          textAlign: "right",
          marginTop: "30px",
          background: "transparent",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
        },
      },
      { title: "Upload Manual" },
    ],
  },

  initComponent: function () {
    var me = this;

    Ext.apply(me, {
      items: [me.buildTabPanel()],
    });

    me.callParent(arguments);
  },

  buildTabPanel: function () {
    var me = this;

    return {
      xtype: "tabpanel",
      height: 800,
      border: true,
      frame: false,
      plain: true,
      tabPosition: "left",
      tabRotation: 0,
      //deferredRender: false,
      items: me.buildTabItems(),
      listeners: {
        tabchange: function (tabPanel, newCard, oldCard, eOpts) {
          try {
            if (tabPanel.items.indexOf(newCard) === 0) return;

            var tabPage = newCard.down();
            if (tabPage && Ext.isFunction(tabPage.handler_afterrender_load)) {
              tabPage.handler_afterrender_load(newCard);
            }
          } catch (ex) {
            COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
          }
        },
      },
    };
  },

  buildTabItems: function () {
    var me = this;
    var configs = me.getTabPanelConfig() || [];

    return Ext.Array.map(configs, function (cfg) {
      return me.buildSingleTab(cfg);
    });
  },

  buildSingleTab: function (cfg) {
    var tabStyle = Ext.apply(
      {
        textAlign: "right",
      },
      cfg.tabConfigStyle || {},
    );

    var tab = {
      title: cfg.title || "",
      layout: cfg.layout || "fit",
      disabled: cfg.disabled === true,
      tabConfig: {
        style: tabStyle,
      },
      items: [],
    };

    if (Ext.isArray(cfg.items)) {
      tab.items = cfg.items;
    } else if (cfg.xtype) {
      var itemCfg = Ext.apply({}, cfg);

      delete itemCfg.title;
      delete itemCfg.tabConfigStyle;
      delete itemCfg.disabled;
      delete itemCfg.items;
      delete itemCfg.layout;

      tab.items = [itemCfg];
    }

    return tab;
  },

  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      style: {
        background: "rgba(237, 231, 246)",
      },
      items: [
        { xtype: "tbspacer", width: 10 },
        "-",
        {
          xtype: "button",
          text: "Refresh Data",
          pid: "btrefresh",
          icon: vconfig.getstyle + "icon/update.ico",
          tooltip: "Refresh Data",
          handler: function (cmp) {
            try {
              var Layoutins = cmp.up("Layoutins");
              Layoutins.handler_refresh_click(cmp);
            } catch (ex) {
              COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
        "-",
        {
          xtype: "button",
          text: "Sinkronisasi",
          pid: "btsinkronisasi",
          icon: vconfig.getstyle + "icon/certificate.ico",
          tooltip: "Sinkronisasi",
          handler: function (cmp) {
            try {
              var Layoutins = cmp.up("Layoutins");
              Layoutins.handler_sinkronisasi_click(cmp);
            } catch (ex) {
              COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
        "-",
        {
          xtype: "button",
          text: "Posting",
          pid: "btposting",
          icon: vconfig.getstyle + "icon/lock.png",
          tooltip: "Posting",
          handler: function (cmp) {
            try {
              var Layoutins = cmp.up("Layoutins");
              Layoutins.handler_posting_click(cmp);
            } catch (ex) {
              COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
        "->",
      ],
    },
  ],

  listeners: {
    afterrender: function (cmp) {
      try {
        var me = this;
        // me.handler_afterrender_layout(me);
      } catch (ex) {
        COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },

  // handler area
  //============================================================================================================
  handler_refresh_click: function (cmp) {
    try {
      var thisPage = cmp.up("Layoutins");
      var tabPanel = thisPage.down("tabpanel");
      tabPanel.setActiveTab(0);

      var GRIDgaji_pokok = thisPage.query("grid[pid=GRIDgaji_pokok]")[0];
      if (GRIDgaji_pokok) {
        GRIDgaji_pokok.getStore().load();
      }
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  handler_posting_click: function (cmp) {
    try {
      var Layoutins = cmp.up("Layoutins");
      Ext.MessageBox.confirm("Konfirmasi", "Konfirmasi Posting data", function (button) {
        if (button === "yes") {
          var params = Ext.encode({
            method: "process_data",
            vmodule: "posting",
          });

          var hasil = COMP.run.getservice(vconfig.service_api + "formula_insentif/formula_insentif", params);
          hasil.then(function (content) {
            var val = Ext.decode(content, true);
            COMP.TipToast.msgbox("Success", val.message, { cls: "success", delay: 2000 });
            Layoutins.handler_refresh_click(cmp);
          }, this);
        }
      });
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  handler_sinkronisasi_click: function (cmp) {
    try {
      var Layoutins = cmp.up("Layoutins");
      Ext.MessageBox.confirm("Konfirmasi", "Konfirmasi Sinkronisasi data", function (button) {
        if (button === "yes") {
          var params = Ext.encode({
            method: "process_data",
            vmodule: "sinkronisasi",
          });

          var hasil = COMP.run.getservice(vconfig.service_api + "formula_insentif/formula_insentif", params);
          hasil.then(function (content) {
            var val = Ext.decode(content, true);
            COMP.TipToast.msgbox("Success", val.message, { cls: "success", delay: 2000 });
            Layoutins.handler_refresh_click(cmp);
          }, this);
        }
      });
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  handler_edit_gaji_pokok: function (xgrid, rowIndex, colIndex, e, a, rec) {
    try {
      var vdata = rec.data;
      var Layoutins = xgrid.up("Layoutins");

      var FRMpen_insentif_edit = Ext.create("TDK.ga_pendapatan.pen_insentif.FRMpen_insentif_edit", {
        nvdata: vdata,
        Layoutins: Layoutins,
      });

      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.create("Ext.window.Window", {
        modal: true,
        title: "Edit Insentif Karyawan: " + vdata.NIK + " - " + vdata.NAMA,
        closeAction: "destroy",
        centered: true,
        maximizable: true,
        width: mainpanel.getWidth() * 0.9,
        height: mainpanel.getHeight() * 0.97,
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        layout: "fit",
        bodyBorder: false,
        items: [FRMpen_insentif_edit],
      });

      return popup.show();
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  handler_validasi_proses_upload: function (cmp, GRIDupload) {
    try {
      let tmodule = "PENDAPATAN";
      let tkategori = "INSENTIF";

      if (COMP.GridData.getCount(GRIDupload) <= 0) {
        COMP.TipToast.msgbox("Error", "Data Upload tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }

      if (COMP.GridData.getSql(GRIDupload, "PRDNO is null").length > 0) {
        COMP.TipToast.msgbox("Error", "Periksa kolom Periode, tidak boleh kosong", { cls: "danger", delay: 2000 });
        return false;
      }

      if (COMP.GridData.getSql(GRIDupload, "NIK is null").length > 0) {
        COMP.TipToast.msgbox("Error", "Periksa kolom NIK, tidak boleh kosong", { cls: "danger", delay: 2000 });
        return false;
      }

      if (COMP.GridData.getSql(GRIDupload, "NOMINAL is null or NOMINAL<=0").length > 0) {
        COMP.TipToast.msgbox("Error", "Periksa kolom Insentif, tidak boleh kosong", { cls: "danger", delay: 2000 });
        return false;
      }

      var vdata = COMP.GridData.getAllcustom(GRIDupload, ["PRDNO", "NIK", "NOMINAL"]);
      Ext.create("TDK.a_global.popup.popup_verifikasi", {
        titleText: "Verifikasi Upload data",
        method: "upload_data_insentif",
        url: vconfig.service_api + "formula_insentif/formula_insentif",
        vdata: vdata,
        showCancelVerify: false,
        onSuccess: function (val, win) {
          //GRIDdata_absensi.getStore().load();

          Ext.defer(function () {
            console.log("status success");
          }, 500);

          thisPage.close();
        },
      }).show();
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
