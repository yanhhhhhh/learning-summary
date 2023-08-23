# svg

## svg 文件基本属性

1. 渲染顺序："后来居上"——越靠近后面的元素渲染在最上面，可见性越高
2. svg 可以直接嵌套在 html 中使用
3. 可以使用 img 元素
4. 可以通过 object 元素引用 SVG 文件
   ```html
   <object data="image.svg" type="image/svg+xml"></object>
   ```
5. 可以使用 ifram 元素引用 SVG 文件
   ```html
   <iframe src="image.svg"></iframe>
   ```
