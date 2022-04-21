import Link from "next/link";

export default function Navbar() {
  const navLink = `hover:text-gray-200 hover:underline`;

  return (
    <div className="p-2 fixed top-0 bg-opacity-90 bg-gray-500 w-full text-white text-lg shadow">
      <nav>
        <ul>
          <li className={navLink + " border-r pr-4 border-white"}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={navLink + " border-r pr-4 border-white"}>
            <Link href="/info">
              <a>Info</a>
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
