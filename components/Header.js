import Link from 'next/link'


export default function Header() {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark" role="navigation">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link href="https://map.cmg.joostvdg.net">
                        <a className="navbar-brand mr-md-3">[4 Players]</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="https://map.cmg.joostvdg.net/6player">
                        <a className="navbar-brand mr-md-3">[6 Players]</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="https://map.cmg.joostvdg.net/4player">
                        <a className="navbar-brand mr-md-3">[4 Players Seafarers]</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="https://map.cmg.joostvdg.net/scenarioa">
                        <a className="navbar-brand mr-md-3">[4P Seafarers Sc. A]</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="https://map.cmg.joostvdg.net/feedback">
                        <a className="navbar-brand mr-md-3">[Give Feedback]</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="https://map.cmg.joostvdg.net">
                        <a className="navbar-brand mr-md-3">[ CMG has moved to map.cmg.joostvdg.net]</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
