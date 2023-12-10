// 서버 내부 오류를 처리하는 범용 미들웨어
const handleServerError = (err, req, res, next) => {
  console.log("err", err)
  const status = err.status;
  const message = err.message;
  res.status(status).json({
    success: false,
    message: message,
  });
};

export default handleServerError;
