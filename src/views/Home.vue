<!--
 * @Descripttion: 
 * @version: 
 * @Author: zml
 * @Date: 2020-05-29 12:13:08
 * @LastEditors: zml
 * @LastEditTime: 2020-06-03 12:09:05
-->
<template>
  <div class="home">
    <tables
      :contentKey="contentKey"
      :menu="menu"
      :btnOpt="btnOpt"
      :tableContent="tableContent"
      :tableHead="tableHead"
      @handleChange="handleChange"
      @checkDetail="checkDetail"
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
      tableHead: [
        "登录账号",
        "激活时间",
        "老师",
        "登陆账号",
        "管理员",
        "状态",
        "详情"
      ],
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
          key: "loginName",
          type: "string"
        },
        {
          key: "expireTime",
          type: "moment"
        },
        {
          key: "teacher",
          type: "array"
        },
        {
          key: "organInfoVo",
          type: "object1",
          key2: "sysName"
        },
        {
          key: "organInfoVo",
          type: "object2",
          key2: "userInfoVo",
          key3: "realName"
        },
        {
          key: "status",
          type: "tag",
          tagItem: [
            {
              type: "success",
              value: 1,
              text: "启用"
            },
            {
              type: "danger",
              value: 2,
              text: "禁用"
            }
          ]
        },
        {
          key: "",
          type: "btn",
          btnTxt: "详情",
          btnMethods: "checkDetail",
          methodParams: "我是详情",
          btnType: "text"
        }
      ],
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
          methodParams: {
            ref: "addOrUpdate",
            type: 1
          }
        },
        {
          name: "重启设备",
          methods: "handleReset",
          type: "success",
          methodParams: {}
        },
        {
          name: null,
          icon: "el-icon-delete",
          type: "danger",
          methods: "handleDel"
        }
      ]
    };
  },
  async created() {
    // const { data } = await this.$http.get("/list");
    // this.tableContent = data.data.slice(1, 10);
    this.tableContent = [
      {
        id: "22",
        status: 1,
        loginName: "2e",
        expireTime: "1590076800",
        teacher: ["美子老师", "包包老师", "木子老师"],
        organInfoVo: {
          sysName: "测试人员",
          userInfoVo: {
            realName: "代理商001"
          }
        }
      },
      {
        id: "2",
        status: 2,
        loginName: "2",
        activateTime: "2",
        organId: "1253231593917485058",
        expireTime: "1590076800",
        // teacher: ["美子老师", "包包老师", "木子老师"],
        teacher: null,
        organInfoVo: {
          sysName: "测试人员",
          userInfoVo: {
            realName: "代理商001"
          }
        }
      }
    ];
  },
  methods: {
    // 编辑
    handleChange(item, params) {
      console.log(item, params, "我是组件传过来的哦12");
      this.$message.success("点击了操作栏按钮");
    },
    // 详情
    checkDetail(item, params) {
      console.log(item, params, "我是组件传过来的哦1");
      this.$message.success("点击了详情");
    }
  }
};
</script>
