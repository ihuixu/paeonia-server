module.exports = function *(next){
  var mSelf = this

  this.bindApis = function(apis = {}){
    if(!mSelf.apis)
      mSelf.apis = {}

    for(var i in apis){
      mSelf.apis[i] = apis[i]
    }

    console.log(mSelf.apis)
  }
  yield next
}

