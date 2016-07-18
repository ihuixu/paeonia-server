var remoteApi = require('./remoteApi')

module.exports = {	
	bridgeMuch : function(php){
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
}


