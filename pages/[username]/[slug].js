/* eslint-disable react/destructuring-assignment */
import PostContent from "@components/PostContent";
import HeartButton from "@components/HeartButton";
import AuthCheck from "@components/AuthCheck";
import Metatags from "@components/Metatags";
import { UserContext } from "@lib/context";

import NextLink from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useContext, useEffect, useState } from "react";

import { Card, Button, Text } from "@geist-ui/core";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  const { user: currentUser } = useContext(UserContext);

  const [heartEmoji, setHeartEmoji] = useState('🤍')

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
    <div className="max-w-[980px] mx-auto flex flex-col justify-center mt-[75px] align-items">
      <Metatags
        title={`${post.title} by ${post.username}`}
        description={post.title}
      />

      <Card>
        <section>
          <PostContent post={post} />
        </section>
        <Card.Footer>
          <div className="flex space-x-2 flex-col w-full">
            <Text p>{heartEmoji}</Text>

            <div className="flex justify-between w-full">
              <AuthCheck
                fallback={
                  <NextLink passHref href="/enter">
                    <Button type="success">Sign Up</Button>
                  </NextLink>
                }
              >
                <HeartButton postRef={postRef} />
              </AuthCheck>

              {currentUser?.uid === post.uid && (
                <NextLink passHref href={`/admin/${post.slug}`}>
                  <Button type="secondary">Edit Post</Button>
                </NextLink>
              )}
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
