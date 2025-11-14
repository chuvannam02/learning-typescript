import {Route, Routes} from 'react-router-dom';
import {Menu} from './Menu';

export const MenuRouting = () => {
    return (
        <Routes>
            <Route path="/menu" element={<Menu/>}/>
        </Routes>
    );
};
