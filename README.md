### 后台管理系统
```
cp .env.example .env.production
运行:
npm install 
npm run serve
打包:
npm run build
```
```
目录树
.
├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── src
│   ├── App.vue
│   ├── api                     
│   ├── assets
│   │   ├── css
│   │   ├── img
│   ├── components
│   │   ├── common
│   │   │   ├── Bread.vue
│   │   │   ├── Header.vue
│   │   │   ├── Home.vue
│   │   │   ├── Sidebar.vue     // 侧边栏菜单
│   │   │   ├── Tags.vue
│   │   │   ├── TreeMenu.vue
│   │   │   ├── bus.js
│   │   │   ├── directives.js
│   │   │   └── i18n           // 中英文
│   │   └── page               // 页面
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   └── utils
│       └── request.js
└── vue.config.js

```
