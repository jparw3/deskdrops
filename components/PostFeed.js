import Link from "next/link";
import { Card, Text, Link as GeistLink, Button, Tooltip, Code, Tag, useTheme } from "@geist-ui/core";
import { HeartFill } from "@geist-ui/icons";
import {useState, useEffect} from 'react'
export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  const [heartEmoji, setHeartEmoji] = useState('🤍')
  const { palette } = useTheme()

  useEffect(() => {
    if(post.heartCount <= 10){
      setHeartEmoji('❤️')
    }else if(post.heartCount <= 20){
      setHeartEmoji('💖')
    }else if(post.heartCount <= 35){
      setHeartEmoji('💓')
    }else if(post.heartCount <= 75){
      setHeartEmoji('💘')
    }else if(post.heartCount <= 100){
      setHeartEmoji('💛')
    }
  }, [])
  

  return (
        <Link passHref href={`/${post.username}/${post.slug}`}>
      <Card className='cursor-pointer' hoverable width="100%">
          <div className='text-2xl'>{post.title}</div>
        <Text>
          Posted by{" "}
          <Link passHref href={`/${post.username}`}>
            <GeistLink block color underline>
              <div>@{post.username}</div>
            </GeistLink>
          </Link>
        </Text>

        <div className="flex w-full justify-end space-x-1 items-center">
          <Text style={{ color: "#888" }}>{heartEmoji}</Text>
          <heartIcon/>
        </div>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <>
            <Link passHref href={`/admin/${post.slug}`}>
              <h3>
                <Button width="100%" type="success">Edit</Button>
              </h3>
            </Link>

            <div className='flex space-x-1'>
            <Text p>
              Status:
            </Text>
            {post.published ? (
              <Text style={{color: palette.cyan}}>published</Text>
            ) : (
              <Text type="warning">Unpublished</Text>
            )}
            </div>
          </>
        )}
      </Card>
      </Link>
  );
}

