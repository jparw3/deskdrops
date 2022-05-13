import AuthCheck from "@components/AuthCheck";
import PostFeed from "@components/PostFeed";
import { UserContext } from "@lib/context";
import { firestore, auth, serverTimestamp } from "@lib/firebase";

import {
  Text,
  Input,
  Button,
  Modal,
  useModal,
  Code,
  useToasts,
  useKeyboard,
  Grid,
} from "@geist-ui/core";

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import Link from "next/link";

export default function AdminPostsPage() {
  const { setVisible, bindings } = useModal(true);

  useKeyboard(() => setVisible(true)[(KeyCode.KEY_N, KeyMod.CtrlCmd)]);

  return (
    <div className="flex max-w-[980px] mx-auto">
      <Modal width="35rem" {...bindings}>
        <Modal.Title>Create Post</Modal.Title>
        <Modal.Content>
          <CreateNewPost />
        </Modal.Content>
      </Modal>
      <AuthCheck>
        <PostList />
      </AuthCheck>
    </div>
  );
}

function PostList() {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <div className='grid mt-40 gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
      <PostFeed posts={posts} admin />
    </div>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const { setToast } = useToasts();

  // Ensure slug is URL safe
  // const slug = encodeURI(kebabCase(title));
  const slug = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);


  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: true,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    setToast({
      text: "Post created! ✅",
      delay: 5000,
    });

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <Input
        width="100%"
        clearable
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My setup"
      >
        Post Title
      </Input>
      <Text font="14px">
        URL: <Link passHref href={`http://dd.jparw.xyz/${username}/${slug}`}><Code>dd.jparw.xyz/{username}/{slug}</Code></Link>
      </Text>
      <button className="w-full mt-4" type="submit">
        <Button width="100%" disabled={!isValid} type="secondary">
          Create Post
        </Button>
      </button>
    </form>
  );
}
