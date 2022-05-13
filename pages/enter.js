/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import {
  Button,
  Card,
  Text,
  Input,
  Code,
  Spacer,
  useToasts,
} from "@geist-ui/core";
import { User } from "@geist-ui/icons";
import { FcGoogle } from "react-icons/fc";
import Metatags from "@components/Metatags";

import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { UserContext } from "../lib/context";
import { auth, firestore, googleAuthProvider } from "../lib/firebase";

export default function Enter() {
  const { user, username } = useContext(UserContext);
  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <>
      <Metatags title="Enter" description="Sign up or Log in to DeskDrops" />
      <div className="max-w-[980px] mx-auto flex flex-col justify-center items-center min-h-screen">
        <div className="w-[300px]">
          <Card hoverable>
            <Text h2>
              {user ? (!username ? "Name" : "Sign out") : "Sign in"}
            </Text>
            {user ? (
              !username ? (
                <UsernameForm />
              ) : (
                <SignOutButton />
              )
            ) : (
              <SignInButton />
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <Button type="secondary" width="100%" onClick={signInWithGoogle}>
      <FcGoogle />
      <Spacer w={0.5} />
      Sign in with Google
    </Button>
  );
}

// Sign out button
function SignOutButton() {
  return (
    <Button onClick={() => auth.signOut()} width="100%" type="secondary">
      Sign out
    </Button>
  );
}
// onClick={() => auth.signOut()}
// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setToast } = useToasts();

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);
    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();

    setToast({
      text: "Account created 🥳",
      delay: 5000,
    });
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  return (
    !username && (
      <section>
        <form onSubmit={onSubmit}>
          <Input
            clearable
            icon={<User />}
            name="johndoe"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
            width="100%"
          >
            Username
          </Input>
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button className="w-full" type="submit">
            <Button
              width="100%"
              loading={loading}
              disabled={!isValid}
              type="secondary"
            >
              Choose
            </Button>
          </button>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <Text p />;
  }
  if (isValid) {
    return (
      <Text p className="text-success">
        <Code>{username}</Code> is available!
      </Text>
    );
  }
  if (username && !isValid) {
    return (
      <Text p className="text-danger">
        <Code>{username}</Code> is unavailable
      </Text>
    );
  }
  return <Text p />;
}
