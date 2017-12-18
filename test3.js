Ext.onReady(function(){

    /**
     * Handler specified for the 'Available' column renderer
     * @param {Object} value
     */
    function formatDate(value){
        return value ? value.dateFormat('M d, Y') : '';
    }

    // shorthand alias
    var fm = Ext.form;

    // the column model has information about grid columns
    // dataIndex maps the column to the specific data field in
    // the data store (created below)
    var cm = new Ext.grid.ColumnModel({
        // specify any defaults for each column
        defaults: {
            sortable: true // columns are not sortable by default           
        },
        columns: [{
            id: 'common',
            header: 'Common Name',
            dataIndex: 'common',
            width: 220,
            // use shorthand alias defined above
            editor: new fm.TextField({
                allowBlank: false
            })
        }, {
            header: 'Light',
            dataIndex: 'light',
            width: 130,
            editor: new fm.ComboBox({
                typeAhead: true,
                triggerAction: 'all',
                // transform the data already specified in html
                transform: 'light',
                lazyRender: true,
                listClass: 'x-combo-list-small'
            })
        }, {
            header: 'Price',
            dataIndex: 'price',
            width: 70,
            align: 'right',
            renderer: 'usMoney',
            editor: new fm.NumberField({
                allowBlank: false,
                allowNegative: false,
                maxValue: 100000
            })
        }, {
            header: 'Available',
            dataIndex: 'availDate',
            width: 95,
            renderer: formatDate,
            editor: new fm.DateField({
                format: 'm/d/y',
                minValue: '01/01/06',
                disabledDays: [0, 6],
                disabledDaysText: 'Plants are not available on the weekends'
            })
        }, {
            xtype: 'checkcolumn',
            header: 'Indoor?',
            dataIndex: 'indoor',
            width: 55
        }]
    });

    // create the Data Store
    var store = new Ext.data.Store({
        // destroy the store if the grid is destroyed
        autoDestroy: true,

        // load remote data using HTTP
        url: 'plants.xml',

        // specify a XmlReader (coincides with the XML format of the returned data)
        reader: new Ext.data.XmlReader({
            // records will have a 'plant' tag
            record: 'plant',
            // use an Array of field definition objects to implicitly create a Record constructor
            fields: [
                // the 'name' below matches the tag name to read, except 'availDate'
                // which is mapped to the tag 'availability'
                {name: 'common', type: 'string'},
                {name: 'botanical', type: 'string'},
                {name: 'light'},
                {name: 'price', type: 'float'},             
                // dates can be automatically converted by specifying dateFormat
                {name: 'availDate', mapping: 'availability', type: 'date', dateFormat: 'm/d/Y'},
                {name: 'indoor', type: 'bool'}
            ]
        }),

        sortInfo: {field:'common', direction:'ASC'}
    });

    // create the editor grid
    var grid = new Ext.grid.EditorGridPanel({
        store: store,
        cm: cm,
        renderTo: 'editor-grid',
        width: 600,
        height: 300,
        autoExpandColumn: 'common', // column with this id will be expanded
        title: 'Edit Plants?',
        frame: true,
        clicksToEdit: 1,
        tbar: [{
            text: 'Add Plant',
            handler : function(){
                // access the Record constructor through the grid's store
                var Plant = grid.getStore().recordType;
                var p = new Plant({
                    common: 'New Plant 1',
                    light: 'Mostly Shade',
                    price: 0,
                    availDate: (new Date()).clearTime(),
                    indoor: false
                });
                grid.stopEditing();
                store.insert(0, p);
                grid.startEditing(0, 0);
            }
        }]
    });

    // manually trigger the data store load
    store.load({
        // store loading is asynchronous, use a load listener or callback to handle results
        callback: function(){
            Ext.Msg.show({
                title: 'Store Load Callback',
                msg: 'store was loaded, data available for processing',
                modal: false,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
        }
    });
});



// Cell Edit example 
Ext.create('Ext.grid.Panel', { 
    title: 'Simpsons', 
    store: Ext.data.StoreManager.lookup('simpsonsStore'), 
    /** * here is the important part * you should define each or single column 'editor' property * then specify the 'plugins' that you want to use, here is 'CellEditing' * as you might guess, all definitions appear in the grid definition */ 
    
    columns: [ 
        {header: 'Name', dataIndex: 'name', editor: 'textfield'}, 
        {header: 'Email', dataIndex: 'email', flex:1, 
            editor: { xtype: 'textfield', allowBlank: false } 
        }, 
        {header: 'Phone', dataIndex: 'phone'} 
        ], 
    selType: 'cellmodel', 
    plugins: [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 }) ], 
    height: 200, 
    width: 400, 
    renderTo: Ext.getBody() }); 

//ttt

             {
                text: 'Новая запись',
                
                handler : function(){
                    
                    // access the Record constructor through the grid's store
                    var Client = grid.getStore().recordType;
                    var e = new Client({
                        id: ' ',
                        f_name: 'f_name',
                        name: 'name',
                        m_name: 'm_name',
                        age: 30,
                        adress: 'adress'
                    });
                    grid.stopEditing();
                    store.insert(0, e);
                    grid.startEditing(0, 0);   
                    new Ext.Toolbar({
                        renderTo: 'ext-gen19', 
                        width: 585,
                        height: 26,
                        items: [
                            {
                                // xtype: 'button', // default for Toolbars, same as 'tbbutton'
                                text: 'Добавить новую запись',
                                listeners: {
                                        click: function () {
                                            console.log('click');                                                                                  
                                            console.log('store', store.data.items[0].data);
                                            Ext.Ajax.request({                                
                                                url: 'test.php'
                                                ,params:{ 
                                                    cmd: 'add_data'
                                                    ,f_name: store.data.items[0].data.f_name
                                                    ,name: store.data.items[0].data.name
                                                    ,m_name: store.data.items[0].data.m_name
                                                    ,age: store.data.items[0].data.age
                                                    ,adress: store.data.items[0].data.adress
                                                },

                                                success: function () {

                                                    console.log('ok');
                                                    store.reload();
                                                },
                                                failure: function (form, action) {
                                                    console.log('no', action);
                                                    store.load();
                                                }

                                            });
                                        }
                                    }
                        
                            }

                        ]
                    });
                }
            }


