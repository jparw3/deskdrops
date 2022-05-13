import Link from "next/link";
import {
  Button,
  useTheme,
  Spacer,
  User,
  Tooltip,
  useMediaQuery,
  Text,
} from "@geist-ui/core";
import { useRouter } from "next/router";
import { Plus, LogOut, Home } from "@geist-ui/icons";
import { useContext } from "react";
import { auth } from "@lib/firebase";
import { UserContext } from "../lib/context";

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);
  const { palette } = useTheme();

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  const upMD = useMediaQuery("md", { match: "up" });

  return (
    <nav
      className="top-0 mx-auto fixed w-full backdrop-blur-[3px] bg-black bg-opacity-80 z-10"
      style={{ borderBottom: "1.5px solid", borderColor: palette.accents_2 }}
    >
      <div className="w-full  h-16 items-center flex max-w-[980px] mx-auto justify-between">
        <div className="flex space-x-5 pl-2 items-center">
          {/* user is signed in and has a username */}
          {username && (
            <div>
              <Link passHref href={`/${username}`}>
                <User src={user?.photoURL} name={user?.displayName}>
                  <User.Link href={`/${username}`}>@{username}</User.Link>
                </User>
              </Link>



                {upMD && (
                <Tooltip text="Sign out" placement="bottom">
                  <Button
                    onClick={signOut}
                    auto
                    iconRight={<LogOut />}
                    type="abort"
                  />
                </Tooltip>
                )}
            </div>
          )}

          {/* user is not signed in OR has not created a username */}
          {!username && (
            <Link passHref href="/enter">
              <Button type="secondary" width="10%">
                Enter
              </Button>
            </Link>
          )}
        </div>
            <div className='flex pr-2 items-cener space-x-3'>
              {username && (
                <Link passHref href="/admin">
                <Button auto type="secondary">
                  <Text font="20px">+</Text>
                  {upMD && (
                    <>
                      <Spacer inline w={0.35} />
                      <div>Write Posts</div>
                    </>
                  )}
                </Button>
              </Link>
              )}
                      <Link passHref href="/">
                        {upMD ? (
              <Button auto>Home</Button>
                        ) : (
              <Button iconRight={<Home />} auto />
                        )}
                      </Link>
            </div>
      </div>
    </nav>
  );
}
