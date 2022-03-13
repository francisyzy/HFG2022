import useAuth from "@/store/useAuth";
import Link from "next/link";
import { InlineLoading } from "./InlineLoading";

export const NavBar = () => {
  const { user, authStateLoading } = useAuth();
  return (
    <header className="w-full space border-b-2 flex items-center justify-between bg-gray-50">
      {/* Logo */}
      <div className="font-bold">
        <Link href="/main">
          <a className="ghost">HFG-2022</a>
        </Link>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex items-center space-x-base">
          {authStateLoading ? (
            <InlineLoading
              sizes={[1, 1, 2]}
              className="bg-gray-200"
            ></InlineLoading>
          ) : (
            <>
              {user ? (
                <>
                  {/* <li>Apply</li> */}
                  <li>
                    <Link href="/vouchers">
                      <a className="ghost">Vouchers</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile">
                      <a className="ghost">{user?.name || "Profile"}</a>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">
                      <a className="ghost">Login</a>
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
