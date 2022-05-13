import Head from "next/head";

export default function Metatags({
  title = "DeskDrops🚀",
  description = "Share and rank your setups",
  image = "https://cleanshot-cloud-fra.s3.eu-central-1.amazonaws.com/media/36064/EQw9ONoxfRAwZVQ3p0DlfhujeNsZMC4G5LsvzLxO.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaDGV1LWNlbnRyYWwtMSJIMEYCIQCeRD%2FcAq%2BtLiKNmFwPxm2iH%2Ftlq4U9%2BYiO4SowdzjJtAIhALI9471ipKgRVXCfv%2FQCg%2BlsyJ9HVuivEWaRZcAg%2FYrSKqECCBUQABoMOTE5NTE0NDkxNjc0IgwoRbEJa3t%2Fvqs%2BqRAq%2FgEAqhMmSX2NMJ0wCTcKSlf1aKqTb48qtecxYhHJTY5wr7WFsVM6hgZmB2hrqa7s%2BWL2liu7SwGx31iylf02RaAIVIBtp3QxXjKmiJ5v6g3mie90zzJrb2abNqoyTrgJEKnLAxkiBZH5dPcPF0Ma29ESEUYIZtaLV9sm3kLgN3inX3OK0zBTVpY8HSbdnTcRpatYbNmjxEGPSjcs0rTbrmmbS2Tjkkp8LvgmNv99tYcNfVqQwQO48Zm2xw2NH4ag7or68kfNNL98VqOOZLWfccf6SD6N13EHuqeQIp3q1fiTXkysJoZyw64SJxG4CgnYjoolBpD5PTdK1%2FFNAVDK2TCzl%2BmTBjqZAawknTLZR7fJc0%2BdoVOw%2Fn4E87hgWFupY8ZM7oYRB3jfHRUGQJo%2BwNFMOX7nxpG7D3GjsaDDAyy3N%2FO08ASznMjTngeAX7W8x9%2BJNv6XwDBqY8LTbbMyY1DZEASBLAQdKsZ2%2FWGiFBR9DBRrpTj2lYc2TKFv2I%2FUtHqjhGEEW%2B1OoKAdpQHn%2F%2F%2BhWqm0clTd%2BNh0hmt5woZCUQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5MF2VVMNCVCO3YUF%2F20220510%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220510T125230Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=54eaab6d680698c6814e6493a406f75d4eda4bd2f1c7429c7ac206d5465c0ab3",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@jparw3" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
