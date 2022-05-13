import NextLink from "next/link";
import ReactMarkdown from "react-markdown";

import { Link as GeistLink, Text, Tooltip, Code } from "@geist-ui/core";
import { useEffect, useState } from "react";
import { CheckInCircleFill } from "@geist-ui/icons";

// UI component for main post content
export default function PostContent({ post }) {
  const [verified, setVerifed] = useState(false);

  useEffect(() => {
      if (post.username === "jparw") {
        setVerifed(true);
      } else if (post.username === "khaye") {
        setVerifed(true);
      } else if (post.username === "deskdrops") {
        setDislayName("Official DeskDrops Account");
        setVerifed(true);
      } else {
        setVerifed(false);
      }
    }, []);
  return (
    <div className="max-w-[980px] mx-auto flex flex-col justify-center align-items">
      <Text h1>{post?.title}</Text>
      <div>
        Posted by{" "}
        <NextLink passHref href={`/${post.username}`}>
            <GeistLink block color underline>
              <div>@{post.username} {verified && (
            <Tooltip
              text={
                <>
                  <Code>{post.username}</Code> is a verified user.
                </>
              }
            >
              <CheckInCircleFill size={14} />
            </Tooltip>
          )}</div>
            </GeistLink>
          </NextLink>
      </div>
      {/* on {createdAt.toISOString()} */}
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
