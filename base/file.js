var fs = require('fs')

function mkFile(filePath, content){
	try{
		return fs.writeFileSync(filePath, content, "utf-8")

	}catch(e){
		console.log(e)
		return ''
	}
}

function mkDir(dirName){
	fs.mkdirSync(dirName)
	console.log('mkdir', dirName)
}

function readFile(filePath){
	try{
		return fs.readFileSync(filePath, 'utf-8')

	}catch(e){
		console.log(e)
		return ''
	}

}

function readDir(filePath){
	try{
		return fs.readdirSync(filePath)

	}catch(e){
		console.log(e)
		return []
	}
}

function exist(filePath){
  return fs.existsSync(filePath)
}

exports.mkFile = mkFile
exports.mkDir = mkDir
exports.readFile = readFile
exports.readDir = readDir
exports.exist = exist


