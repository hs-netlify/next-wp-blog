import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";

import { getApolloClient } from "lib/apollo-client";

export default function Home({ page, posts }) {
  const { title, description } = page;
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title text-red-400">{title}</h1>

        <p className="description">{description}</p>

        <ul className="grid">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <li key={post.slug} className="card">
                  <Link href={post.path}>
                    <a>
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: post.title,
                        }}
                      />
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt,
                        }}
                      />
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
      </main>
    </div>
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
