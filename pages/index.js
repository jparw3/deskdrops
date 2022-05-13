/* eslint-disable react/destructuring-assignment */
import PostFeed from "@components/PostFeed";
import Metatags from "@components/Metatags";
import { firestore, fromMillis, postToJSON } from "@lib/firebase";
import { Card, Text, Grid, Button, Tag } from "@geist-ui/core";

import { useState } from "react";

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps() {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);
  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <div className="max-w-[980px] px-3 flex flex-col mx-auto mt-20 md:mt-40">
      <Metatags
        title="Home Page"
        description="Get the latest posts on our site"
      />
      <Card hoverable shadow type="violet" width="100%">
        <Text h2 b>
          DeskDrops&nbsp;🚀
        </Text>
        <Text>
          DeskDrops is still in beta, if you run in to any bugs or features that
          need to be changed / added, email{" "}
          <Tag type="default" invert>
            hello@jparw.xyz
          </Tag>
        </Text>
      </Card>
      <div className="grid gap-4 mt-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <PostFeed posts={posts} />
      </div>
      <div className="flex flex-col mt-10">
        {!loading && !postsEnd && (
          <Button mt={5} loading={loading} auto onClick={getMorePosts}>
            Load more
          </Button>
        )}
        {postsEnd && (
          <Text mt={5} blockquote textAlign="center">
            You have reached the end!
          </Text>
        )}
      </div>
    </div>
  );
}
