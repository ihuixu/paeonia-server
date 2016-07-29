module.exports = function(extFn){
	extFn = extFn || {}

	var mSelf = this

	return function(data){
		mSelf.body = data 

	}
}


