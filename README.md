# 安装
除开常见的创建vue的项目的方式，还有一种vite的方式，使用起来也很方便快捷  
```
npm init vite-app projectname
cd projectname
npm install
npm run dev
```
上面就是通过``vite``的方式创建vue3的项目，在工程化示例中会有介绍
## [min-vite](https://github.com/zxlfly/min-vite)
## [基于vite的完整工程化](https://github.com/zxlfly/mini-ui)
# api
基础的使用方法
# app
工程化示例
# renderer
自定义渲染器
# myvue
实现一个简版的vue3

# 源码调试
- GitHub上面迁出vue3的源码
  - 建议先导入到gitee，不然很慢
- 安装依赖
  - ``yarn --ignore-scripts``
- ⽣成sourcemap⽂件，package.json
  - ``"dev": "node scripts/dev.js --sourcemap"``
- 编译： ``yarn dev``
- 然后随意调试

## 自定义渲染器renderer
将获取到的vnode转换为特定平台的特定操作。

## [vue3核心源码解析](https://www.processon.com/view/link/612e7c9cf346fb01fa4e800f)