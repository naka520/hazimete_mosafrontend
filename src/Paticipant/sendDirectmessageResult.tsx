import Header from "./../header";
import Box from '@mui/material/Box';
import SubHeader from "./../subheader";

function SendDirectmessageResult() {
  return (
    <div>
      <Header />
      <SubHeader title="体育祭"/>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '30vh',
          fontSize: '4rem', // フォントサイズを4remに設定
        }}
      >
        <h1>DM送信完了</h1>
      </Box>
    </div>
  );
}

export default SendDirectmessageResult;