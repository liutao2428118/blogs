export default {
  db: process.env.NODE_ENV === 'development' ? 'mongodb://localhost/blogs' : 'mongodb://mongo/blogs',
  qiniu: {
    accessKey: 'PrnH4meXiDDaBLBWVBJBeD-Fk2fmyZrCusGpXn2O',
    secretKey: 'DBssrRTDjZHAE9qIXaQdCxaFwhssDPl5IWKXBUwI'
  }
}
