import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Movie from './components/Movie';

const MainRoutes = () => (
    <Switch >
        <Route path='/movie/:movieId' component={Movie} />
        <Route path='/' component={Home} />
    </Switch>
);

export default MainRoutes;