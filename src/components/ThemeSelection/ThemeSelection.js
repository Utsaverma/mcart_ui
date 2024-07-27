import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './ThemeSelection.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTheme, update } from '../../reducers/ThemeSlice';

export const ThemeSelection = () => {

    const currentTheme = useSelector(getCurrentTheme);

    const dispatch = useDispatch();

    const changeTheme = () => {
        dispatch(update())
    }

    return (
        <FontAwesomeIcon icon={currentTheme === 'light' ? faSun : faMoon} className="theme-icon" onClick={changeTheme} title="Change Theme" />
    )
}
