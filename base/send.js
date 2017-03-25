module.exports = function *(next){
  var mSelf = this
  this.send = function(data){
    mSelf.sendFn = function(){
      mSelf.body = data 
    }
  }
  console.log('register', 'send')

  yield next

  if(this.sendFn){
    this.sendFn()
    console.log('do', 'sendFn')
  }
}

