<?php

//ini_set('display_errors', 1);
//error_reporting();

$db = new PDO('mysql:host=localhost;dbname=client','root','123456');
$db->exec("SET NAMES UTF8");


$query2 = $db->prepare("SELECT f_name, name, m_name, age, adress  FROM clients ");
$query2->execute();
$date = $query2->fetchAll(); //var_dump($date);
//$store = json_encode($date);
//var_dump($store);
$clients = array();
foreach ($date as $value) {
    //echo  $value['f_name'];
    $clients[] = [$value['f_name'], $value['name'], $value['m_name'], $value['age'], $value['adress']];    
}

$clients_json = json_encode($clients, JSON_UNESCAPED_UNICODE);


$cmd = $_POST['cmd'];
if(isset($_POST['cmd'])){
    
    if($_POST['cmd']=='get_data'){    
        //echo $clients_json;
        echo $clients_json;
        
        
    }
}
//var_dump($clients);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="shared/extjs/css/extjs.css" />
        
        <script type="text/javascript" src="adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="ext-all-debug.js"></script>
        <script type="text/javascript" src="examples/ux/RowEditor.js"
        <script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Initializing...';</script>
<!--        <script src="test.js"></script>-->
        <script src="test_grid.js"></script>
        
</head>
<body>
    
    
     <div id="grid-example"></div>
     <div id="grid-example2"></div>
     <div id="grid-example3">
         <div id="add_new"></div>
     </div>
<!--     <select name="adress" id="adress">
        <option>Головко 1</option>
        <option>Головко 2</option>
      </select>-->
</body>
</html>