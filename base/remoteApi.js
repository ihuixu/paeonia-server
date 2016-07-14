var request = require('request')
var querystring = require('querystring')
var url = require('url')
var Promise = require('bluebird')

module.exports = function(php){
	var fns = []
	var tags = []

	for(var tag in php){
		var arr = php[tag].split('::')
		var api = 'http://' + this.config.api.hosts[arr[0]] + arr[1]

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

				resolve(body)

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


