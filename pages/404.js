/* eslint-disable jsx-a11y/iframe-has-title */
import Link from "next/link";
import { Button, Text } from "@geist-ui/core";

export default function Custom404() {
  return (
    <div className="flex mt-[100px] max-w-[980px] mx-auto flex-col items-center justify-center">
      <Text h3>404 - That page does not seem to exist...</Text>
      <iframe
        className="rounded-lg"
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
      />
      <Link passHref href="/">
        <Button mt={1} type="secondary">
          Go home
        </Button>
      </Link>
    </div>
  );
}
