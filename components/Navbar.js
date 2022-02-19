import Link from "next/link";

export default function Navbar() {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Contact Us</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
