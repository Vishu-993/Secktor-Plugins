const { tlang } = require('../../lib')
const Config = require('../../config')
const axios = require('axios')
const url = 'https://raw.githubusercontent.com/SamPandey001/Secktor-Plugins/main/plugins/bgm/bgm.js'

const BGM_MIME_TYPE = 'audio/mpeg'
const BGM_ENV_VAR = 'BGM'
const BGM_CHAT_COMMAND = 'bgm'

async function playBgm(citel) {
  // Fetch the current value of the BGM environment variable
  const { BGM } = process.env
  if (BGM !== 'true') return

  // Fetch the BGM audio file from the specified URL
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  })
  const audioBuffer = response.data

  // Send the BGM audio file as a message
  await citel.send({
    type: 'audio',
    originalContentUrl: url,
    audio: {
      contentType: BGM_MIME_TYPE,
      buffer: audioBuffer,
    },
  })
}

module.exports = {
  name: BGM_CHAT_COMMAND,
  category: 'misc',
  desc: 'Turns on/off bgm.',
  async exec(citel, Void, args, isCreator) {
    if (!isCreator) return citel.reply(tlang().owner)
    if (!args[0]) return citel.reply(`Please give me option true/false to set ${tlang().greet}`)

    const Heroku = require('heroku-client')
    const heroku = new Heroku({
      token: Config.HEROKU.API_KEY,
    })
    const baseUri = `/apps/${Config.HEROKU.APP_NAME}`
    await heroku
