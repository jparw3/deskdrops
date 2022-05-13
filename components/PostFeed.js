import Link from "next/link";
import { Card, Text, Link as GeistLink, Button, Tooltip, Code } from "@geist-ui/core";
import { CheckInCircleFill, HeartFill } from "@geist-ui/icons";
import { useEffect, useState } from "react";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
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
        <Link passHref href={`/${post.username}/${post.slug}`}>
      <Card className='cursor-pointer' hoverable width="100%">
          <div className='text-2xl'>{post.title}</div>
        <Text>
          Posted by{" "}
          <Link passHref href={`/${post.username}`}>
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
          </Link>
        </Text>

        <div className="flex space-x-1 items-center">
          <div className="text-[#888]">
            <HeartFill size={16} />
          </div>
          <Text style={{ color: "#888" }}>{post.heartCount || 0} Hearts</Text>
        </div>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <>
            <Link passHref href={`/admin/${post.slug}`}>
              <h3>
                <Button type="success">Edit</Button>
              </h3>
            </Link>

            {post.published ? (
              <p className="text-success">Live</p>
            ) : (
              <Text type="warning">Unpublished</Text>
            )}
          </>
        )}
      </Card>
      </Link>
  );
}
