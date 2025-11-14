import React from 'react';
import './Menu.scss';
import type {MenuProps} from './Menu.types';

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
    return (
    <div className="menu">
        <h2>Menu Component</h2>
    </div>
    );
};
