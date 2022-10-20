import './Main.css';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

export default function Main() {
    return (
        <main className="main">
            <Promo></Promo>
            <NavTab></NavTab>
            <Techs></Techs>
            <AboutMe></AboutMe>
            <Portfolio></Portfolio>
        </main>
    )
}