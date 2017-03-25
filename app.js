var server = require('./server')
var config = require('./config')
var mw = require('./mw')

module.exports = {
  config : {}
  , mw : {}
  , start : function(opts = {}){
    if(!this.config.appPath)
      this.configure(opts)

    server.call(this)
    return this
  }
  , configure : function(opts = {}){
    this.config = config.call(this, opts)
    return this
  }
  , middleware : function(opts = {}){
    this.mw = mw.call(this, opts)
    return this
  }
}

