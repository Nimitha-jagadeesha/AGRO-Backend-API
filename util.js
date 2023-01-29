import jwt from 'jsonwebtoken'
const getToken = (user)=>{
  jwt.sign(user,'somethingsecrete',{
    expiresIn:'48h'
  })
}
export {getToken};