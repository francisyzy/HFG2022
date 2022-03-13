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
        <title>Voucher unsuccessfully added</title>
      </Head>

      <PageTitle>You have not enough points to redeem voucher</PageTitle>

      <Button onClick={backToVoucher}>Back to voucher page</Button>
    </>
  );
}
