import Header from "./../header";
import Box from "@mui/material/Box";
import SubHeader from "./../subheader";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function SendDirectmessageResult() {
  // ログイン確認処理
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // ローカルストレージからaccess_tokenを取得する
    const accessToken = localStorage.getItem("access_token");

    // access_tokenが存在する場合はログイン済みとみなす
    if (!accessToken) {
      localStorage.setItem("redirect_path", window.location.pathname);
      setRedirect(true);
    } else {
      localStorage.removeItem("redirect_path");
    }
  }, []);

  console.log(redirect);
  if (redirect) {
    return <Navigate replace to="/Administrator/Login" />;
  }
  // ログイン確認処理ここまで

  return (
    <div>
      <Header />
      <SubHeader title="体育祭" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "30vh",
          fontSize: "4rem", // フォントサイズを4remに設定
        }}
      >
        <h1>DM送信完了</h1>
      </Box>
    </div>
  );
}

export default SendDirectmessageResult;
