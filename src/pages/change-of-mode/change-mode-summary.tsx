import { LuClipboardCheck } from "react-icons/lu";
import type { CheckedPlanType } from "./change-mode.types";
import { GrandSummary, InfoItem, SummarySection } from "../../components/summary-component/summary-section";
import React from "react";
import { Grid, Separator } from "@chakra-ui/react";

interface RevRIProps {
  selectedPlans: CheckedPlanType[] | undefined;
  onSubmit: () => void;
  onBack: () => void;
}

export function ChangeModeSummaryPage({
  selectedPlans,
}: RevRIProps) {
  if (!selectedPlans) return;
  const totalCMFee = selectedPlans.reduce((sum) => sum + 100, 0);
  const totalInstPayment = selectedPlans.reduce(
    (sum, p) => sum + p.new_installment_amount + p.pending_installment_amount,
    0
  );
  const totalDue = totalCMFee + totalInstPayment;

  return (
    <SummarySection
      icon={<LuClipboardCheck />}
      title={"Change of Mode Summary"}
      grandSummary={<GrandSummary label={"Total Amount Payable"} value={`₱ ${totalDue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`}/>} >
      {selectedPlans.map((plan, index) => (
        <React.Fragment key={plan.lpa_no}>
          <Grid
            my={2}
            gap={6}
            templateColumns={{ base: "1fr", md: "repeat(4,1fr)" }}
          >
            <InfoItem label="LPA Number" value={plan.lpa_no} />
            <InfoItem label="Plan Code" value={plan.new_plan_code} />
            <InfoItem label="Installment Payment" value={`₱ ${plan.new_installment_amount.toLocaleString()}`} />
            <InfoItem label="Change Mode Fee" value={`₱ 100`} />
            {plan.pending_installment != 0 && (<>
              <InfoItem label="Pending Installment" value={plan.pending_installment} />
              <InfoItem label="Pending Installment Amount" value={`₱ ${plan.pending_installment_amount.toLocaleString()}`} />
            </>)}
          </Grid>
          {index < selectedPlans.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </SummarySection>
  );
}