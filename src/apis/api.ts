// 导入axios实例
// @ts-ignore
import httpRequest from '../utils/request'
import {a} from "vite-ssg/dist/types-51f3af0f";
import {LocationQueryValue, RouteParamValue} from "vue-router";



export function apiGetInterfaceList(param: any) {
    return httpRequest({
        url: '/interfaceInfo/list/page',
        method: 'get',
        params: param,
    })
}
export function apiGetInterfaceListAdmin(param: any) {
    return httpRequest({
        url: '/interfaceInfo/list',
        method: 'get',
        params: param,
    })
}
export function apiGetInterfaceInfo(param:any) {
    return httpRequest({
        url: '/interfaceInfo/get',
        method: 'get',
        params: param,
    })
}
export function apiAddInterfaceInfo(param:any) {
    return httpRequest({
        url: '/interfaceInfo/add',
        method: 'post',
        data: param,
    })
}
export function apiDeleteInterfaceInfo(param:any) {
    return httpRequest({
        url: '/interfaceInfo/delete',
        method: 'post',
        data: param,
    })
}
export function apiBatchDeleteInterfaceInfo(param:any) {
    return httpRequest({
        url: '/interfaceInfo/deleteBatch',
        method: 'post',
        data: param,
    })
}
export function apiUpdateInterfaceInfo(param:any) {
    return httpRequest({
        url: '/interfaceInfo/update',
        method: 'post',
        data: param,
    })
}
export function apiAnalysis() {
    return httpRequest({
        url: '/analysis/top/interface/invoke',
        method: 'get',
    })
}
export function apiInvokeInterface(param:any) {
    return httpRequest({
        url: '/interfaceInfo/invoke',
        method: 'post',
        data: param,
    })
}
export function apiUserLogin(param:any) {
    return httpRequest({
        url: '/user/login',
        method: 'post',
        data: param,
    })
}
