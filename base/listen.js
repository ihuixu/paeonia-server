module.exports = {	
	listenOver : function(callback){
		var mSelf = this
		this.listen = function(data){

			return function *(){
				callback.call(mSelf, data)
			}
		}
	}
}


