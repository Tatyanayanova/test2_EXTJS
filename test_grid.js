Ext.onReady(function(){
    var myPageSize = 5; 
    /**
     * Handler specified for the 'Available' column renderer
     * @param {Object} value
     */
//    function formatDate(value){
//        return value ? value.dateFormat('M d, Y') : '';
//    }

    // shorthand alias
    var fm = Ext.form;
    
    function afterEdit( ) {    
        
        
        grid.stopEditing();
                    var changed_rows = store.getModifiedRecords( ) ;
                    console.log('changed_rows', changed_rows);
                    console.log('changed_rows_count', changed_rows.length);
                    for (var i = 0; i < changed_rows.length; i++) {
                        console.log('changed_rows_i', changed_rows[i].data);
                        Ext.Ajax.request({                              
                                        url: 'test.php'
                                        ,params:{ 
                                            cmd: 'update_data'
                                            ,id: changed_rows[i].data.id
                                            ,f_name: changed_rows[i].data.f_name
                                            ,name: changed_rows[i].data.name
                                            ,m_name: changed_rows[i].data.m_name
                                            ,age: changed_rows[i].data.age
                                            ,adress: changed_rows[i].data.adress
                                        },
                                        success: function () {
                                            console.log('ok');
                                            store.reload();
                                        },
                                        failure: function () {

                                            console.log('no');
                                            store.load();
                                        }
                        });
                    }
                    grid.startEditing(0, 0);
    };
    
    var combo = new Ext.form.ComboBox({
        typeAhead: true,
        triggerAction: 'all',
        lazyRender:true,
        mode: 'local',
        store: new Ext.data.ArrayStore({
            id: 0,
            fields: [
                'myId',
                'displayText'
            ],
            data: [['Головко 1', 'Головко 1'], ['Головко 2', 'Головко 2']]
        }),
        valueField: 'myId',
        displayField: 'displayText'
    });
    // the column model has information about grid columns
    // dataIndex maps the column to the specific data field in
    // the data store (created below)
    var cm = new Ext.grid.ColumnModel({
        // specify any defaults for each column
        defaults: {
            sortable: true // columns are not sortable by default           
        },
        columns: [
        {
            id: 'id',
            header: 'id',
            dataIndex: 'id',
            readOnly: true ,
            width: 28
 
        }, 

        {
            header: 'Фамилия',
            dataIndex: 'f_name',
            width: 130,
            editor: new fm.TextField({
                allowBlank: false, //не позволять пустое значение
                
            })
        }, 
        {
            header: 'Имя',
            dataIndex: 'name',
            width: 70,
            
            editor: new fm.TextField({
                allowBlank: false, //не позволять пустое значение
            })
        }, {
            header: 'Отчество',
            dataIndex: 'm_name',
            width: 95,
            
            editor: new fm.TextField({
               allowBlank: false, //не позволять пустое значение
               
            })
        }, {
            header: 'Возраст',
            dataIndex: 'age',
            width: 130,
            editor: new fm.NumberField({
                allowBlank: false, //не позволять пустое значение
                allowNegative: false, //не позволять отрицательное значение
                maxValue: 100
            })
        }, {
            header: 'Адрес',
            dataIndex: 'adress',
            width: 130,
            //data:[[1, 'Головко 1'], [2, 'Головко 2']],
            editor: combo // указать ссылку на комбинированный экземпляр
//            renderer: Ext.util.Format.comboRenderer(combo) // передать экземпляр combo для многоразового рендеринга
//            

        }

    ]
    });

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
});


var store = new Ext.data.JsonStore({
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
    console.log('start_store',store);

    

    // create the editor grid
    var grid = new Ext.grid.EditorGridPanel({
        store: store,
        cm: cm,
        renderTo: 'grid-example3',
        width: 600,
        height: 300,
        //autoExpandColumn: 'id', // column with this id will be expanded
        title: 'Таблица',
        frame: true,
        clicksToEdit: 1  
        
        ,bbar: new Ext.PagingToolbar({
            store: store,       // grid and PagingToolbar using same store, сетка и PagingToolbar, используя тот же магазин
            displayInfo: true,
            pageSize: myPageSize
            //prependButtons: true,
//            items: [
//                'text 1'
//            ]
        })
        
        ,tbar: [
            
//            {
//            iconCls: 'icon-user-add',
//                text: 'Новая запись',
//                handler: function(){
//                    var e = new Client({
//                        id: ' ',
//                        f_name: 'f_name',
//                        name: 'name',
//                        m_name: 'm_name',
//                        age: 30,
//                        adress: 'adress'
//                    });
//                    editor.stopEditing(); //Останавливает любое активное редактирование
//                    store.insert(0, e); //Вставляет записи в store по указанному индексу и запускает событие добавления
//                    
//                    grid.getView().refresh(); // Возвращает объект GridView сетки, обновляет
//                    grid.getSelectionModel().selectRow(0); // выделить строку 0
//                    editor.startEditing(0);// запустить редактирование
//                    
//                }
//            },
//            
            
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
//            , {
//                //sref: '../removeBtn',
//                iconCls: 'icon-user-delete',
//                text: 'Сохранить изменения',
//                //disabled: true,
//                handler: function(){                    
//                    grid.stopEditing();
//                    var changed_rows = store.getModifiedRecords( ) ;
//                    console.log('changed_rows', changed_rows);
//                    console.log('changed_rows_count', changed_rows.length);
//                    for (var i = 0; i < changed_rows.length; i++) {
//                        console.log('changed_rows_i', changed_rows[i].data);
//                        Ext.Ajax.request({                              
//                                        url: 'test.php'
//                                        ,params:{ 
//                                            cmd: 'update_data'
//                                            ,id: changed_rows[i].data.id
//                                            ,f_name: changed_rows[i].data.f_name
//                                            ,name: changed_rows[i].data.name
//                                            ,m_name: changed_rows[i].data.m_name
//                                            ,age: changed_rows[i].data.age
//                                            ,adress: changed_rows[i].data.adress
//                                        },
//                                        success: function () {
//                                            console.log('ok');
//                                            store.load();
//                                        },
//                                        failure: function () {
//
//                                            console.log('no');
//                                            store.load();
//                                        }
//                        });
//                    }
//                    grid.startEditing(0, 0);
//                }
//            }
            ,{
                iconCls: 'icon-user-delete',
                text: 'Удалить запись',
                handler: function(){ 
                
                    
                    var line = grid.getSelectionModel();//данные выделеной строки
                    console.log('line', line.selection.record.data.id);
                    
                    Ext.Ajax.request({
                        url: 'test.php'
                        ,params:{
                            cmd: 'delete_data'
                            ,id: line.selection.record.data.id
                        }
                        ,success: function () {

                                            console.log('ok');
                                            store.load();
                                        }

                    });                     
                    
                    
                    
                }
                
                
                
                
                
            }
             
         ]     
        

    });
    grid.on('afteredit', afterEdit, this );

});