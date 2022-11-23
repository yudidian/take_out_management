import { ElMessageBox } from 'element-plus'

/**
 * 消息弹出框
 * @param tip 提示消息
 * @param title 提示标提
 * @param callback 确认的回调
 * @param catchBack 取消的回调
 */
export const confirmTip = (tip, title = '提示', callback, catchBack) => {
  ElMessageBox.confirm(tip, title, {
    confirmButtonText: '确认',
    cancelButtonText: '退出',
    dangerouslyUseHTMLString: true
  })
    .then(callback)
    .catch(catchBack)
}

/**
 * 提交内容弹框
 * @param tip 提示消息
 * @param title 提示标提
 * @param callback 确认的回调 回调函数的参数是一个对象 获取提交值 参数命.value
 * @param catchBack 取消的回调
 */
export const promptTip = (tip, title, callback, catchBack) => {
  ElMessageBox.prompt(tip, title, {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '确认',
    cancelButtonText: '退出'
  })
    .then(callback)
    .catch(catchBack)
}

/**
 * 提交内容弹框
 * @param tip 提示消息
 * @param title 提示标提
 * @param callback 确认的回调
 */
export const alertTip = (tip, title, callback) => {
  ElMessageBox.alert(tip, title, {
    confirmButtonText: '确认',
    callback
  })
}
