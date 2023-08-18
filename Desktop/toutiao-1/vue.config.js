const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: {
            'postcss-pxtorem': {
              rootValue({file}){
                return file.indexOf('vant') !==-1 ? 37.5 : 75
                //indexod()方法用于判断字符串中是否包含指定的子字符串，
                //如果包含则返回该子字符串的起始位置，否则返回-1
                //这里的意思是如果是vant的样式就按照37.5来转换，如果是自己的样式就按照75来转换
              },
              // rootValue: 37.5,//vant官方根字体大小是37.5
              propList: ['*'],//匹配哪些属性转换成rem
            },
          },
        },
      },
    },
  },
})
