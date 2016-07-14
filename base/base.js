module.exports = {	
	bindDefault : function(php){
	}

	, bridgeMuch : function(php){
		this.bridge = function(){
			return new Promise(function(resolve, reject){
				var t = setTimeout(function(){
					var data = '123456'

					resolve(data)

				}, 3000)
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


	, render : function(tplname, data){
		this.body = arguments
	}

}


