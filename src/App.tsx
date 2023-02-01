import Router from "./Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import Nav from "./components/Nav";


function App() {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Router />
    </>
  );
}

export default App;
