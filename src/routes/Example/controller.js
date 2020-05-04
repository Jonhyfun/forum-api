const moment = require('moment-timezone')

exports.getVideos = async (req, res) => {
  return res.status(200).json({
    status: true,
    error: false,
    reason: null,
    message: `Mensagem voltada em ${moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}`
  })
}