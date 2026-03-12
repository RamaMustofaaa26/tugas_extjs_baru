Ext.define("TDK.mainpage", {
  extend: "Ext.panel.Panel",
  id: "mainpage",
  alias: "widget.mainpage",
  pid: "mainpage",
  config: {},
  requires: [
    "TDK.Cmainpage",
    "TDK.Gridins",
    // "TDK.Formins",
    "TDK.insentif.pen",
    "TDK.insentif.Layoutins",
    "TDK.insentif.Gridsum",
    // "TDK.insentif.uploadm",

  ],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      layout: "fit",
      frame: false,
      border: false,
      items: [
        {
          xtype: 'tabpanel',
          items: [
            {
              title: 'Pendapatan',
              closable: true,
              items: [
                { xtype: 'Gridins' }
              ]
            }
          ]
        }
      ],
    });

    this.callParent(arguments);
  }
});