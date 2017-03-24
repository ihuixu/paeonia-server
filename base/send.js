module.exports = function *(next){
  this.send = send.call(this)
  yield next
}

function send(){
  return function(data){
    this.body = data 
  }
}


