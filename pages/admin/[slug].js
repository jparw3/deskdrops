/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import AuthCheck from "@components/AuthCheck";
import { firestore, auth, serverTimestamp } from "@lib/firebase";
// import ImageUploader from "@components/ImageUploader";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Tag,
  Textarea,
  Card,
  Button,
  useToasts,
  useMediaQuery,
  Text,
} from "@geist-ui/core";

import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Save, Trash } from "@geist-ui/icons";

export default function AdminPostEdit() {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug);
  const [post] = useDocumentDataOnce(postRef);

  

  return (
    <div className="max-w-[980px] mx-auto mt-[100px] flex justify-center items-center ">
      <div className="w-full mx-3">
        {post && (
          <>
            <section>
              <div className="text-2xl md:text-4xl pb-4">{post.title}</div>
              <Tag mb={2} type="lite">
                ID: {post.slug}
              </Tag>
              <PostForm
                postRef={postRef}
                defaultValues={post}
                preview={preview}
              />
            </section>

            <aside>
              <div className="flex w-full justify-between">
                <Button auto onClick={() => setPreview(!preview)}>
                  {preview ? "Edit" : "Preview"}
                </Button>
                <DeletePostButton postRef={postRef} />
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty } = formState;
  const { setToast } = useToasts();
  const upMD = useMediaQuery("md", { match: "up" });

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    setToast({ text: "Post updated successfully!", delay: 2000 });
  };

  return (
    <form onSubmit={handleSubmit(updatePost)} className="pb-2">
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? "hidden" : "block"}>
        {/* <ImageUploader /> */}

        <Textarea
          width="100%"
          height="200px"
          name="content"
          ref={register({
            maxLength: { value: 20000, message: "Content is too long" },
            minLength: { value: 10, message: "Content is too short" },
            required: { value: true, message: "Content is required" },
          })}
        />

        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}

        <div className="flex w-full justify-between items-center mt-5">
          <fieldset>
            <input name="published" type="checkbox" ref={register} />
            <label>&nbsp;Post Publically</label>
          </fieldset>

          <button type="submit">
            {upMD ? (
              <Button auto type="secondary" disabled={!isValid || !isDirty}>
                Save Changes
              </Button>
            ) : (
              <Button
                auto
                iconRight={<Save />}
                type="secondary"
                disabled={!isValid || !isDirty}
              />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();
  const { setToast } = useToasts();
  const upMD = useMediaQuery("md", { match: "up" });
  const deletePost = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      await postRef.delete();
      router.push("/admin");
      setToast({ text: "Post Deleted", delay: 2000 });
    }
  };

  if (upMD) {
    return (
      <Button type="error" onClick={deletePost}>
        Delete
      </Button>
    );
  } else {
    return (
      <Button iconRight={<Trash />} auto type="error" onClick={deletePost} />
    );
  }
}
