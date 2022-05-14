import NextLink from "next/link";
import ReactMarkdown from "react-markdown";

import { Link as GeistLink, Text, Tooltip, Code } from "@geist-ui/core";

// UI component for main post content
export default function PostContent({ post }) {

  return (
    <div className="max-w-[980px] mx-auto flex flex-col justify-center align-items">
      <Text h1>{post?.title}</Text>
      <div>
        Posted by{" "}
        <NextLink passHref href={`/${post.username}`}>
            <GeistLink block color underline>
              <div>@{post.username}</div>
            </GeistLink>
          </NextLink>
      </div>
      {/* on {createdAt.toISOString()} */}
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
