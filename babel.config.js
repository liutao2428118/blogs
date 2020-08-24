module.exports = function (api) {
  api.cache(true)
  const presets = [
    ['@babel/env', {
      targets: {
        ie: '11',
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
        node: 'current'
      },
      corejs: 2,
      useBuiltIns: 'usage'
    }]
  ]
  const plugins = [
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-proposal-decorators', { legacy: true }] // node支持ES7装饰器语法插件
  ]
  return {
    presets,
    plugins
  }
}
