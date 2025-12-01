"use client";
import { Box } from "@chakra-ui/react";
// import { RIPage } from "osp-chakra-reusable-components";
import { useRouter } from "next/navigation";
import { Breadcrumb, Checkbox } from "st-peter-ui";
import { ReinstatementPage } from "./component/reinstatement-page";

interface PhLapsedPlan {
  lpaNo: string;
  phName: string;
  planType: string;
  mop: string;
  status: string;
  totalAmtPayable: string;
  totalAmtPaid: string;
  balance: string;
  instAmt: string;
  newLpaNo: string;
  newStatus: string;
  newTotalAmtPayable: string;
  newTotalAmtPaid: string;
  newBalance: string;
  newInstAmt: string;
  duedate: string;
}

export default function Reinstatement() {
  const router = useRouter();

  const breadcrumbItems = [
    {
      label : "Home",
      href: "/"
    },
    {
      label : "Plan Management",
      href: "/plan-management"
    },
    {
      label : "Reinstatement",
      href: "#"
    },
    
  ]

  return (
    <Box pt={"170px"} maxW={"7xl"} margin={"auto"} px={0}>
      <Breadcrumb items={breadcrumbItems} variant={"plain"} size="lg" />
      <ReinstatementPage onClickHome={() => router.push("/")} onClickTrack={() => router.push("/")} />
    </Box>
  );
}
