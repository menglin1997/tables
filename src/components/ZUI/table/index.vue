<!--
 * @Descripttion: 表格
 * @version: 
 * @Author: zml
 * @Date: 2020-05-15 14:27:56
 * @LastEditors: zml
 * @LastEditTime: 2020-06-03 12:07:23
-->
<template>
  <div>
    <table>
      <!-- 表头部分 -->
      <thead>
        <tr>
          <!-- 排序 -->
          <th v-if="sort.isShow">{{ sort.text }}</th>
          <!-- 内容 -->
          <th v-for="(item, index) in tableHead" :key="index">{{ item }}</th>
          <!-- 操作 -->
          <th v-if="menu.isShow">{{ menu.text }}</th>
        </tr>
      </thead>

      <!-- 表格内容 -->
      <tbody>
        <tr class="tr" v-for="(item, index) in tableContent" :key="index">
          <!-- 表格排序 -->
          <td v-if="sort.isShow">
            {{ index + 1 }}
          </td>
          <!-- 处理表格内容逻辑 -->
          <td v-for="(k, i) in contentKey" :key="i">
            <el-button
              :type="k.btnType"
              v-if="k.type == 'btn'"
              @click="handleOpt(k.btnMethods, item, k.methodParams)"
              >{{ k.btnTxt }}</el-button
            >
            <span v-else-if="k.type === 'string'" :title="item[k.key]">
              {{ item[k.key] }}
            </span>
            <span v-else-if="k.type === 'moment'">
              {{ item[k.key] | dateFormate3 }}
            </span>
            <div v-else-if="k.type === 'tag'">
              <div v-for="(val, index) in k.tagItem" :key="index">
                <el-tag :type="val.type" v-if="item[k.key] == val.value">{{
                  val.text
                }}</el-tag>
              </div>
            </div>
            <span v-else-if="k.type === 'object1'">
              {{ item[k.key][k.key2] || "--" }}
            </span>
            <span v-else-if="k.type === 'object2'">
              {{ item[k.key][k.key2][k.key3] || "--" }}
            </span>
            <span v-else-if="k.type === 'array'">
              {{ item[k.key] || "--" }}
            </span>
            <span v-else> {{ item[k.key] }} </span>
            <!-- <el-button :type="k.btnType" v-if="k.btnType">{{ k.btnName }}</el-button> -->
            <!-- <span v-else>{{ k }}</span> -->
          </td>
          <td v-if="menu.isShow">
            <el-button
              :type="item1.type"
              v-for="(item1, index) in btnOpt"
              :key="index"
              @click="handleOpt(item1.methods, item, item1.methodParams)"
              :icon="item1.icon"
            >
              <span v-if="item1.name">{{ item1.name }}</span>
            </el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 没有数据情况 -->
    <div class="trNone" v-if="tableContent.length === 0">暂无数据</div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  filters: {
    // 传入秒数
    dateFormate3: function(dataStr, pattern = "YYYY-MM-DD") {
      let t = dataStr * 1000;
      // console.log(fromNow(t))
      return moment(t).format(pattern);
    }
  },
  props: {
    /**
     * 表格中的内容key
     * key 要显示在界面中的项目 必填
     * type接口返回的类型 必填
     * key2 type为object1时必填
     * key3 type为object2
     *
     */
    contentKey: {
      type: Array,
      default: function() {
        return [];
      }
    },
    /**
     * 表头内容
     * Array
     *
     */
    tableHead: {
      type: Array,
      default: function() {
        return [];
      }
    },
    /**
     * 是否显示排序
     * isShow {Bollean} 默认false不显示排序
     * text {string} 表头文字
     *
     */
    sort: {
      type: Object,
      default: function() {
        return {
          isShow: false,
          text: "序号"
        };
      }
    },
    /**
     * 是否显示操作栏
     * isShow {Bollean} 默认false不显示排序
     * text {string} 表头文字
     *
     */
    menu: {
      type: Object,
      default: function name() {
        return {
          isShow: true,
          text: "操作"
        };
      }
    },
    /**
     * 表格内容
     * Array
     */
    tableContent: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 操作按钮
    btnOpt: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      tableList: []
    };
  },
  methods: {
    /* 
    methods:父组件的方法
    val： 当前一行的数据
    params： 传过去的参数
    */
    // 点击操作栏
    handleOpt(methods, val, params) {
      if (methods) {
        this.$emit(methods, val, params);
      }
    },
    // 点击操作栏按钮
    handleBtn(val, methods) {
      if (methods) {
        this.$emit(methods, val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
// 表格样式
table {
  width: 100%;
  border-spacing: 0;
  background-color: #0f1c3e;
  color: #c8cfdd;
  border-radius: 10px;
  thead tr {
    background: #142143;
    height: 60px;
    th {
      text-align: center;
    }
  }
  tbody {
    background: #0f1c3e;
    .tr {
      // color: #0F1C3E;
      height: 60px;
      width: 100%;
      td {
        text-align: center;
        // border-bottom: 1px solid #1b273f;
      }
    }
  }
  tr:nth-child(2n) {
    background: #142143;
  }
}
.trNone {
  width: 100%;
  text-align: center;
  line-height: 80px;
  color: #999;
}
td,
th {
  min-width: 3vw;
  max-width: 10vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// tbody tr:hover {
//   background-color: rgba(0,0,0,.1);;
// }
</style>
