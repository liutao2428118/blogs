// 返回数据格式公共函数
export const resultLayout = (errorCode, errorMessage, data) => {
    if (!data) {
      data = {}
    }
    if (!errorMessage) {
      errorMessage = 'Request successful!'
    }
    return {
      'errorCode': errorCode,
      'errorMessage': errorMessage,
      'data': data
    }
  }