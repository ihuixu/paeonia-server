module.exports = function *(next){
  var mSelf = this
  this.send = function(data){
    mSelf.body = data 
  }

  yield next
}

