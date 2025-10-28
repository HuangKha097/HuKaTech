import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Submenu from './Submenu';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { logo } from '../assets/images/index';

const cx = classNames.bind(styles);
const NavBar = () => {
    const navigate = useNavigate();
    const [isSubmenu, setIsSubmenu] = useState(false);
    const [valueSearch, setValueSerch] = useState('');
    console.log(isSubmenu);
    console.log(valueSearch);

    const handleSearch = () => {
        if (valueSearch) {
            navigate(`/search/${valueSearch}`);
        }
    };

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    return (
        <div className={cx('container')}>
            <div className={cx('logo')}>
                <Link to={'/'}>
                    <img clas src={logo} alt="logo shop" />
                </Link>
            </div>
            <label htmlFor="search" className={cx('search')}>
                <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                <input
                    name="search"
                    type="text"
                    id="search"
                    placeholder="Search gadgets, devices"
                    value={valueSearch}
                    onChange={(e) => setValueSerch(e.target.value)}
                />
            </label>

            <ul className={cx('hotlinks')}>
                <li>
                    <div
                        className={cx('menuWrapper')}
                        onMouseEnter={() => setIsSubmenu(true)}
                        onMouseLeave={() => {
                            setTimeout(() => {
                                setIsSubmenu(false);
                            }, 300);
                        }}
                    >
                        Category
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15L7 10H17L12 15Z" fill="#FAFAFA" />
                        </svg>
                        <div className={cx('submenu', { isOpen: isSubmenu })}>
                            <Submenu />
                        </div>
                    </div>
                </li>
                <Link to={'/about'}>
                    <li>About</li>
                </Link>
                <li>FAQ</li>
                <Link to={'/checkout'}>
                    <li>Checkout</li>
                </Link>
            </ul>
        </div>
    );
};

export default NavBar;
