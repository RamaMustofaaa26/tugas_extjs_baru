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

  requires: ["TDK.insentif.pen"],

  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  layout: "fit",
  border: false,
  frame: false,

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
      { title: "by Department2", xtype: "Gridsum", groupField: "DEPARTMENT" },
      { title: "by Seksi", xtype: "Gridsum", groupField: "SEKSI" },
      { title: "by Subseksi", xtype: "Gridsum", groupField: "SUBSEKSI" },
      { title: "by Jabatan", xtype: "Gridsum", groupField: "NAMA_JABATAN" },
      { title: "by Golongan", xtype: "Gridsum", groupField: "NAMA_GOLONGAN" },
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
      { title: "Upload Manual",},
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
        },
        "-",
        {
          xtype: "button",
          text: "Sinkronisasi",
          pid: "btsinkronisasi",
          icon: vconfig.getstyle + "icon/certificate.ico",
          tooltip: "Sinkronisasi",
        },
        "-",
        {
          xtype: "button",
          text: "Posting",
          pid: "btposting",
          icon: vconfig.getstyle + "icon/lock.png",
          tooltip: "Posting",
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
});
