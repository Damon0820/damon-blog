
# 项目必读

## 安装依赖
``` 
npm install 
```

## 开发
然后就可以开始写作了:
```
npm run dev
```

## 多服发布
打包代码
+ 本地打包测试：
	```
	npm run build
	```
+ 测试服：
	```
	npm run build:check
	```
+ 体验服：
	```
	npm run build:experience
	```
+ 正式服：
	```
	npm run build:formal
	```

## 说明

### 角色配置

1. 在config.themeConfig.nav中配置的link地址。如果此nav要在对应角色中显示，需要将link添加到config.themeConfig.authority的对应角色中。

2. 浏览器访问，url路径最后带上query信息(?role=xxx的形式,xxx为角色名)，例如：http:basejy.com/basehelp/?role=teacher，代表老师角色。就能显示出当前角色下nav导航栏。

# 文档写作帮助


[vuepress 官方说明](https://vuepress.vuejs.org/zh/guide/getting-started.html#%E7%8E%B0%E6%9C%89%E9%A1%B9%E7%9B%AE)

# 参考

[vuepress 搭建静态帮助文件](https://segmentfault.com/a/1190000017055963)
[vuepress 官方说明](https://vuepress.vuejs.org/zh/guide/getting-started.html#%E7%8E%B0%E6%9C%89%E9%A1%B9%E7%9B%AE)
