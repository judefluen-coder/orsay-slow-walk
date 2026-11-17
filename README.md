# 奥赛，慢慢逛 · Orsay Slow Walk

在像素风的奥赛展厅里走向真实作品图像，停下来观看，再展开讲解。

**[进入漫游](https://judefluen-coder.github.io/orsay-slow-walk/)**

![GitHub Pages deployment](https://github.com/judefluen-coder/orsay-slow-walk/actions/workflows/pages.yml/badge.svg)

## 使用

- 方向键或 WASD 行走，靠近并面向作品后按 E 观赏。
- 从门、通道、楼梯和电梯连接不同区域，通过地图规划行程。
- 作品提供原图、基础介绍、深入阅读和资料来源。
- 漫游记录保存在当前浏览器；不同网站地址的记录相互独立。

## 项目边界

这是持续完善的数字漫游 Demo，非奥赛博物馆官方产品。项目中的可达区域、作品记录和图像数量，不代表已穷尽实馆当季所有展品。资料支持程度、原作在展状态、部分门洞与墙位的示意性质保留在作品和导览说明中。

作品及建筑资料的来源与图像署名保留在页面和数据文件中。第三方图片的权利归各自权利人；本仓库未为这些图片另行授予授权。

## 本地运行

无需安装项目依赖：

```sh
python3 -m http.server 8000 --directory site
```

打开 `http://localhost:8000/`。检查发布包：

```sh
node check-static.mjs
```

## 发布

`site/` 是完整的 HTML、CSS、JavaScript 和本地图片包，不依赖 Sites 后端。

GitHub Actions 在 `main` 更新后验证静态资源和版本指纹，再发布 `site/` 到 GitHub Pages。保留相对资源地址，以兼容仓库子目录。

本仓库只发布正式漫游版，不包含验收中心、验收定位接口或验收模式。发布检查会拒绝包含这些工具的包。`orsay-review-additions.js` 是历史命名的正式作品补充数据，保留它以完整展示作品。

需要从开发项目同步新内容时，在本仓库执行：

```sh
node import-formal.mjs /path/to/museum-source
node check-static.mjs
```

导入器读取开发目录中的 `orsay.html` 及其依赖，只更新本仓库的正式发布包，不修改开发目录或其中的验收工具。正式版本号见 `static-manifest.json` 的 `release.cacheKey`。本仓库不包含本地验收反馈、开发输出和平台凭据。
