# JNX.s_basement

JNX 个人网站。使用原生 HTML、CSS 和 JavaScript，无需构建。

## 本地预览

在仓库目录运行 `python3 -m http.server 8000`，然后打开
`http://localhost:8000`。登录和数据功能需要连接现有 Supabase 服务。

## 代码分工

| 文件 | 用途 |
| --- | --- |
| `index.html`、`style.css` | 主页面结构和基础样式 |
| `script.js` | 群聊界面、消息和实时订阅 |
| `script-core.js` | 登录、注册、账号设置、语言切换和动态 |
| `homepage-layout.js` | 首页卡片、菜单和动态窗口 |
| `theme-layer-fix.js` | 主题、平板布局、弹窗层级及扩展模块加载 |
| `recent-comments-theme.js` | 明暗主题切换和动态评论 |
| `mentions.js`、`private-unread.js`、`homepage-chat-unread.js` | 私聊、提及和未读标记 |
| `members.js`、`profile-enhancement.js` | 成员列表、资料和头像 |
| `login-home-gate.js` | 首页登录提示 |
| `woodfish.js`、`woodfish-animation.js` | 木鱼功能及动画 |
| `points-system.js`、`points-shop.js` | 积分任务和兑换 |
| `admin-notifications.js`、`site-changelog.js` | 管理员通知和网站更新日志 |
| `archive.html`、`archive.css`、`archive.js` | 写作档案、检索、阅读和评论 |

## 加载关系

- `index.html` 显式加载 `script.js` 和 `script-core.js`，不使用 `document.write`。
- `homepage-layout.js` 加载评论主题、首页未读标记和成员模块。
- `theme-layer-fix.js` 只由 HTML 加载一次；它按原有方式加载更新日志、资料、积分、兑换和管理员通知。
- CSS 模板保留在原模块内，保持样式插入位置及覆盖顺序。
- 写作档案是独立入口，直接加载自身资源。

隐藏的导航按钮、原始页面区块仍有事件绑定和内容搬移用途，不能仅因不可见就删除。
数据库表、RPC、账号数据和权限设置由现有 Supabase 项目维护。
