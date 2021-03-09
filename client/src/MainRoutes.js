import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Movie from './components/Movie';

/**
 * @name MainRoutes
 * @description Main routes for our application. handles navigation.
 * @returns {React.Node}
 */
const MainRoutes = () => (
    <Switch >
        <Route path='/movie/:movieId' component={Movie} />
        <Route path='/' component={Home} />
    </Switch>
);

export default MainRoutes;