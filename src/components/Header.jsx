import { Wifi } from 'lucide-react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__icon">
        <Wifi size={22} />
      </div>
      <div className="header__text">
        <h1 className="header__title">BSNL Fiber Savings</h1>
        <p className="header__subtitle">See how much your family can save</p>
      </div>
    </header>
  );
}
