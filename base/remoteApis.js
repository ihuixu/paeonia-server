var request = require('request')

module.exports = function *(next){
  var mSelf = this

  this.remoteApis = function(){

    if(!mSelf.apis)
      mSelf.apis = {}

    var fns = {}

    for(var tag in mSelf.apis){
      var arr = mSelf.apis[tag].split('::')

      try{
        fns[tag] = function (next){
          request({
            url: 'http://' + mSelf.config.apis[arr[0]] + arr[1] 
            , json: true
            , method: 'GET'
          }, function(){

            console.log(123)
          
          })

        }

      }catch(e){

        fns[tag] = function*(){
          return e
        }

      }
    }

    console.log('fns', fns)

    var data = yield fns

    console.log('data', data)

  }

  yield next
}



