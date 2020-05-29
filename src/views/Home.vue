<!--
 * @Descripttion: 
 * @version: 
 * @Author: zml
 * @Date: 2020-05-29 12:13:08
 * @LastEditors: zml
 * @LastEditTime: 2020-05-29 17:17:57
-->
<template>
  <div class="home">
    <!-- 暂无数据 -->
    <!-- <tables :tableHead="tableHead1"></tables> -->
    <tables
      :contentKey="contentKey"
      :menu="menu"
      :btnOpt="btnOpt"
      :tableContent="tableContent"
      :tableHead="tableHead"
      @handleChange="handleChange"
    ></tables>
  </div>
</template>

<script>
import tables from "@/components/ZUI/table";
// import { getProvincesList } from "@/api/table";
export default {
  name: "Home",
  components: {
    tables
  },
  data() {
    return {
      // 表格中的内容key
      /**
       * 表格中的内容key
       * key 要显示在界面中的项目 必填
       * type接口返回的类型 必填
       * key2 type为object1时必填
       * key3 type为object2
       *
       */
      contentKey: [
        {
          key: "name",
          type: "string"
        },
        {
          key: "age",
          type: "string"
        },
        {
          key: "status",
          type: "string"
        },
        {
          key: "creatTime",
          type: "string"
        }
        // {
        //   key: 'machineCode',
        //   type: 'string'
        // },
        // {
        //   key: 'machineCode',
        //   type: 'string'
        // },
        // {
        //   key: 'machineCode',
        //   type: 'string'
        // },
        // {
        //   key: 'organInfoVo',
        //   type: 'object1',
        //   key2: 'organName'
        // },
        // {
        //   key: 'machineCode',
        //   type: 'array'
        // },
        // {
        //   key: 'organInfoVo',
        //   type: 'object2',
        //   key2: 'organName',
        //   key3: 'userInfoVo'
        // }
      ],
      tableHead1: ["设备名称", "设备编号", "类型名称", "设备地址"],
      tableHead: ["姓名", "年龄", "状态", "创建时间"],
      menu: {
        isShow: true,
        text: "可以变"
      },
      tableContent: [],
      /**
       * 操作栏按钮
       * name {string} 按钮文字
       * type {string} 按钮样式  需要element有该颜色
       * methods {string} 父组件方法
       * icon 是否显示图标 不填则不显示 需要element里面有此图标
       * methods后边的属性是事件 如果想要生效必须在组件中绑定和父组件中注册,如:handleChange
       * 每一个事件有两个参数 第一个是默认有的  第二个是使用者自己传递的  规定为methodParams
       */
      btnOpt: [
        {
          name: "编辑",
          methods: "handleChange",
          type: "primary",
          isAuth: "pc:device:edit",
          methodParams: {
            ref: "addOrUpdate",
            type: 1
          }
        },
        {
          name: "重启设备",
          methods: "handleReset",
          isAuth: "pc:device:restartDevice",
          type: "success",
          methodParams: {}
        },
        {
          name: null,
          icon: "el-icon-delete",
          type: "danger",
          isAuth: "pc:device:delete",
          methods: "handleDel"
        }
      ]
    };
  },
  async created() {
    // getProvincesList().then(res => {
    //   console.log(res, "res");
    // });
    const { data } = await this.$http.get("/list");
    console.log(data, "data");
    this.tableContent = data.data.slice(1, 10);
  },
  methods: {
    handleChange(item, b) {
      console.log(item, b);
    }
  }
};
</script>
