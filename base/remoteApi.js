var request = require('request')

function requestSync(options) {
	return function (done) {
		request(options, done);
	}
}

module.exports = function*(php){
	var fns = {}

	for(var tag in php){
		var arr = php[tag].split('::')
		var options = {
				url: 'http://' + this.config.apis[arr[0]] + arr[1] 
				, json: true
				, method: 'GET'
		}

		fns[tag] = yield requestSync(options, function(error, response, body){

			if(!error && response.statusCode == 200){
				resolve(body)

			}else{
				resolve(false)
			}

		})
	}


	var data = yield fns

	return data 

}


