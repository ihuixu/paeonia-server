var request = require('request')

function requestSync(options) {
	return function (done) {
		request(options, done)
	}
}


var remoteApi = function*(){
	var fns = {}
	var php = this.php

	for(var tag in php){
		var arr = php[tag].split('::')

		fns[tag] = yield requestSync({
			url: 'http://' + this.config.apis[arr[0]] + arr[1] 
			, json: true
			, method: 'GET'
		})
	}

	var data = yield fns

	return data 
}


module.exports = function(php){
	if(this.php){
		for(var i in this.php){
			php[i] = this.php[i]
		}
	}

	this.php = php

	this.bridge = function*(){

		var data = yield remoteApi.call(this)
		
		return data

	}
}
