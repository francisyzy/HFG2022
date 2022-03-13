import Head from "next/head";
import nc from "next-connect";
import { withAuth } from "@/middleware/withAuth";
import { useRouter } from "next/router";
import { ButtonGroup, PageTitle, Button, SmartLink, Loading } from "@/components/ui";

export default function Home() {
  const router = useRouter();
  const backToVoucher = () => {
    
    router.push("/vouchers");
  };
  return (
    <>
      <Head>
        <title>Not enough voucher to use</title>
      </Head>

      <PageTitle>You do not have enough voucher to use</PageTitle>

      <Button onClick={backToVoucher}>Back to voucher page</Button>
    </>
  );
}
