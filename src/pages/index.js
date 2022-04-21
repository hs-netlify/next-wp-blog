import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";

import { getApolloClient } from "lib/apollo-client";

export default function Home({ page, posts }) {
  const { title, description } = page;

  const card = `w-full bg-gray-200 my-4 rounded shadow p-4 hover:bg-gray-300 transition-all cursor-pointer duration-100 hover:scale-105`;
  return (
    <>
      <Head>
        <title>Next JS and WordPress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full bg-cover bg-center bg-hero-pattern">
        <div className="text-white h-96">
          <div className="flex flex-col text-4xl justify-center items-center h-full w-full bg-black bg-opacity-20">
            <h1>Next JS and WordPress</h1>

            <h2 className="text-white pt-12">A Blog Story</h2>
          </div>
        </div>
        <div className="flex flex-col items-center bg-black bg-opacity-20">
          <ul className="items-center flex justify-center flex-col max-w-5xl">
            {posts &&
              posts.length > 0 &&
              posts.map((post) => {
                return (
                  <li key={post.slug} className={card}>
                    <Link href={post.path}>
                      <a>
                        <h3
                          className="text-2xl"
                          dangerouslySetInnerHTML={{
                            __html: post.title,
                          }}
                        ></h3>
                        <div
                          className="pt-4"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt,
                          }}
                        ></div>
                      </a>
                    </Link>
                  </li>
                );
              })}

            {!posts ||
              (posts.length === 0 && (
                <li>
                  <p>Oops, no posts found!</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 10000) {
          edges {
            node {
              id
              excerpt
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges
    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
        path: `/posts/${post.slug}`,
      };
    });

  const page = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      page,
      posts,
    },
  };
}
