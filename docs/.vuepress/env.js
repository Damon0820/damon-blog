
/**
 * 多服打包配置（不区分环境）
 */

var env_name = '' // 服名：默认值为''
var base = 'basehelp' // 打包后的路径名,默认值basehelp

// console.log(process.argv)
var argv = process.argv

let config = {} // 存储所有自定义参数键值对
argv.forEach(val => {
	// =代表是自定义参数键值对，才需要解析
	if (val.indexOf('=') > -1) {
		var entry = val.split('=')
		config[entry[0]] = entry[1]
	}
})

// 对不同的服，设置不同的路径名
switch (config.env_name) {
	case 'dev':
		base = 'basehelp/dev'
		break
	case 'check' :
		base = 'basehelp/check'
		break
	case 'experience':
		base = 'basehelp/experience'
		break
	case 'formal':
		base = 'basehelp/formal'
		break
}

console.log(config)

module.exports = {
	ENV_NAME: config.env_name || env_name,
	BASE: base,
}