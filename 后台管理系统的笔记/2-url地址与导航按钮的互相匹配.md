### url 地址的变化与导航按钮之间的关联

- 当点击侧边导航按钮时，url 需要进行跳转。同时，如果手动的改变 url，即手动的进入某一个 url，侧边导航也需要匹配到对应的按钮，处于高亮状态

### 实现思路

1. 在模板中 el-sub-menu 会绑定一个 `index` 值，这个值确定当前活跃状态的菜单是哪一个，在 el-menu 中需要默认绑定
   `:default-active="activeMenu"`
2. `activeMenu`是一个计算属性，如果 url 发生了变化，就会根据当前的 url 路径，从用户的所有菜单项中筛选，找出符合条件的那个，拿到对应的 id,这个 id 是计算属性的返回值
   ```javascript
   const curRoute = useRoute();
   const activeMenu = computed(() => {
     const activeRoute = matchBtnfromUrl(curRoute.path, userMenus);
     return activeRoute.id + "";
   });
   ```
