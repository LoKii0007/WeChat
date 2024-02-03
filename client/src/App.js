import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Messanger from "./screens/messanger";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./context/accountprovider";

function App() {
  const clientId = "635125846435-ts3ng18bmri9nribag9569a8ii1ho30t.apps.googleusercontent.com"
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
