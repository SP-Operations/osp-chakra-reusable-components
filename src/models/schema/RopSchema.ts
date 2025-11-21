import z from "zod";

export const RopSearchFormSchema = z.object({
    lpaNo: z.string().nonempty("This is Required").regex(/^r/i, { message: "Invalid LPA#" }),
    firstName: z.string().nonempty("This is Required"),
    middleName: z.string(),
    lastName: z.string().nonempty("This is Required"),
    birthDate: z.string().nonempty("This is Required")
})

export const RopSchema = z.object({
    // planType: z.string(),
    // emailAddress: z.string(),
    // mobileNo: z.string(),
    // lotNumber: z.string(),
    // street: z.string(),
    // province: z.string(),
    // city: z.string(),
    // district: z.string(),
    // zipCode: z.string(),
    // brangay: z.string(),
    // ropSched: z.string(),
    // totalAmt: z.string(),
    // payoutChannel: z.string(),
    // payoutAccount: z.string()
    requestNo: z.string(),
    planType: z.string(),
    emailAddress: z.string(),
    mobileNo: z.string(),
    lotNumber: z.string(),
    street: z.string(),
    province: z.string(),
    city: z.string(),
    district: z.string(),
    zipCode: z.string(),
    brangay: z.string(),
    ropSched: z.string(),
    ropDate:z.string(),
    totalAmt: z.string(),
    payoutChannel: z.string(),
    payoutAccount: z.string(),
    status:z.string()

}).and(RopSearchFormSchema);



