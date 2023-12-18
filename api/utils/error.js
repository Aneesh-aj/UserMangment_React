export const errorHandler=(statusCode,message)=>{
    const error = new Error()
    error .statusCode = statusCode
    console.log("the message ",message)
    error.message = message
    return error
}