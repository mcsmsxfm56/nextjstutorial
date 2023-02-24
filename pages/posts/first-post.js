import Link from "next/link";
export default function firstPost() {
  return (
    <div>
      First Post
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </div>
  );
}
