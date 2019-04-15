var env = require('./env.js')

module.exports = {
  title: 'Damon风',
	description: '欢迎来到我的Blog',
	// base: `/${env.BASE}/`, // 生产环境下，工程所在服务器的路径名
	// dest: env.BASE, // 打包目录名
	base: `/damon/blog`, // 生产环境下，工程所在服务器的路径名
	dest: 'damon/blog', // 打包目录名
  themeConfig: {
		// 导航链接(一级导航)
		nav: [
			{
				text: 'web技术',
				items: [{
						text: 'js',
						link: '/web/js/'
				},]
			},
			{
				text: 'github',
				link: 'https://github.com/Damon0820/damon-blog'
			},

		],
		// 多个侧边栏
		sidebar: {
		},
		// 嵌套标题链接y
		// sidebarDepth: 2,
		// head: [
		// 	['link', { rel: 'icon', href: `/logo.png` }]
		// ],
  }
}
