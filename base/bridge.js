var remoteApi = require('./remoteApi')

module.exports = {	
	bindDefault : function(php){
		this.php = {}
	}

	, bridgeMuch : function(php){
		var mSelf = this
		php = php || {}

		if(this.php){
			for(var i in this.php){
				php[i] = this.php[i]
			}
		}

		this.php = php
		
		this.bridge = function(){
			return new Promise(function(resolve, reject){

				remoteApi.call(mSelf, php).then(function(data){
					resolve(data)

				}, function(err){
					reject(err)

				})
			})
		}
	}

	, listenOver : function(callback){
		var mSelf = this
		this.listen = function(data){

			return function *(){
				callback.call(mSelf, data)
			}
		}
	}
}


