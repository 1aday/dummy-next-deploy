import { getAllPosts } from "@/lib/posts";
import { Navigation } from "@/components/navigation";
import { HomePage } from "@/components/home-page";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Navigation />
      <HomePage posts={posts} />
    </>
  );
}
