import { LuClipboardCheck } from "react-icons/lu";
import type { CheckedPlanType } from "./change-mode.types";
import { GrandSummary, type SummaryItems, SummarySection } from "../../components/summary-component/summary-section";

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

  const summaryItems = (): SummaryItems[] => {
    return selectedPlans.flatMap((item) => [
      { label: "LPA Number", value: item.lpa_no },
      { label: "New Plan Code", value: item.new_plan_code },
      { label: "Installment Payment", value: item.new_installment_amount, type: "currency"},
      { label: "Change of Mode Fee", value: 100, type: "currency" },
    ]);
  };

  return (
    <SummarySection
      columns={4}
      icon={<LuClipboardCheck />}
      title={"Change of Mode Summary"}
      items={summaryItems()}
      grandSummary={
        <GrandSummary
          label={"Total Amount Payable"}
          value={totalDue}
          type="currency"
        />
      }
    />
  );
}