<?php
ini_set('display_errors', 1);
error_reporting();


$result = mysqli_query(mysqli_connect("127.0.0.1",'root','123456','client'),"SELECT *  FROM clients ");
var_dump ('$result', $result);
echo '<br>';echo '<br>';
$test = mysqli_fetch_field($result);
var_dump('$test',$test);
echo '<br>';echo '<br>';
$metadata = mysqli_fetch_field_direct($result,0);
var_dump('$metadata',$metadata->length);
echo '<br>';echo '<br>';
var_dump('$metadata',$metadata);
echo '<br>';echo '<br>';
var_dump('$metadata',$metadata->flags);
echo '<br>';echo '<br>';
$metadata2 = mysqli_fetch_field_direct($result,0)->flags;
var_dump($metadata2);
echo '<br>';echo '<br>';
$num = mysqli_num_rows($result);
var_dump('num',$num);
echo '<br>';echo '<br>';
//$db = mysql_list_dbs(mysqli_connect("127.0.0.1",'root','123456','client'));
//var_dump($db);
//echo '<br>';echo '<br>';


echo '<br>';echo '<br>33333';
$result3 = mysqli_query(mysqli_connect("127.0.0.1",'root','123456','client'), "SHOW DATABASES");
//var_dump ('result3', $result3);
//$row = mysqli_fetch_row( $result3 );
//var_dump ('result3', $row);
//echo '<br>';echo '<br>';
//$row2 = mysqli_fetch_row( $result3 );
//var_dump ('result3', $row2);
//echo '<br>';echo '<br>';
while( $row = mysqli_fetch_row( $result3 ) ){
    if (($row[0]!="information_schema") && ($row[0]!="mysql")) {
        echo $row[0]."\r\n";
        $result2 = mysqli_query(mysqli_connect("127.0.0.1",'root','123456',$row[0]), "SHOW TABLES");
        while( $row = mysqli_fetch_row( $result2 ) ){
            echo $row[0]."\r\n";
        
        }
        echo '<br>';echo '<br>';
    }
}
var_dump ('result3', $row);
echo '<br>';echo '<br>';


                $result = mysqli_query(mysqli_connect("127.0.0.1",'root','123456'), "SHOW DATABASES");
                $i = 0;
                while( $qid = mysqli_fetch_row( $result ) ){
                    if (($qid[0]!="information_schema") && ($qid[0]!="mysql")) {   
                        //var_dump($qid);
                        $db = mysqli_query(mysqli_connect("127.0.0.1",'root','123456',$qid[0]), "SHOW TABLES");
                        //var_dump($db);die();
                        while( $row = mysqli_fetch_row( $db ) ){                            
                            if ($row[0] != 'mysql') $arr[$qid[0]][] = $row[0];
                        } 
                        
                    }
                    $i++;
                }   
                echo '<pre>';
                var_dump($arr);
                
                
 echo '<br>5555555555555555555554';echo '<br>';               
                
                
$result5 = mysqli_query(mysqli_connect("127.0.0.1",'root','123456'), "SHOW COLUMNS FROM client.clients");
while( $row = mysqli_fetch_row( $result5 ) ){
    echo $row[0]."\r\n";
}