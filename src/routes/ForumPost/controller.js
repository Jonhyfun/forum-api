const moment = require('moment-timezone');
const fetch = require("node-fetch");
const firebase = require('../../firebaseConfig');
const request = require('request');

exports.postList = async (req, res) => {
  let response = await fetch(url().posts);
  let data = await response.json();
  return res.status(200).json({
    status: true,
	data: JSON.stringify(data),
    error: false,
    reason: null,
    message: `Mensagem voltada em ${moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}`
  });
}

exports.singlePost = async (req, res) => {
  var PostID = req.params.id;
  return await Fetch(req,res,url(PostID).singlePost);
}

exports.Answers = async (req, res) => {
  var PostID = req.params.id;
  return await Fetch(req,res,url(PostID).respostas);
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
	reason = "Post não existe";
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

function url(PostID) {
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