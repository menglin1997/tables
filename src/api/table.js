/*
 * @Descripttion:
 * @version:
 * @Author: zml
 * @Date: 2020-05-29 14:31:47
 * @LastEditors: zml
 * @LastEditTime: 2020-05-29 15:47:34
 */
import httpRequest from "@/request/index"; // api: https://github.com/axios/axios
export function getProvincesList(query) {
  return httpRequest({
    url: httpRequest.adornUrl("/list"),
    method: "get",
    params: query
  });
}
