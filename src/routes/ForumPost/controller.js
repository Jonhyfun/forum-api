const moment = require('moment-timezone');
const fetch = require("node-fetch");
const firebase = require('../../firebaseConfig');

exports.postList = async (req, res) => {
  let response = await fetch(Url().posts);
  let data = await response.json();
  return success(data,res);
}

exports.enviarPost = async (req,res) => {
  var id = Math.floor(1000 + Math.random() * 9000);
  let response = await fetch(Url(id).singlePost, { method: 'PATCH', body: req.body,});
  //let data = await response.json();
  return success(null,res);
}

exports.singlePost = async (req, res) => {
  var PostID = req.params.id;
  var erro = "Post não existe";
  return await Fetch(req,res,Url(PostID).singlePost,erro);
}

exports.Answers = async (req, res) => {
  var PostID = req.params.id;
  var erro = "Resposta ao post não existe";
  return await Fetch(req,res,Url(PostID).respostas,erro);
}

function success(data, res){
return res.status(200).json({
    status: true,
	data: JSON.stringify(data),
    error: false,
    reason: null,
    message: `Mensagem voltada em ${moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}`
  });
}

async function Fetch(req,res,url) {
let data;
  try  {
	let response = await fetch(url);
	data = await response.json();
  } catch{}
  
  var status = 200;
  var reason = null;
  var error = false;
  
  if(data == null) {
	status = 500;
	error = true;
	reason = erro;
  }
    return res.status(status).json({
    status: true,
	data: JSON.stringify(data),
    error: error,
    reason: reason,
    message: `Mensagem voltada em ${moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}`
  });
}

//o dry mais lindo q eu ja fiz na minha vida

function Url(PostID) {
return {
 posts : PostUrl(),
 singlePost : PostUrl(PostID),
 respostas : RespostaUrl(PostID)
};
}

function PostUrl(PostID) {
	if(PostID){
	return firebase.config.databaseURL+"/Posts/"+PostID+"/.json";	
	}
return firebase.config.databaseURL+"/Posts/.json";
}

function RespostaUrl(PostID) {
return firebase.config.databaseURL+"/Respostas/"+PostID+"/.json";
}