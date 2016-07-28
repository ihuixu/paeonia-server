var remoteApi = require('./remoteApi')

module.exports = function(php){
	var mSelf = this

	if(this.php){
		for(var i in this.php){
			php[i] = this.php[i]
		}
	}

	this.php = php

	this.bridge = function*(){

		var data = yield remoteApi.call(mSelf, php)
		
		return data

	}
}
