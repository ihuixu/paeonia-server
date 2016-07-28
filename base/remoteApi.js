var request = require('request')

function requestSync(options) {
	return function (done) {
		request(options, done)
	}
}

module.exports = function*(php){
	var fns = {}

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


