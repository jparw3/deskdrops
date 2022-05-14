/* eslint-disable no-return-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
import { Link, Text, Spacer, Code } from "@geist-ui/core";
import { CheckInCircleFill } from "@geist-ui/icons";





// UI component for user profile
export default function UserProfile({user, verified}) {

  return (
    <div className="mt-[100px] -space-y-1 flex max-w-[980px] mx-auto justify-center items-center flex-col">
      <img
        alt={user.displayName}
        onError={(e) => (e.target.src = "https://github.com/jparw3.png")}
        src={user.photoURL}
        className="rounded-full w-[111px]"
      />
      <Spacer h={1} />
      <div>
      </div>
      <Text h3>
        <div className="flex items-center space-x-2">
          <div>{user.displayName || "Anonymous User"}</div>
          {verified && <CheckInCircleFill/>}
        </div>
      </Text>
      <Text mt={2}>{user.bio}</Text>
      <Link block color>
        @{user.username}{" "}
      </Link>
      <Text>{user.uid}</Text>
    </div>
  );
}
