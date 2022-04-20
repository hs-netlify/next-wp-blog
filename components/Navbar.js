import Link from "next/link";

export default function Navbar() {
  const navLink = `hover:text-red-600 hover:underline`;

  return (
    <div className="p-2">
      <nav>
        <ul>
          <li className={navLink}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={navLink}>
            <Link href="/contact">
              <a>Contact Us</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
