Ext.define("TDK.Cmainpage", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmainpage",
  init: function (view) {
    this.control({});
    this.tdk_aes = "app-tdk-2024";
    this.task_area();
    this.renderpage();
  },
  task_area: function () {
    try {
    } catch (err) {
      COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  renderpage: function () { 
   
  },

  // onNewInput: function (btn) {
  //   var mainpage = btn.up('mainpage');
  //   var grid = mainpage.down('grid');
  //   var store = grid.getStore();
  //   var popup = Ext.create('TDK.formki',{
  //     gridStore: store
  //   });
  //   popup.show();
  // },


  // onSave: function(btn){
  //   var win   = btn.up('window');    
  //   var form = win.down('form').getForm();
  //   var store = win.gridStore;        // STORE GRID
    
  //   if (!form.isValid()) {
  //         Ext.Msg.alert('Info', 'Form belum lengkap');
  //         return;
  //     }

  //     var values = form.getValues();
  //   if (win.recordData) {
  //     win.recordData.set(values);
  //     } else {
  //         store.add(values);
  //     }

  //     store.sync();

  //     win.close();
  // }
  // onRefresh: function (btn) {
  // }

  
});
