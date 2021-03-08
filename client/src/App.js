import { Toolbar } from "@material-ui/core";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import useAuthStateChange from "./hooks/useAuthStateChange";
import MainRoutes from "./MainRoutes";

const App = () => {
  useAuthStateChange();
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Header />
      <Toolbar />
      <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
        <Sidebar movies={[{title: 'test 1'},{title: 'test 2'},{title: 'test 3'},{title: 'test 6'},]} />
        <MainRoutes />
      </div>
    </div>
  )
};

export default App;