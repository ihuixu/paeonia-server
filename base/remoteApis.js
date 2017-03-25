var request = require('request')

function requestSync(options) {
	return function (done) {
		request(options, done)
	}
}


var remoteApi = function*(){
	var fns = {}

	for(var tag in this.apis){
		var arr = this.apis[tag].split('::')

		try{
			fns[tag] = yield requestSync({
				url: 'http://' + this.config.apis[arr[0]] + arr[1] 
				, json: true
				, method: 'GET'
			})

		}catch(e){

			fns[tag] = function*(){
				return e
			}

		}
	}

	var data = yield fns

	return data 
}


module.exports = function *(next){
  if(!this.apis)
    this.apis = {}

  if(!this.data)
    this.data = {}

  var remoteApisCbk = function(){}

  this.remoteApis = function(cbk){
    if(cbk)
      remoteApisCbk = cbk
  }

  yield next

  var data = yield remoteApi.call(this)

  for(var i in data){
    this.data[i] = data[i]
  }

  remoteApisCbk.call(this, this.data)

}
