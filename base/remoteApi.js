var request = require('request')
var Promise = require('bluebird')

module.exports = function(php){
	var fns = []
	var tags = []

	for(var tag in php){
		var arr = php[tag].split('::')
		var api = 'http://' + this.config.apis[arr[0]] + arr[1]

		var fn = create(api)

		tags.push(tag)
		fns.push(fn)
	}

	function create(api){
		
		return new Promise(function(resolve, reject){

			request({
				url: api 
				, json: true
				, method: 'GET'

			}, function(error, response, body){

				if(!error && response.statusCode == 200){
					resolve(body)

				}else{
					resolve(false)
				}

			})

		})
	}


	return new Promise(function(resolve, reject){

		new Promise.all(fns).then(function(res){

			var data = {}

			for(var i in tags){
				data[tags[i]] = res[i]
			}

			resolve(data)

		})

	})

}


