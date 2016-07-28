var path = require('path')
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

exports.mkFile = mkFile
exports.mkDir = mkDir
exports.readFile = readFile
exports.readDir = readDir

exports.getSource = function(filePath){
	var filePaths = filePath.split('?')
	filePath = filePaths[0]

	var extname = path.extname(filePath)
	if(extname != '.js' && extname != '.vue')
		filePath += '.js'

	return readFile(filePath)
} 

exports.getJSContent = function(modPath, modSource){
	if(path.extname(modPath) == '.map')
		return modSource||''

	var jsfile = 'define("' + modPath + '",function(require, exports){\n' + (modSource||'') + '\n});\n'
	return jsfile
}

