module.exports = function *(next){
  this.bindApis = function(apis = {}){
    if(!this.apis)
      this.apis = {}

    for(var i in apis){
      this.apis[i] = apis[i]
    }
  }

  yield next
}

