# 安装
除开常见的创建vue的项目的方式，还有一种vite的方式，使用起来也很方便快捷  
```
npm init vite-app projectname
cd projectname
npm install
npm run dev
```
上面就是通过``vite``的方式创建vue3的项目，在工程化示例中会有介绍
# api
基础的使用方法
# app
工程化示例
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