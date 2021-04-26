最近更新：
2020-4-26 ximing

## 项目技术

- lodash - 某些函数优于 es6 原生。
- yarn - 不要用 npm
- css module - 暂时不用 less/sass， 使用模块化 css，避免全局污染。
- git
- react.js 16+ - 使用 Hooks+Context, 禁止使用 class
- webpack 4 - @5 还不够完善，不推荐
- prettier - 保存后自动格式化
- ant design - 主要 UI 库

## 运行

```bash
yarn dev
```

## 目录功能简介

> `/components` 保存所有通用组件，业务组件，可自定文件夹层级。

> `/libs/constant.js` 常量

> `/libs/context.js` 所有 React Context

> `/libs/services.js` 所有 后端接口路径

> `/pages` 新建一个文件夹，大写开头，即可生成一个路由。此文件夹存储所有页面。

> `/pages/api` （本项目）约定为前端假数据 api 文件夹，具体方法参考内部现有文件。

> `/styles` 所有 css module 文件

> `/.env` 可配置变量
