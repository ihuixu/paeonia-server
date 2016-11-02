module.exports = function(extFn = {}){
	var mSelf = this

	return function(data){
		mSelf.body = data 

	}
}


