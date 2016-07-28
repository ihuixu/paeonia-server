exports.listenOver = function(callback){
	this.listen = function*(data){
		callback.call(this, data)
	}
}

