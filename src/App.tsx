import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./header";
import AdministratorLogin from "./Administrator/Login";
import AdministratorSignup from "./Administrator/Signup";

import Board from "./Administrator/Board";
import Subboard from "./Administrator/Subboard";
import Administrator from "./administrator";
import PaticipateSignup from "./Paticipant/Signup";
import ParticipantLogin from "./Paticipant/Login";
import BoardRegistration from "./Paticipant/boardRegistration";
import BoardRegistrationResult from "./Paticipant/boardRegistrationResult";
import BoardUpdate from "./Paticipant/boardUpdate";
import BoardUpdateResult from "./Paticipant/boardUpdateResult";
import SendDirectmessage from "./Paticipant/sendDirectmessage";
import SendDirectmessageResult from "./Paticipant/sendDirectmessageResult";
import NotFound from "./notfound";

function App() {
  return (
    <div>
      <Header />
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/Administrator/Signup"
            element={<AdministratorSignup />}
          />
          <Route path="/Administrator/Login" element={<AdministratorLogin />} />
          <Route path="/Administrator" element={<Administrator />} />
          <Route path="/Administrator/{board_uuid}" element={<Board />} />
          <Route
            path="/Administrator/{board_uuid}/{subboard_uuid}"
            element={<Subboard />}
          />
          <Route path="/Paticipant/Signup" element={<PaticipateSignup />} />
          <Route path="/Paticipant/Login" element={<ParticipantLogin />} />
          <Route
            path="/Paticipant/SendDirectMessage/{board_uuid}"
            element={<SendDirectmessage />}
          />
          <Route
            path="/Paticipant/SendDirectMessage/{board_uuid}/result"
            element={<SendDirectmessageResult />}
          />
          <Route
            path="/Paticipant/BoardRegistration/{board_uuid}"
            element={<BoardRegistration />}
          />
          <Route
            path="/Paticipant/BoardRegistration/{board_uuid}/result"
            element={<BoardRegistrationResult />}
          />
          <Route
            path="/Paticipant/BoardUpdate/{board_uuid}"
            element={<BoardUpdate />}
          />
          <Route
            path="/Paticipant/BoardUpdate/{board_uuid}/result"
            element={<BoardUpdateResult />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
