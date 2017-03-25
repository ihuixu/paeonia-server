var request = require('request')

function requestSync(options) {
	return function (done) {
  console.log(done)
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

  console.log(fns)

	var data = yield fns

	return data 
}


module.exports = function(apis){
	this.apis = this.apis || {}

	for(var i in apis){
		this.apis[i] = apis[i]
	}

	this.bridge = function*(){

		var data = yield remoteApi.call(this)
		
		return data

	}
}
