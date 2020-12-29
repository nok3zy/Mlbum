const mysql = require('mysql');

const db_info={
    host :'localhost',
    user:'root',
    password:'1234',
    port:'3306',
    database:'album'
};

export const conn = mysql.createConnection(db_info);

conn.connect(function(err){
    if(err)console.error("mysql connection error"+err);
    else console.log("mysql connected!");
});

export const login = (id,password) =>{
    const sql="SELECT * FROM USER WHERE ID=?";
    let check=0;

    conn.query(sql,[id],function(error,results){
        if(error)
            console.log(error);

        if(!results[0])
            check=1;
    
        if(results[0].PW != password)
            check=1;

        });
        
    if (check ==0)    // 수정해야함.
        return true;
    else
        return false;
}

export const idDetail = (id) =>{
        const sql="SELECT * FROM USER WHERE ID=?";
        let answer={
            id : "",
            pw : "",
            group:""
        };
        const a = conn.query(sql,[id],function(error,results){
            if(error)
                console.log(error);

            console.log(results[0].ID);
            console.log(results[0].PW);
            console.log(results[0].group);
            
            answer.id = results[0].ID;
            answer.pw = results[0].PW;
            answer.group = results[0].group;
            
        });
        
}




// const db_config = require(__dirname+ '/db.js');
// const conn = db_config.init();

// db_config.connect(conn);

// module.exports={
//     init:function(){
//         return mysql.createConnection(db_info);
//     },
//     connect:function(conn){
//         conn.connect(function(err){
//             if(err)console.error("mysql connection error"+err);
//             else console.log("mysql connected!");
//         });
//     }
// }






