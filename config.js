var path = require('path')
var file = require('./base/file')
var configDefault = require('./config.default.json')

function sync(a,b){
  for(var i in b){
    a[i] = b[i] 
  }
}

function testDir(dirPath){
  if(!file.exist(dirPath)){
    file.mkDir(dirPath)
  }
}

module.exports = function(configUser = {}){
  var configAll = {}

  var hosts = (configUser.hosts && JSON.stringify(configUser.hosts) !== '{}') ? configUser.hosts : configDefault.host

  for(var hostName in hosts){

    var config = {
      serverPath : path.join(__dirname, '../../')
    }

    config.appPath = path.join(config.serverPath, (configUser['appPath'] || configDefault['appPath']))

    config.hostPath = path.join(config.appPath, hosts[hostName])
    config.configPath = path.join(config.hostPath,  '/config/')

    testDir(config.hostPath)
    testDir(config.configPath)

    ;['path', 'site', 'apis'].map(function(v){

      config[v] = {}

      sync(config[v], configDefault[v])
      sync(config[v], configUser[v])
    
      var configVPath = path.join(config.configPath, v+'.json')

      try{
				var configV = require(configVPath)
        sync(config[v], configV)

      }catch(e){

      }

      file.mkFile(configVPath, JSON.stringify(config[v], null, 2))
    })


    var configPathPath = path.join(config.hostPath,  '/config/path.json')

    try{
      var pathConfig = require(configPathPath)
    
      for(var pathName in pathConfig){
        pathConfig[pathName] = path.join(config.hostPath, pathConfig[pathName])

        testDir(pathConfig[i])
        
      }

      config['path'] = pathConfig

    }catch(e){

    }

    configAll[hostName] = config
  }

  return configAll
}
