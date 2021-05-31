## 项目简介

官网预览项目。
基于 react17 + sass + antd4, 出于 SEO 的需要，引入了 Next.js 框架,

## 开始

```bash
clone http://code.in-deco.com/crm-saas/front-marketing-website.git
cd front-marketing-website
```

## 安装依赖

```bash
yarn
```

## 本地运行

```bash
yarn dev
```

## 打包发布

```bash
yarn export
```

更新记录：

2020-4-27 ximing  
2020-4-26 ximing

## 项目技术

- ES 6 (async/await/...)
- lodash - 某些函数优于 es6 原生。
- yarn - 不要用 npm
- css module - 暂时不用 less/sass， 使用模块化 css，避免全局污染。
- git - commit 名称范例 'feature/add README.md'
- react.js 17+ - 使用 Hooks+Context, 禁止使用 class
- webpack 4
- prettier
- ant design

## 本地预览站点

```bash
yarn serve:out
```

## 目录功能简介

> `/components` 通用组件，业务组件，可自定文件夹层级。

> `/libs/constant.js` 常量（列表限制数等）

> `/libs/context.js` 储存 React Context

> `/libs/services.js` 后端接口

> `/libs/utils.js` 通用函数

> `/pages` 新建一个文件夹，大写开头，即可生成一个路由。此文件夹存储所有页面。

> `/styles` 所有 css module 文件

> `/.env` 可配置变量

## 可选路线

- 如果首页渲染速度不理想，可以切换成服务端渲染。 前提是需要一个运行 Node.js 的主机。
