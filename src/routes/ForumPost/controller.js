const moment = require('moment-timezone');
const fetch = require("node-fetch");
const firebaseConfig = require('../../firebaseConfig');
var firebase = require("firebase/app");
require("firebase/database");


firebase.initializeApp(firebaseConfig.config);
var database = firebase.database();


exports.postList = async (req, res) => { //não "postarlist", Lista de post(s)
  var x = await firebase.database().ref('/Posts/');
  x.once('value',function(x){
	  let resposta =  JSON.stringify(x.val());
	  success(resposta,res);
  });
}

exports.enviarPost = async (req,res) => {
  var id = Math.floor(1000 + Math.random() * 9000);
  var post = JSON.parse(req.body);
  post.postID = id; 
  firebase.database().ref('Posts/' + id).set(post);
  success(null,res);
}

exports.singlePost = async (req, res) => {
  var PostID = req.params.id;
  var x = await firebase.database().ref('/Posts/'+PostID);
  x.on('value',function(x){
	  let resposta =  JSON.stringify(x.val());
	  success(resposta,res);
  });
  
}

exports.Answers = async (req, res) => {
  var PostID = req.params.id;
  var x = await firebase.database().ref('/Respostas/'+PostID);
  x.once('value',function(x){
	  let resposta =  JSON.stringify(x.val());
	  success(resposta,res);
  });
}

exports.enviarResposta = async (req, res) => {
  var id = Math.floor(1000 + Math.random() * 9000);
  var PostID = req.params.id;
  firebase.database().ref('/Respostas/'+PostID+"/"+id).set(JSON.parse(req.body));
  success(null,res);
}

exports.updateRank = async (req,res) => {
  var PostID = req.params.id;
  var x = await firebase.database().ref('/Posts/'+PostID+"/rank/count");
  x.once('value',function(x){
	  firebase.database().ref('Posts/' + PostID + "/rank").set({count: (parseInt(x.val())+1)});
	  success(parseInt(x.val()+1),res);
  });
}

function success(data, res){
return res.status(200).json({
    status: true,
	data: data,
    error: false,
    reason: null,
    message: `Mensagem voltada em ${moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}`
  });
}