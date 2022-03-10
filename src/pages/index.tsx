import Head from "next/head";
import nc from "next-connect";
import { withAuth } from "@/middleware/withAuth";

import { PageTitle } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tier system</title>
      </Head>

      <PageTitle>Battalion App</PageTitle>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const handler = nc().use(withAuth());

  try {
    await handler.run(req, res);
  } catch (e) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
