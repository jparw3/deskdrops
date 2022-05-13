/* eslint-disable no-return-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
import { Link, Text, Spacer, Tooltip, Code } from "@geist-ui/core";
import { CheckInCircleFill } from "@geist-ui/icons";
import { useState, useEffect } from "react";

// UI component for user profile
export default function UserProfile({ user }) {
  const [verified, setVerifed] = useState(false);
  const [displayName, setDislayName] = useState(user.displayName);

  useEffect(() => {
    if (user.username === "jparw") {
      setVerifed(true);
    } else if (user.username === "khaye") {
      setVerifed(true);
    } else if (user.username === "deskdrops") {
      setDislayName("Official DeskDrops Account");
      setVerifed(true);
    } else {
      setVerifed(false);
    }
  }, []);
  
  return (
    <div className="mt-[100px] -space-y-1 flex max-w-[980px] mx-auto justify-center items-center flex-col">
      <img
        alt={user.displayName}
        onError={(e) => (e.target.src = "https://github.com/jparw3.png")}
        src={user.photoURL}
        className="rounded-full w-[111px]"
      />
      <Spacer h={1} />
      <Text h3>
        <div className="flex items-center space-x-2">
          <div>{displayName || "Anonymous User"}</div>{" "}
          {verified && (
            <Tooltip
              text={
                <>
                  <Code>{user.username}</Code> is a verified user.
                </>
              }
            >
              <CheckInCircleFill />
            </Tooltip>
          )}
        </div>
      </Text>
      <Link block color>
        @{user.username}{" "}
      </Link>
    </div>
  );
}
