// 返回数据格式中间件
  export const routerResponse = (option={}) => {
    return async (ctx,next) => {
        ctx.success = function (msg,data) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code : option.successCode || 200,
                msg : msg || option.successMsg || 'success',
                data : data
            }
        }
 
        ctx.fail = function (msg,code) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code : code || option.failCode || 0,
                msg : msg || option.successMsg || 'fail',
                data: {}
            }
        }
 
        await next()
    }
 
}