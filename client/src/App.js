import { makeStyles, Toolbar } from "@material-ui/core";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import useAuthStateChange from "./hooks/useAuthStateChange";
import MainRoutes from "./MainRoutes";

const useStyles = makeStyles(() => ({
    outerContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    innerContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    }
}));
 
const App = () => {
  const styles = useStyles();
  useAuthStateChange();
  return (
    <div className={styles.outerContainer}>
      <Header />
      <Toolbar />
      <div className={styles.innerContainer}>
        <Sidebar />
        <MainRoutes />
      </div>
    </div>
  )
};

export default App;