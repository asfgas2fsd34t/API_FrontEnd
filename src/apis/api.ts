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
export function apiGetUserName(param:any) {
    return httpRequest({
        url: '/interfaceInfo/name/user',
        method: 'post',
        data: param,
    })
}
export function apiGetHeroLines(param:any) {
    return httpRequest({
        url: '/interfaceInfo/hero/lines',
        method: 'post',
        data: param,
    })
}
export function apiGetQQInfo(param:any) {
    return httpRequest({
        url: '/interfaceInfo/qq/info',
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
export function apiUserRegister(param:any) {
    return httpRequest({
        url: '/user/register',
        method: 'post',
        data: param,
    })
}
export function apiUserList(param:any) {
    return httpRequest({
        url: '/user/list/page',
        method: 'get',
        params: param,
    })
}
export function apiGetUser(param:any) {
    return httpRequest({
        url: '/user/get',
        method: 'get',
        params: param,
    })
}
export function apiAddUser(param:any) {
    return httpRequest({
        url: '/user/add',
        method: 'post',
        data: param,
    })
}
export function apiDeleteUser(param:any) {
    return httpRequest({
        url: '/user/delete',
        method: 'post',
        data: param,
    })
}
export function apiDeleteBatchUser(param:any) {
    return httpRequest({
        url: '/user/deleteBatch',
        method: 'post',
        data: param,
    })
}
export function apiUserInterfaceInfoList(param:any) {
    return httpRequest({
        url: '/userInterfaceInfo/list',
        method: 'get',
        params: param,
    })
}
export function apiPlusUserInterfaceInfo(param:any) {
    return httpRequest({
        url: '/userInterfaceInfo/plus',
        method: 'get',
        params: param,
    })
}
export function apiGetCode(param:any) {
    return httpRequest({
        url: '/third/sendmsg',
        method: 'post',
        data: param,
    })
}
export function apiCheckPhone(param:any) {
    return httpRequest({
        url: '/user/checkphone',
        method: 'post',
        data: param,
    })
}
export function apiRePassword(param:any) {
    return httpRequest({
        url: '/user/repassword',
        method: 'post',
        data: param,
    })
}

export function apiIOrderCreate(param:any) {
    return httpRequest({
        url: '/order/add',
        method: 'post',
        data: param,
    })
}
export function apiIOrderList(param:any) {
    return httpRequest({
        url: '/order/list',
        method: 'get',
        params: param,
    })
}
