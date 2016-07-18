var path = require('path')
var remoteApi = require('./remoteApi')
var file = require('./file')

module.exports = {	
	bridgeMuch : function(php){
		var mSelf = this
		defaultAction.call(this, php)
		
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
	, bridgeReadFile : function(filepath){
		filepath = path.join(this.appConfig.hostPath, filepath)

		this.bridge = function(){
			return new Promise(function(resolve, reject){
				try{
					var data = file.readFile(filepath)
					resolve(data)

				}catch(err){
					reject(err)

				}

			})
		}
	}

}


function defaultAction(php){
	php = php || {}

	if(this.php){
		for(var i in this.php){
			php[i] = this.php[i]
		}
	}

	this.php = php
}


