
Ext.onReady(function(){
    var myPageSize = 5; 
    
    store2 = new Ext.data.JsonStore({
        // store configs
        autoDestroy: true,
        totalProperty: 'total',
        
        autoLoad: {params:{start: 0, limit: myPageSize}},
        baseParams: {
            cmd: 'get_data'
            ,start: 0         
            ,limit: myPageSize         

        },
        url: 'test.php',
        //storeId: 'myStore',
        // reader configs
        root: 'data',
        
        //autoLoad: true,
        idProperty: 'id',
        fields: [
           {name: 'id'},
           {name: 'f_name'},
           {name: 'name'},
           {name: 'm_name'},
           {name: 'age'},
           {name: 'adress'}
        ]
        ,listeners:{  // выполнить события
            load:function(){
                //console.log(grid2.getStore().data.items[0]);
                
                
            }
        }
    }); 
    console.log('start',store2.start);
    //console.log('25',store2);
    
    /*
    win = new Ext.Window({
        title: 'Добавить новую запись',
        width: 250,
        //url:'save-form.php',
        //frame:true,
        closeAction: 'hide',
        bodyStyle: 'padding:5px 5px 5px',
        defaults: {width: 230},
        defaultType: 'textfield',
        items: [

            form = new Ext.form.FormPanel({
                title: false,
                width: 250,
                defaultType: 'textfield',
                items: [
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Фамилия'
                        , allowBlank: false
                        //,value:'Сидоров'
                        , name: 'f_name'
                    },
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Имя'
                        , allowBlank: false
                        //,value:'Сидр'
                        , name: 'name'
                    },
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Отчество'
                        , allowBlank: false
                        //,value:'Сидорович'
                        , name: 'm_name'
                    },
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Возраст'
                        , allowBlank: false
                        //,value:'55'
                        , name: 'age'
                    },
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Адрес'
                        , allowBlank: false
                        //,value:'Головко 77'
                        , name: 'adress'
                    }

                ],

                buttons: [{
                        text: 'Добавить',
                        baseParams: {
                            //cmd: 'add_data'
                        },
                        //url: 'test.php',
                        
                        
                        listeners: {
                            click: function () {
                                console.log('click');
                                    
                                //Ext.Ajax.request({
                                form.getForm().submit({
                                    url: 'test.php'
                                    ,params:{ 
                                        cmd: 'add_data'
                                    },
                                    
                                    success: function () {
                                        
                                        console.log('ok');
                                        store2.load();
                                    },
                                    failure: function (form, action) {
                               console.log('no', action);
                                        store2.load();
                                    }
                                    
                                });
                               
                               
                                
                                
                                
                                
                                
                                win.hide();
                            }
                        }
                        
                       

                        
                        
                }]
            })
        ]

    });
   
    
    winUpdate = new Ext.Window({
        title: 'Изменить выделенную запись',
        width: 250,
        closeAction: 'hide',
        bodyStyle: 'padding:5px 5px 5px',
        defaults: {width: 230},
        defaultType: 'textfield',
        items: [

            formUpdate = new Ext.form.FormPanel({
                title: false,
                width: 250,
                defaultType: 'textfield',
                items: [
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'id'
                        , allowBlank: false
                        , readOnly: true // поле не редактируется
                        , name: 'id'
                    },
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Фамилия'
                        , allowBlank: false
                        
                        , name: 'f_name'
                    },
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Имя'
                        , allowBlank: false
                        
                        , name: 'name'
                    },
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Отчество'
                        , allowBlank: false
                        
                        , name: 'm_name'
                    },
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Возраст'
                        , allowBlank: false
                        
                        , name: 'age'
                    },
                    {
                        xtype: 'textfield'
                        , fieldLabel: 'Адрес'
                        , allowBlank: false
                        
                        , name: 'adress'
                    }

                ],

                buttons: [{
                        text: 'Изменить',
                        
                        
                        
                        listeners: {
                            click: function () {
                                console.log('click');
                                    
                                //Ext.Ajax.request({
                                formUpdate.getForm().submit({
                                    url: 'test.php'
                                    ,params:{ 
                                        cmd: 'update_data'
                                    },
                                    
                                    success: function () {
                                        
                                        console.log('ok');
                                        store2.load();
                                    },
                                    failure: function () {
                                        
                                        console.log('no');
                                        store2.load();
                                    }
                                    
                                });
                               
                                winUpdate.hide();
                            }
                        }
                        
                       

                        
                        
                }]
            })
        ]

    });
   */
    var Client = Ext.data.Record.create([{
        name: 'id',
        type: 'string'
    }, {
        name: 'f_name',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
        
    },{
        name: 'm_name',
        type: 'string'
    },{
        name: 'age',
        type: 'number'
    }]);

    
    var editor = new Ext.ux.grid.RowEditor({
        saveText: 'Применить'
        ,cancelText: 'Отменить'
/*        
        ,bbar: [{
                        text: 'Добавить',                        
                        listeners: {
                            click: function () {
                                console.log('click');
                                editor.stopEditing()
                                var line = grid2.getSelectionModel().getSelections();   
                                Ext.Ajax.request({                                
                                    url: 'test.php'
                                    ,params:{ 
                                        cmd: 'add_data'
                                        ,f_name: line[0].data.f_name
                                        ,name: line[0].data.name
                                        ,m_name: line[0].data.m_name
                                        ,age: line[0].data.age
                                        ,adress: line[0].data.adress
                                    },
                                    
                                    success: function () {
                                        
                                        console.log('ok');
                                        store2.load();
                                    },
                                    failure: function (form, action) {
                                        console.log('no', action);
                                        store2.load();
                                    }
                                    
                                });
                            }
                        }
                        
                       

                        
                        
                }]
            */
    });
    
    
    var grid2 = new Ext.grid.GridPanel({
        store: store2        
        ,height: 200
        ,pageSize: 5
        ,plugins: [editor]
        ,bbar: new Ext.PagingToolbar({
            store: store2,       // grid and PagingToolbar using same store, сетка и PagingToolbar, используя тот же магазин
            displayInfo: true,
            pageSize: myPageSize
            //prependButtons: true,
//            items: [
//                'text 1'
//            ]
        })
        
        ,tbar: [
            {
            iconCls: 'icon-user-add',
                text: 'Новая запись',
                handler: function(){
                    var e = new Client({
                        id: ' ',
                        f_name: 'f_name',
                        name: 'name',
                        m_name: 'm_name',
                        age: 30,
                        adress: 'adress'
                    });
                    editor.stopEditing(); //Останавливает любое активное редактирование
                    store2.insert(0, e); //Вставляет записи в store по указанному индексу и запускает событие добавления
                    grid2.getView().refresh(); // Возвращает объект GridView сетки, обновляет
                    grid2.getSelectionModel().selectRow(0); // выделить строку 0
                    editor.startEditing(0);// запустить редактирование
                }
            }
            ,{
                //sref: '../removeBtn',
                iconCls: 'icon-user-delete',
                text: 'Изменить запись',
                //disabled: true,
                handler: function(){
                    editor.stopEditing();
                    var line = grid2.getSelectionModel().getSelections();//данные выделеной строки
                    console.log('line', line);
                    Ext.Ajax.request({                                
                                    url: 'test.php'
                                    ,params:{ 
                                        cmd: 'update_data'
                                        ,id: line[0].data.id
                                        ,f_name: line[0].data.f_name
                                        ,name: line[0].data.name
                                        ,m_name: line[0].data.m_name
                                        ,age: line[0].data.age
                                        ,adress: line[0].data.adress
                                    },
                                    
                                    success: function () {
                                        
                                        console.log('ok');
                                        store2.load();
                                    },
                                    failure: function () {
                                        
                                        console.log('no');
                                        store2.load();
                                    }
                                    
                    });
                    
                    
                }
            }
            
            ,{
                //sref: '../removeBtn',
                iconCls: 'icon-user-delete',
                text: 'Добавить запись',
                //disabled: true,
                handler: function(){
                    editor.stopEditing();
                    var line = grid2.getSelectionModel().getSelections();//данные выделеной строки
                    console.log('line', line[0].data.f_name);
                    Ext.Ajax.request({                                
                                    url: 'test.php'
                                    ,params:{ 
                                        cmd: 'add_data'                                        
                                        ,f_name: line[0].data.f_name
                                        ,name: line[0].data.name
                                        ,m_name: line[0].data.m_name
                                        ,age: line[0].data.age
                                        ,adress: line[0].data.adress
                                    },
                                    
                                    success: function () {
                                        
                                        console.log('ok');
                                        store2.load();
                                    },
                                    failure: function () {
                                        
                                        console.log('no');
                                        store2.load();
                                    }
                                    
                    });
                    
                    
                }
            }
            
            
            /*
            ,{
                text: "Добавить", 
                handler: function(){ 
                    win.show();
                }
            }
            
            
            ,{
                text: "Изменить", 
                handler: function(){ 
                
                    //console.log('index',grid2.getSelectedRowIndexes());
                    var line = grid2.getSelectionModel().getSelections();//данные выделеной строки
                    //console.log('line', line[0].data);
            
                    winUpdate.show();
                    formUpdate.getForm().setValues(line[0].data);// снова показать форму
                }
            }
            */
            
            ,{
                iconCls: 'icon-user-delete',
                text: "Удалить запись", 
                handler: function(){ 
                
                    
                    var line = grid2.getSelectionModel().getSelections();//данные выделеной строки
                    //console.log('line', line[0].data);
                    Ext.Ajax.request({
                        url: 'test.php'
                        ,params:{
                            cmd: 'delete_data'
                            ,id: line[0].data.id
                        }

                    }); 
                    store2.load();
                    
                }
            }
            
        ]
        //autoHeight: true;
        ,columns: [
            {
                header   : 'Фамилия' 
                ,width    : 160
                ,sortable : true 
                ,dataIndex: 'f_name'
                ,editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }
            ,{
                header   : 'Имя' 
                ,width    : 160 
                ,sortable : true 
                ,dataIndex: 'name'
                ,editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }
            ,{
                header   : 'Отчество' 
                ,width    : 160 
                ,sortable : true 
                ,dataIndex: 'm_name'
                ,editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }
            ,{
                header   : 'Возраст' 
                ,width    : 160 
                ,sortable : true 
                ,dataIndex: 'age'
                ,editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }
            ,{
                header   : 'Адрес' 
                ,width    : 160
                ,sortable : true 
                ,dataIndex: 'adress'
                ,editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }
            
        ]
        ,isCellEditable: function(col, row) {
            var record = store2.getAt(row);
            if (record.get('readonly')) { // replace with your condition
              return false;
            }
            return Ext.grid.ColumnModel.prototype.isCellEditable.call(this, col, row);
          }
        ,listeners:{
               render: function(g) {
                    g.getStore().load({
                        params: {
                            start: 0,
                            limit: myPageSize
                        }
                    });
                }
            }
              
        
    });
    grid2.render('grid-example2');
    
    
    
    
    
    
    
    
});