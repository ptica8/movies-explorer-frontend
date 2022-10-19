import './Main.css';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';

export default function Main() {
    return (
        <div className="main">
            <Promo></Promo>
            <NavTab></NavTab>
        </div>
    )
}