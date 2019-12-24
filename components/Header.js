import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a style={linkStyle}>4 Players</a>
      </Link>
      <Link href="/6player">
        <a style={linkStyle}>6 Players</a>
      </Link>
      <Link href="/4player">
        <a style={linkStyle}>4 Players Test</a>
      </Link>
    </div>
  )
}
