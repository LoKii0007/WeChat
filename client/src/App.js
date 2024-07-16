import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Messanger from "./screens/messanger";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./context/accountprovider";

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  return (
    <>
    <GoogleOAuthProvider clientId={clientId} >
      <AccountProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Messanger/>}></Route>
        </Routes>
       </Router>
      </AccountProvider>
    </GoogleOAuthProvider>
    </>
  );
}

export default App;
