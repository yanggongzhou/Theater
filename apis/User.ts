import Constants from "expo-constants";
import { IUserData } from "../interfaces/self.interface";
import {
  IImeiAuthParams,
  ILoginParams, ILoginResult,
  IRegisterParams,
  IRegisterResult,
  IReportStartParams
} from "../interfaces/user.interface";
import { ESwParam } from "../interfaces/common.interface";
import Service from "./Service";

// 免授权注册游客账号
export const netRegister = (data: IRegisterParams): Promise<IRegisterResult> => {
  return Service.post('glory/video/2101', data)
}

// 获取用户信息
export const netUserInfo = (): Promise<IUserData> => {
  return Service.post('glory/video/2106')
}

// 授权绑定游客账号
export const netImeiAuth = (data: IImeiAuthParams) => {
  return Service.post('glory/video/2108', data)
}

// 应用启动就调用的接口
export const netReportStart = (data: IReportStartParams) => {
  return Service.post('glory/video/2173', data)
}

// 投放上报
export const netReportLand = (data: {sourceCid: string; startMode: string; uuid: string}) => {
  return Service.post('glory/video/2172', data)
}
// 发送短信验证码
export const netSendCode = (phoneNum: string) => {
  const appName = Constants.expoConfig?.name || '繁花剧场'
  return Service.post('glory/video/2102', { appName, phoneNum, swParam: ESwParam.base })
}

// 登录
export const netLogin = (data: ILoginParams): Promise<{ result: ILoginResult, message: string; code: number }> => {
  return Service.post('glory/video/2105', data)
}
// export default {
//   // 注销账号
//   netLogout(data) {
//     return http.post('glory/video/2109', data)
//   },
//   // 确认注销
//   netLogoutSure(data) {
//     return http.post('glory/video/2110', data)
//   },


// }
