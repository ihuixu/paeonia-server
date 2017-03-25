module.exports = function *(next){
  var mSelf = this
  this.bindApis = function(apis = {}){
    mSelf.bindApisFn = function(){
      if(!mSelf.apis)
        mSelf.apis = {}

      for(var i in apis){
        mSelf.apis[i] = apis[i]
      }

      console.log(mSelf.apis)
    }
  }
  console.log('register', 'bindApis')

  yield next

  if(this.bindApisFn){
    this.bindApisFn()
    console.log('do', 'bindApisFn')
  }
}

