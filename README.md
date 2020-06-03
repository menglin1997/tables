<!--
 * @Descripttion: README
 * @version: 
 * @Author: zml
 * @Date: 2020-05-29 12:13:08
 * @LastEditors: zml
 * @LastEditTime: 2020-06-03 10:22:29
--> 
# table
关于ElementUI  Vue的一个深色表格1
## 安装依赖

```
npm install
```

### 运行
```
npm run serve
```

### 部署
```
npm run build
```

## 项目截图

![1](./1.png)

## Demo

> 组件依赖包moment，所以记得先装包：

````javascript
npm install moment --save
````

> template中使用：

````html
 <tables
      :contentKey="contentKey"
      :menu="menu"
      :btnOpt="btnOpt"
      :tableContent="tableContent"
      :tableHead="tableHead"
      @handleChange="handleChange"
    ></tables>
````

> script中使用：

````javascript
import tables from "@/components/ZUI/table";
components: {
	tables
},
````



## API介绍

| 属性名        | 类型   | 默认值                         |                             解释                             |
| ------------ | ------ | :---------------------------- | :----------------------------------------------------------: |
| contentKey   | Array  | []                            | tbody展示内容，和tableHead顺序一 一对应（下方有该属性详细介绍） |
| tableHead    | Array  | []                            | 表头文字内容，和contentKey顺序一一对应 （下方有该属性详细介绍） |
| sort         | Object | { isShow: false, text: "序号" } | isShow：是否在左侧显示序号默认false不显示，text：显示后表头文本内容，默认为【序号】 |
| menu         | Object | { isShow: true, text: "操作" }  | isShow：是否显示右侧操作栏 默认true显示，text：显示后表头文本内容，默认为【操作】 |
| tableContent | Array  | []                            |                      后台返回过来的内容                      |
| btnOpt       | Array  | []                            |            显示在操作栏下方的按钮，下方有具体介绍            |