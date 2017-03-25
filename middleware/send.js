module.exports = function *(next){
  this.send = function(data){
    this.body = data 
  }

  yield next
}

