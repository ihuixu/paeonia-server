var path = require('path')
var loader = require('cello-loader')

module.exports = function *(next){
  var staticPath = path.join(this.config.hostPath, 'static/config.json')

  try{
    this.config.static = require(staticPath)
  
  }catch(e){
    this.config.static = {}
  }

  this.loader = loader(this.config.static) 
  yield next
}
