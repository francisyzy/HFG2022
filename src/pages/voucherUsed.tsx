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
        <title>Voucher successfully used</title>
      </Head>

      <PageTitle>Your Voucher has been successfully used. Show it to the merchant for discount.</PageTitle>

      <Button onClick={backToVoucher}>Back to voucher page</Button>
    </>
  );
}
