/*
 * @Descripttion:
 * @version:
 * @Author: zml
 * @Date: 2020-05-29 14:30:56
 * @LastEditors: zml
 * @LastEditTime: 2020-05-29 15:49:46
 */
import Vue from "vue";
import axios from "axios";
import router from "@/router";
import qs from "qs";
import merge from "lodash/merge";
import { clearLoginInfo } from "@/utils";
import { Message } from "element-ui";
// import getRealJsonData from './jsonData'

const http = axios.create({
  timeout: 5000 * 30,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
  config => {
    config.headers["Authorization"] = Vue.cookie.get("Authorization"); // 请求头带上token
    // console.log(config)
    // console.log(config.headers['Content-Type'])
    // if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    //   config.data = JSON.parse(config.data)
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
http.interceptors.response.use(
  response => {
    // console.log(response.request.response)
    // response = getRealJsonData(response.request.responseText)
    // console.log(response)
    switch (response.data.code) {
      case 5:
        Message({
          message: "登陆失效，请重新登陆",
          type: "error",
          duration: 1500,
          customClass: "element-error-message-zindex"
        });
        clearLoginInfo();
        router.push({ name: "login" });
        break;

      default:
        break;
    }
    return response;
  },
  error => {
    switch (error.response.status) {
      case 400:
        Message({
          message: error.response.data.msg,
          type: "error",
          duration: 1500,
          customClass: "element-error-message-zindex"
        });
        break;
      case 401:
        clearLoginInfo();
        router.push({ name: "login" });
        break;
      case 405:
        Message({
          message: "http请求方式有误",
          type: "error",
          duration: 1500,
          customClass: "element-error-message-zindex"
        });
        break;
      case 500:
        Message({
          message: "服务器出了点小差，请稍后再试",
          type: "error",
          duration: 1500,
          customClass: "element-error-message-zindex"
        });
        break;
      case 501:
        Message({
          message: "服务器不支持当前请求所需要的某个功能",
          type: "error",
          duration: 1500,
          customClass: "element-error-message-zindex"
        });
        break;
    }
    return Promise.reject(error);
  }
);

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = actionName => {
  console.log(process.env, "process");
  console.log(process, "process");
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return process.env.VUE_APP_BASE_API + actionName;
  // return (
  //   (process.env.NODE_ENV !== "production" && process.env.OPEN_PROXY
  //     ? "/proxApi"
  //     : process.env.VUE_APP_BASE_API + actionName
  // )
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    t: new Date().getTime()
  };
  return openDefultParams ? merge(defaults, params) : params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = "json") => {
  var defaults = {
    t: new Date().getTime()
  };
  data = openDefultdata ? merge(defaults, data) : data;
  // console.log(data)
  return contentType === "json" ? JSON.stringify(data) : qs.stringify(data);
};

export default http;
