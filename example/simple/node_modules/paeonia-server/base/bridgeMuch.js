var request = require('request')

function requestSync(options) {
	return function (done) {
		request(options, done)
	}
}


var remoteApi = function*(){
	var fns = {}

	for(var tag in this.php){
		var arr = this.php[tag].split('::')

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


module.exports = function(php){
	this.php = this.php || {}

	for(var i in php){
		this.php[i] = php[i]
	}

	this.bridge = function*(){

		var data = yield remoteApi.call(this)
		
		return data

	}
}
