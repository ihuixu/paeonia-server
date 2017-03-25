var server = require('./server')
var config = require('./config')

module.exports = {
  config : null
  , mws : null
  , start : function(config = {}, mws = {}){

    if(!this.config)
      this.configure(config)

    if(!this.mws)
      this.middleware(mws)

    server.call(this)

    return this
  }
  , configure : function(opts = {}){
    this.config = config.call(this, opts)
    return this
  }
  , middleware : function(opts = {}){
    this.mws = opts 
    return this
  }
}

