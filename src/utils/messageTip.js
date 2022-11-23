import { ElMessage } from 'element-plus'
/**
 * 错误提示
 * @param message 提示内容
 * @param duration 提示时间
 */
export function errorTip (message, duration = 3000) {
  ElMessage({
    dangerouslyUseHTMLString: true,
    duration,
    type: 'error',
    message
  })
}

/**
 * 成功提示
 * @param message 提示内容
 * @param duration 提示时间
 */
export function okTip (message, duration = 3000) {
  ElMessage({
    dangerouslyUseHTMLString: true,
    type: 'success',
    message,
    duration
  })
}

/**
 * 警告提示
 * @param message 提示内容
 * @param duration 提示时间
 */
export function warringTip (message, duration = 3000) {
  ElMessage({
    dangerouslyUseHTMLString: true,
    type: 'warning',
    message,
    duration
  })
}
