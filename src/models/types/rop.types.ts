import type z from "zod"
import type { RopSchema, RopSearchFormSchema } from "../schema/RopSchema"

export type ISearchRopForm = z.infer<typeof RopSearchFormSchema>
export type IRopSchema =z.infer<typeof RopSchema>

export type PayoutChannelFormProps = {
  mode?: "existing" | "new";
  setMode?: (val: "existing" | "new") => void ;
  document?: DocumentItem[];
  isShowButton?: boolean;
};

export type DocumentItem = {
  id: string;
  label: string;
};

export interface ButtonParams {
    children?: React.ReactNode;
    onClick?: () => void;
}