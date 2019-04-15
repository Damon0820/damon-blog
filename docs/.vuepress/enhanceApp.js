// import Vue from 'Vue'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
}) => {
	// ...做一些其他的应用级别的优化
	

	/*
	 * 设计方案：通过浏览器的url的query信息中的role参数，定义角色。
	 * enhanceApp.js中，全局mixin了角色判断的逻辑。
	 * 根据query的角色定义和config.js的角色权限配置，显示当前角色下的权限（显示和隐藏对应的nav）。
	 */
	const authorityMixin ={
		data () {
			return {
			}
		},
		methods: {
			// url的query 转 obj
			getUrlParamObj(){
				var obj = {};
				//获取url的参数部分
				var params = window.location.search.substr(1);
				//[^&=]+ 表示不含&或=的连续字符，加上()就是提取对应字符串
				params.replace(/([^&=]+)=([^&=]*)/gi,function(rs,$1,$2){
				//decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
						obj[$1] =  decodeURIComponent($2);
				});
				return obj;
			},
			// 根据权限列表，显示和隐藏对应的nav
			showNavWithAuth (authList) {
				// 获取navs的dom
				let navs = document.querySelectorAll('header.navbar .nav-item')
				let base = this.$site.base;
				for (let i = 0; i < navs.length; i++) {
					// console.log('fori----------------------------', i)
					let nav  = navs[i]
					let as = nav.querySelectorAll('a')
					let hasAuth = false // 是否拥有此nav的权限

					// 根据权限配置，和nav的所有a标签href路径做对比，判断是否有权限
					for (let j = 0; j < as.length; j++) {
						// console.log('forj', j)
						let a  = as[j]
						let href = a.href 															// http://basejy.com/basehelp/guide/first.html
						let path = href.slice(href.indexOf(base))				// /guide/first.html
						// 配置的nav路径
						let pathConf = '/' +path.split('/')[2] + '/' 		// guide
						hasAuth = authList.includes(pathConf)
						if (hasAuth) {
							// console.log(hasAuth, pathConf)
							break
						}
					}

					// 如果没有权限，隐藏nav
					if (!hasAuth) {
						nav.parentNode.removeChild(nav)
					}
				}
			},
			// 根据角色，动态设置首页的跳转链接
			setHomeActionLink (link) {
				if (!link) return
				let a = document.querySelector('.home .action a')
				if (!a) return
				let parent = a.parentNode
				let base = this.$site.base;
				// 替换a的href链接
				let href = a.href
				let i = href.indexOf(base)
				let newHref = href.slice(0, i + base.length - 1) + link
				a.href = newHref

				// HACK: 这里有个bug，直接改变a的href，实际点击跳转不到新改的href地址。所以hack用先移除a标签，再重新生成a标签去变相解决这个问题
				let newNode=a.cloneNode(true);
				parent.removeChild(a)
				parent.appendChild(newNode)
				// console.log('哈哈哈',  newHref)
			},
		},
		mounted () {
			// 首次进入把query的角色参数，存到session。之后就算是query消失了，也在session记录了角色信息。
			// 后面跳转的页面是没有query的，就去拿session的角色信息
			let queryObj = this.getUrlParamObj()
			let role = '' // 用户角色
			// console.log(queryObj)
			if (queryObj.role) {
				role = queryObj.role
				sessionStorage.setItem('BASE_HELP_ROLE', queryObj.role)
			} else {
				role = sessionStorage.getItem('BASE_HELP_ROLE')
			}

			// 如果没有传角色，则显示全部nav
			if (!role) {
				console.log('no role info')
				return
			}

			// 获取配置文件的预设权限列表
			let authority = this.$site.themeConfig.authority[role]
			// 要是没权限方面的限制（query的role角色不传，或者role角色在配置文件找不到对应的角色），则显示全部nav
			if (!authority) {
				console.log('no authority info')
				return
			}

			// 当前角色对应的nav显示，其他隐藏
			// console.log('角色', role)
			// console.log('权限',authority)
			this.showNavWithAuth(authority.authList)
			this.setHomeActionLink(authority.homeActionLink)
		},
	}

	Vue.mixin(authorityMixin)
}