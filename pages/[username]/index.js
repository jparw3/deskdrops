import { getUserWithUsername, postToJSON } from "@lib/firebase";
import UserProfile from "@components/UserProfile";
import Metatags from "@components/Metatags";
import PostFeed from "@components/PostFeed";
import { useState } from "react";
import { firestore, auth } from "@lib/firebase";

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  
  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  const [verified, setVerified] = useState(false);

  const verifiedRef = firestore.collection("verifiedUsers").doc(user.username);

  verifiedRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      verifiedRef.onSnapshot((doc) => {
        setVerified(true);
        console.log('true')
      });
    }
  });
  return (
    <div className="max-w-[980px] flex justify-center items-center flex-col mx-auto space-y-16">
      <Metatags
        title={user.username}
        description={`${user.username}'s public profile`}
      />
      <UserProfile user={user} verified={verified} />
      <div className="grid gap-4 mt-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <PostFeed posts={posts} />
      </div>
    </div>
  );
}
