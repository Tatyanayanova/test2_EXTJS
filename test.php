<?php
ini_set('display_errors', 1);
error_reporting();
$db = new PDO('mysql:host=localhost;dbname=client','root','123456');
$db->exec("SET NAMES UTF8");
//$total = get_count($db);
$response = array('success' => true, 'msg' => 'ok');

function get_count($db){
    $query_count = $db->prepare("SELECT *  FROM clients ");
    $query_count->execute();
    $date_count = $query_count->fetchAll(PDO::FETCH_ASSOC);
    $count['total'] = count($date_count);      
    return $count;
}

function get_data($db, $start, $limit){

    $query = $db->prepare("SELECT *  FROM clients LIMIT {$start}, {$limit}");
    //$query = $db->prepare("SELECT *  FROM clients ");
    
    $query->execute();
    $date = $query->fetchAll(PDO::FETCH_ASSOC); // только значения с ассоциативным ключом
    //$store = json_encode($date);
    $query_count = $db->prepare("SELECT *  FROM clients ");
    $query_count->execute();
    $date_count = $query_count->fetchAll(PDO::FETCH_ASSOC);
    $clients = array(array());
    foreach ($date as $value) {
        $clients['data'][] =  $value;
    }
    $clients['total'] = count($date_count); 
    $clients["success"] = true;
    //$clients = array('data' => $date);
    $clients_json = json_encode($clients, JSON_UNESCAPED_UNICODE);// kодировка
    
    return $clients_json;
    
}

function add_data($f_name, $name, $m_name, $age, $adress, $db){
    $query2 = $db->prepare("INSERT INTO `clients` (`id`, `f_name`, `name`, `m_name`, `age`, `adress`) VALUES (NULL, '{$f_name}', '{$name}', '{$m_name}', '{$age}', '{$adress}'); ");
    
    $query2->execute();
}



if($_REQUEST['cmd']=='get_data'){       
    $clients_json = get_data($db, $_REQUEST['start'], $_REQUEST['limit']);     
    echo $clients_json;
    die();
    }
    
if($_REQUEST['cmd']=='add_data'){    
        
    add_data($_REQUEST['f_name'],$_REQUEST['name'], $_REQUEST['m_name'], $_REQUEST['age'], $_REQUEST['adress'], $db);    
        
    }  
    
if($_REQUEST['cmd']=='update_data'){    
    
    
    $query3 = $db->prepare("UPDATE `clients` SET `f_name` = '{$_REQUEST['f_name']}', `name` = '{$_REQUEST['name']}', `m_name` = '{$_REQUEST['m_name']}', `age` =  '{$_REQUEST['age']}', `adress` = '{$_REQUEST['adress']}' WHERE `clients`.`id` = {$_REQUEST['id']};");
    $query3->execute();
         
    }
    
    if($_REQUEST['cmd']=='delete_data'){    
        $query3 = $db->prepare( "DELETE FROM `clients` WHERE `clients`.`id` = {$_REQUEST['id']}");
        $query3->execute();
    }

echo json_encode($response);