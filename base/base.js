var Promise = require('bluebird')

module.exports = {	
	bindDefault : function(php){
		console.log('bindDefault')
	}

	, bridgeMuch : function(php){
		this.bridge = function(){
			return new Promise(function(resolve, reject){
				var t = setTimeout(function(){
					var data = '123456'

					console.log('bridge', data)
					resolve(data)

				}, 3000)
			})
		}
	}

	, listenOver : function(callback){
		var mSelf = this
		this.listen = function(data){

			return function *(){
				console.log('listen', data)
				callback.call(mSelf, data)
			}
		}
	}


	, render : function(tplname, data){
		this.body = arguments
	}

}


