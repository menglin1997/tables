/*
 * @Descripttion:
 * @version:
 * @Author: zml
 * @Date: 2020-05-29 12:20:11
 * @LastEditors: zml
 * @LastEditTime: 2020-05-29 16:35:58
 */
// 使用 Mock
import { param2Obj } from "@/utils";
import Mock from "mockjs";
// 模拟数据列表
var arr = [];

for (let i = 0; i < 100; i++) {
  let newArticleObject = Mock.mock({
    name: "@cname()",
    "age|1-110": 1,
    "status|1-2": 1,
    creatTime: "@datetime",
    id: "@id()"
  });
  arr.push(newArticleObject); //将模拟的数据放到数组中
}
// }
// 数据的删除操作
let list = function(options) {
  console.log(options, "params:");
  let url = param2Obj(options.url);
  console.log(url, "url");
  console.log(options, "打印的options");
  let rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
  switch (rtype) {
    case "get":
      break;
    case "delete":
      //   let id = parseInt(JSON.parse(options.body).params.id); // 获取请求的id，将options.body转换为JSON对象
      //   console.log(id);
      var id = parseInt(JSON.parse(options.body).id);
      arr = arr.filter(function(val) {
        console.log(val, "val");
        return val.id != id; // 过滤掉前台传过来的id对应的相应数据，并重新返回
      });
      break;
    default:
      break;
  }
  return {
    data: arr
  };
};

Mock.mock("/list", /get|post/i, list);

// 数据的添加操作
let listAdd = function(options) {
  //  console.log("传过来的数据"+JSON.parse(options.body).params.obj);
  let obj = JSON.parse(options.body).params.obj;
  // console.log("数据获取"+ obj);
  arr = arr.concat(obj); // 将前台返回来的数据，拼接到数组中。
  return {
    data: arr
  };
};
Mock.mock("/listAdd", /get|post/i, listAdd);

// 数据的修改操作
let listUpdate = function(options) {
  let obj = JSON.parse(options.body).params.obj;
  // console.log(JSON.parse(options.body).params);
  // let id = parseInt(JSON.parse(options.body).params.obj.id);
  arr = arr.map(val => {
    // 将需要替换的数据替换掉
    // console.log(val)
    return val.id == obj.id ? obj : val;
  });
  return {
    data: arr
  };
};
Mock.mock("/listUpdate", /get|post/i, listUpdate);
