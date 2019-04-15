var env = require('./env.js')

module.exports = {
  title: '倍思智慧教学云平台',
	description: '帮助文档',
	base: `/${env.BASE}/`, // 生产环境下，工程所在服务器的路径名
	dest: env.BASE, // 打包目录名
  themeConfig: {
		// 导航链接(一级导航)
		nav: [
			{
				text: '帮助手册',
				link: '/helpBook/'
			},
			{ text: 'pk', link: '/pk/' },

		],
		// 多个侧边栏
		sidebar: {
		},
		// 权限配置
		authority: {
			// 老师
			teacher: {
				authList: [ // 拥有的权限
					'/helpBook/',
				],
				homeActionLink: '/helpBook/' // 改变首页快速上手跳转地址(可不选，不选择就是首页的默认跳转地址)
			},
			// 校长
			principal: {
				authList: [],
				homeActionLink: '/helpBook/'
			},
		},
		// 嵌套标题链接y
		// sidebarDepth: 2,
		// head: [
		// 	['link', { rel: 'icon', href: `/logo.png` }]
		// ],
  }
}
