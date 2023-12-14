/** 请求超时值, 超过该毫秒后端若未能响应将提示超时 */
const TIME_OUT = 10000

/** 要使用本地代理，修改 BASE_URL = '/apiproxy' 方便开发时跨域代理到 import.meta.env.VITE_APP_API_URL */
// const BASE_URL = '/apiproxy'; // 务必 import.meta.env.VITE_APP_API_URL 的值是跨域URL方建议使用代理
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/** 接口请求 token 键名 */
const TOKEN_NAME = 'token'

/** 导出接口请求配置 */
export { API_BASE_URL, TIME_OUT, TOKEN_NAME }
