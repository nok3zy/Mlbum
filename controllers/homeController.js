import routes from "../routes";
import { conn } from "../db";

const empty=(arr)=>{
  if (arr.length ==0)
    return true;
  else
    return false;
}

//=============================
export const getHome = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

export const postHome = (req, res) => {
  const {
    body: { id, password }
  } = req;

  const sql = "SELECT * FROM USER WHERE ID=?";

  conn.query(sql, [id], function (error, results) {
    if (error) throw error;
    if (!results[0]) throw error;
    if (results[0].PW != password) throw error;
    
    

    if (results[0].ID == id){
      res.redirect(routes.user(id));
    } 
    else res.redirect(routes.home);
  });
};
//=============================
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};

export const postJoin = (req, res) => {

  const {
    body : {ID ,PW}
  } =req;

  const sql="SELECT * FROM USER WHERE ID=?";
  conn.query(sql,[ID],function(error,results){
        if(error)
          throw error;
        if(!results){
          console.log("hi",results);
        }
  });  
  
  const insert="INSERT INTO USER VALUES(?,?)";
  conn.query(insert,[ID,PW],function(error,results){
    if(error)
      throw error;
  })
  
  res.redirect(routes.user(ID));
};
//=============================
export const user = (req, res) => {
  const {
    params: { id }
  } = req;

  
  // const sql="SELECT CREW_CODE FROM BELONG WHERE ID=?";
  const sql = "SELECT BELONG.CREW_CODE, CREW.CREW_NAME FROM BELONG,CREW WHERE BELONG.CREW_CODE=CREW.CREW_CODE AND BELONG.ID=?";
  conn.query(sql,[id],function(error,results){
        let crew_code = [];
        let crew_name = [];
        if(error)
          throw error;
        if (!results)
          res.render("user",{id,crew});
        
        for(let i=0;i<results.length;i++){
          crew_code.push(results[i].CREW_CODE);
          crew_name.push(results[i].CREW_NAME);
        }
        // console.log("??",crew_name,crew_code);
        res.render("user", {crew_code,crew_name,id});
  });
  
};
//=============================

export const getMakeGroup=(req,res)=>{
  const {
    params:{ id }
  }=req;

  res.render("makeGroup",{id});
}

export const postMakeGroup=(req,res)=>{
  const {
    params:{id},
    body:{crew_name}
  }=req;

  const crew_code = Date.now()

  const sql = "INSERT INTO CREW(CREW_CODE,CREW_NAME) VALUES(?,?)"
  conn.query(sql, [crew_code,crew_name], function (error, results) {
    if (error) throw error;
  });

  const sql2 = "INSERT INTO BELONG(ID,CREW_CODE) VALUES(?,?)"
  conn.query(sql2, [id,crew_code], function (error, results) {
    if (error) throw error;
  });

  res.redirect(`/${id}`);
}

//=============================
export const getUserDetail = (req, res) => {
  const {
    params: { id }
  } = req;

  const sql = "SELECT * FROM USER WHERE ID=?";
  
  let answer = {
    id: "",
    pw: "",
    group: ""
  };
  
  conn.query(sql, [id], function (error, results) {
    if (error) throw error;

    answer.id = results[0].ID;
    answer.pw = results[0].PW;
    answer.nickname = results[0].NICKNAME;

    res.render("userDetail", { pageTitle: "userDeatil", answer });
  });

};

export const postUserDetail = (req,res) =>{
    
}
//=============================

export const getGroup = (req,res) =>{
  const {
    params :{id, group}
  } =req;

  const sql = "SELECT P.PIC_CODE,P.SRC,C.CREW_NAME FROM PICTURE AS P, CREW AS C WHERE P.CREW_CODE=C.CREW_CODE AND C.CREW_CODE=?";
  conn.query(sql,[group],function(error,results){
        let image =[]
        if(error)
          throw error;

        if (empty(results))
          return 0;
        
        const crew_name = results[0].CREW_NAME;

        image=results
        res.render("group", { id,group,crew_name,image});
  });
  
  const sql2 = "SELECT CREW_NAME FROM CREW WHERE CREW_CODE=?";
  conn.query(sql2,[group],function(error,results){
    let image =[]
    if(error)
      throw error;
    
    console.log(results);
    const crew_name = results[0].CREW_NAME;

    res.render("group", { id,group,crew_name,image});
});

  
  
};  
  
export const postGroup=(req,res)=>{
  console.log(req.body, req.params);
  const {
    body : {tag},
    params : {id , group}
  } =req;



  const sql = "SELECT PIC_CODE,SRC FROM PICTURE WHERE TAG like ? AND CREW_CODE=?";
  conn.query(sql,[tag+'%' , group],function(error,results){
        let image =[]
        if(error)
          throw error;
        
        if (!results)
          res.render("group",{id,group,img});
        
    
        image=results
        // console.log(image);
        res.render("group", { id,group,image});
  });
};

//=============================

export const getUpload =(req,res)=>{
  const {
    params :{id,group}
  }=req;

  res.render("upload",{id, group})
};

export const postUpload =(req,res)=>{
  const {
    body:{tag,description},
    file:{path},
    params:{id,group}
  }=req;

  const pic_code = Date.now();

  const sql = "INSERT INTO PICTURE(PIC_CODE,TAG,DESCRIPTION,SRC,UPLOAD_BY,CREW_CODE) VALUES(?,?,?,?,?,?)"
  conn.query(sql,[pic_code,tag,description,path,id,group],function(error,results){
    if(error)
      throw error;

  });
  res.redirect(`/${id}/${group}`);
};

//=============================

export const getPhoto = (req,res)=>{
  const {
    params : {id, group, pic_code}
  }=req;

  const sql = "SELECT P.TAG,P.DESCRIPTION,P.SRC,P.UPLOAD_BY,C.CONTENT,C.UPLOAD_BY AS COMMENT_BY  FROM PICTURE as P, COMMENTS as C  WHERE P.PIC_CODE=C.PIC_CODE AND P.PIC_CODE=?";
  conn.query(sql, [pic_code], function (error, results) {
    if (error) throw error;
    if (!results[0]) return 1;
    
    const pic = {
        TAG : results[0].TAG,
        UPLOAD_BY : results[0].UPLOAD_BY,
        DESCRIPTION : results[0].DESCRIPTION,
        SRC : results[0].SRC
    }

    res.render("photo",{id,group,pic_code,pic,results})
  });

  const sql2 = "SELECT TAG,DESCRIPTION,SRC,UPLOAD_BY FROM PICTURE WHERE PIC_CODE =?"
  conn.query(sql2, [pic_code], function (error, results) {
    if (error) throw error;
    
    

    res.render("photo",{id,group,pic_code,pic:results[0] ,results:[]})
  });

  // res.render("photo",{id,group,pic_code});
}

export const postPhoto = (req,res)=>{
  const {
    params : {id, group, pic_code},
    body : { comment}
  }=req;
  console.log(id,group,pic_code);
  const cmt_code = Date.now();
  const sql = "INSERT INTO COMMENTS(CMT_CODE,CONTENT,PIC_CODE,UPLOAD_BY) VALUES (?,?,?,?)";
  conn.query(sql, [cmt_code,comment,pic_code,id], function (error, results) {
    if (error) throw error;

  });

  res.redirect(`/${id}/${group}/${pic_code}`)
}


//=============================
export const getInvite = (req,res)=>{
  const{
    params :{ id,group}
  }=req;

  res.render("invite",{id,group});
}

export const postInvite = (req,res)=>{
  const{
    params :{ id,group},
    body : {ID}
  }=req;

  const sql = "INSERT INTO BELONG (ID,CREW_CODE)VALUES (?,?)";
  conn.query(sql, [ID,group], function (error, results) {
    if (error) throw error;

  });

  res.redirect(`/${id}/${group}`);
}

export const getDelete = (req,res)=>{

  const{
    params :{id,group,pic_code}
  }=req;

  const sql = "DELETE FROM COMMENTS WHERE PIC_CODE=?";
  conn.query(sql, [pic_code], function (error, results) {
    if (error) throw error;

  });

  const sql2 = "DELETE FROM PICTURE WHERE PIC_CODE=?";
  conn.query(sql2, [pic_code], function (error, results) {
    if (error) throw error;

  });

  res.redirect(`/${id}/${group}`);
}
