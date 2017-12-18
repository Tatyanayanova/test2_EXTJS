

Ext.onReady(function () {

    var win = new Ext.Window({
        title: "title",
        border: false,
        width: 400,
        height: 400,
        layout: 'fit',
        items: [
            new Ext.form.FormPanel({
                frame: true,
                items: {xtype: 'textfield'}
            })
        ]
    });

    win.show();
});

var fm = Ext.form;
var grid = new Ext.grid.EditorGridPanel({
    height: 500,
    renderTo: Ext.getBody(),
    width: 800, 
    loadMask: false, viewConfig: {
        emptyText: 'No data to display'}, 
        selModel: checkboxselection, 
        tbar: mainGridToolbar, 
        clicksToEdit: 1, 
        store: cartStore, 
        listeners: {afteredit: function (o) {
            var pos = o.record.get('POS');
            var quantity = o.value;
            }
        }, 
        columns: [checkboxselection, 
            {header: "quantity", 
                align: 'right', 
                dataIndex: 'QUANTITY', 
                sortable: true, 
                editor: new fm.TextField({allowBlank: false})
            } 
        ]
    });
