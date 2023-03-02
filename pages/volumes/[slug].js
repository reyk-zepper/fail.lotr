import Link from "next/link";
import { volumes } from "../../lib/data.js";
import Image from "next/image";

export default function VolumeDetail({ volume, nextVolume, previousVolume }) {
  if (!volume) {
    return null;
  }

  const { title, description, cover, books } = volume;
  console.log({
    title,
    description,
    cover,
    books,
  });

  return (
    <>
      <Link href="/volumes">← All Volumes</Link>
      <h1>{title}</h1>
      <p>{description}</p>
      <ul>
        {books.map(({ ordinal, title }) => (
          <li key={title}>
            {ordinal}: <strong>{title}</strong>
          </li>
        ))}
      </ul>
      <Image
        src={cover}
        alt={`Cover image of ${title}`}
        width={150}
        height={250}
      />
      <div>
        {previousVolume ? (
          <Link href={`/volumes/${previousVolume.slug}`}>
            ← Previous Volume: {previousVolume.title}
          </Link>
        ) : (
          "falsy"
        )}
      </div>
      <div>
        {nextVolume ? (
          <Link href={`/volumes/${nextVolume.slug}`}>
            Next Volume: {nextVolume.title} →
          </Link>
        ) : null}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = volumes.map((volume) => ({
    params: { slug: volume.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const volume = volumes.find(({ slug }) => slug === params.slug) || null;

  return { props: { volume } };
}
