//生产环境和开发环境
let pro = process.env.NODE_ENV === "production"

module.exports={
  webpack:{
    //本地调试时的地址
    ip:"localhost",
    //本地调试时的端口
    dev_port:3100,
    //发布后的网站title
    title:"margaret"
  },
  web:{
    url:pro?"":"",
    api:"/mock"
  }
}
