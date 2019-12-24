import Link from 'next/link'


export default function Header() {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark" role="navigation">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link href="/">
                        <a className="navbar-brand mr-md-3">[4 Players]</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/6player">
                        <a className="navbar-brand mr-md-3">[6 Players]</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/4player">
                        <a className="navbar-brand mr-md-3">[4 Players Seafarers]</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
