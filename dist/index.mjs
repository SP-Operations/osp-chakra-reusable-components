var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/Pages/LoginPage/LoginPage.tsx
import {
  Box,
  Flex,
  Text,
  Link,
  Image,
  VStack,
  HStack,
  Button,
  Strong,
  Heading,
  Checkbox,
  useBreakpointValue
} from "@chakra-ui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignupButton, InputFloatingLabel } from "st-peter-ui";

// src/assets/images/login.webp
var login_default = "./images/osp-chakra-reusable-components/login.webp";

// src/assets/images/icons8-meta-48.png
var icons8_meta_48_default = "./images/osp-chakra-reusable-components/icons8-meta-48.png";

// src/assets/images/stpeter-logo.png
var stpeter_logo_default = "./images/osp-chakra-reusable-components/stpeter-logo.png";

// src/assets/images/icons8-apple-48.png
var icons8_apple_48_default = "./images/osp-chakra-reusable-components/icons8-apple-48.png";

// src/assets/images/icons8-google-48.png
var icons8_google_48_default = "./images/osp-chakra-reusable-components/icons8-google-48.png";

// src/assets/images/createaccount.jpg
var createaccount_default = "./images/osp-chakra-reusable-components/createaccount.jpg";

// src/Pages/LoginPage/LoginPage.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var MotionFlex = motion(Flex);
var MotionBox = motion(Box);
function LoginPage({
  onLogin,
  onSignUp,
  forgotPasswordLink
}) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSignUpClick = () => setIsSignUp(true);
  const handleSignInClick = () => setIsSignUp(false);
  const Login_OnSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("emailInput");
    const password = form.get("passwordInput");
    if (typeof email === "string" && typeof password === "string")
      onLogin(email, password);
  };
  const Signup_OnSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("emailInput");
    const password = form.get("passwordInput");
    const firstname = form.get("firstnameInput");
    const lastname = form.get("lastnameInput");
    const middlename = form.get("middlenameInput");
    const contactnumber = form.get("contactInput");
    const confirm = form.get("confirmPasswordInput");
    if (password !== confirm) return alert("Passwords do not match");
    if (typeof email === "string" && typeof password === "string" && typeof firstname === "string" && typeof lastname === "string" && typeof middlename === "string" && typeof contactnumber === "string")
      onSignUp(email, password, firstname, lastname, middlename, contactnumber);
  };
  return /* @__PURE__ */ jsx(
    Flex,
    {
      w: "100%",
      h: "100vh",
      align: "center",
      justify: "center",
      bg: "gray.50",
      overflow: "hidden",
      children: /* @__PURE__ */ jsxs(
        Flex,
        {
          position: "relative",
          w: { base: "100%", md: "800px" },
          h: { base: "100%", md: "650px" },
          borderRadius: { base: 0, md: "lg" },
          boxShadow: "xl",
          bg: "white",
          overflow: "hidden",
          children: [
            /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !isSignUp ? /* @__PURE__ */ jsx(
              MotionFlex,
              {
                flex: "1",
                align: "center",
                justify: "center",
                p: 8,
                initial: { x: -50, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                exit: { x: -50, opacity: 0 },
                transition: { duration: 0.4 },
                children: /* @__PURE__ */ jsx("form", { onSubmit: Login_OnSubmit, children: /* @__PURE__ */ jsxs(VStack, { padding: 4, align: "stretch", minW: "280px", children: [
                  /* @__PURE__ */ jsx(Image, { src: stpeter_logo_default, w: "100%", mx: "auto", mb: isMobile ? "20px" : "10px" }),
                  /* @__PURE__ */ jsx(Heading, { size: "lg", textAlign: "center", color: "rgb(53, 53, 53)", mb: isMobile ? "20px" : "10px", children: "Log In" }),
                  /* @__PURE__ */ jsxs(HStack, { justify: "center", children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 5px",
                        height: "40px",
                        width: "40px",
                        children: /* @__PURE__ */ jsx(Image, { src: icons8_google_48_default, boxSize: "8" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 5px",
                        height: "40px",
                        width: "40px",
                        children: /* @__PURE__ */ jsx(Image, { src: icons8_meta_48_default, boxSize: "8" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 5px",
                        height: "40px",
                        width: "40px",
                        children: /* @__PURE__ */ jsx(Image, { src: icons8_apple_48_default, boxSize: "8" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(Text, { textAlign: "center", fontSize: "sm", color: "gray.500", my: "10px", children: "or use your account" }),
                  /* @__PURE__ */ jsx(InputFloatingLabel, { type: "email", label: "Email", name: "emailInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ jsx(InputFloatingLabel, { type: "password", label: "Password", name: "passwordInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ jsx(Link, { href: forgotPasswordLink, color: "blue.500", fontSize: "sm", my: "10px", children: "Forgot your password?" }),
                  /* @__PURE__ */ jsx(Button, { type: "submit", children: "Log In" }),
                  /* @__PURE__ */ jsxs(
                    Text,
                    {
                      fontSize: "sm",
                      textAlign: "center",
                      color: "gray.500",
                      mt: 2,
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: "20px",
                      display: isMobile ? "block" : "none",
                      children: [
                        "Don\u2019t have an account?",
                        " ",
                        /* @__PURE__ */ jsx(
                          Link,
                          {
                            color: "var(--chakra-colors-primary)",
                            onClick: handleSignUpClick,
                            children: /* @__PURE__ */ jsx(Strong, { children: " Create Account" })
                          }
                        )
                      ]
                    }
                  )
                ] }) })
              },
              "signin"
            ) : /* @__PURE__ */ jsx(
              MotionFlex,
              {
                flex: "1",
                align: "center",
                justify: "center",
                p: 0,
                initial: { x: 50, opacity: 0 },
                animate: { x: isMobile ? 0 : 400, opacity: 1 },
                exit: { x: 50, opacity: 0 },
                transition: { duration: 0.4 },
                children: /* @__PURE__ */ jsx("form", { onSubmit: Signup_OnSubmit, children: /* @__PURE__ */ jsxs(VStack, { padding: 3, align: "stretch", maxW: "sm", children: [
                  /* @__PURE__ */ jsx(Heading, { size: "lg", color: "rgb(53, 53, 53)", children: "Create Account" }),
                  /* @__PURE__ */ jsx(Text, { fontSize: "sm", color: "gray.600", children: "Join us and secure your future." }),
                  /* @__PURE__ */ jsx("hr", {}),
                  /* @__PURE__ */ jsx(InputFloatingLabel, { label: "Last Name", name: "lastnameInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ jsx(InputFloatingLabel, { label: "First Name", name: "firstnameInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ jsx(InputFloatingLabel, { label: "Middle Name", name: "middlenameInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ jsx(InputFloatingLabel, { label: "Email", type: "email", name: "emailInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ jsx(InputFloatingLabel, { label: "Contact No.", type: "number", name: "contactInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ jsx(InputFloatingLabel, { label: "Password", type: "password", name: "passwordInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ jsx(InputFloatingLabel, { label: "Confirm Password", type: "password", name: "confirmPasswordInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ jsxs(Checkbox.Root, { mt: "10px", colorPalette: "theme", children: [
                    /* @__PURE__ */ jsx(Checkbox.HiddenInput, {}),
                    /* @__PURE__ */ jsx(Checkbox.Control, {}),
                    /* @__PURE__ */ jsxs(Checkbox.Label, __spreadProps(__spreadValues({ color: "rgb(53, 53, 53)" }, { children: null }), { children: [
                      "I agree to the ",
                      " ",
                      /* @__PURE__ */ jsx(Link, { color: "var(--chakra-colors-primary)", children: /* @__PURE__ */ jsx(Strong, { children: "Terms and Conditions" }) })
                    ] }))
                  ] }),
                  /* @__PURE__ */ jsxs(Checkbox.Root, { mb: "10px", colorPalette: "theme", children: [
                    /* @__PURE__ */ jsx(Checkbox.HiddenInput, {}),
                    /* @__PURE__ */ jsx(Checkbox.Control, {}),
                    /* @__PURE__ */ jsxs(Checkbox.Label, __spreadProps(__spreadValues({ color: "rgb(53, 53, 53)" }, { children: null }), { children: [
                      "I agree to the ",
                      " ",
                      /* @__PURE__ */ jsx(Link, { color: "var(--chakra-colors-primary)", children: /* @__PURE__ */ jsx(Strong, { children: "Data Privacy Policy" }) })
                    ] }))
                  ] }),
                  /* @__PURE__ */ jsx(SignupButton, { type: "submit", width: "100%" }),
                  /* @__PURE__ */ jsxs(
                    Text,
                    {
                      fontSize: "sm",
                      textAlign: "center",
                      color: "gray.500",
                      mt: 2,
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: "20px",
                      display: isMobile ? "block" : "none",
                      children: [
                        "Already have an account?",
                        " ",
                        /* @__PURE__ */ jsx(
                          Link,
                          {
                            color: "var(--chakra-colors-primary)",
                            onClick: handleSignInClick,
                            children: /* @__PURE__ */ jsx(Strong, { children: " Log In" })
                          }
                        )
                      ]
                    }
                  )
                ] }) })
              },
              "signup"
            ) }),
            !isMobile && /* @__PURE__ */ jsx(
              MotionBox,
              {
                flex: "1",
                bg: "var(--chakra-colors-primary)",
                color: "white",
                initial: { x: isSignUp ? "-100%" : "0%" },
                animate: { x: isSignUp ? "-100%" : "0%" },
                transition: { duration: 0.6 },
                p: 0,
                children: isSignUp ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    Image,
                    {
                      src: createaccount_default,
                      mb: 4,
                      objectFit: "cover",
                      width: "100%",
                      margin: 0,
                      padding: 0,
                      border: "none"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Box,
                    {
                      display: "flex",
                      flexDir: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 8,
                      children: [
                        /* @__PURE__ */ jsx(Heading, { size: "lg", mb: 2, children: "Already have an account?" }),
                        /* @__PURE__ */ jsx(Text, { mb: 4, children: "To keep connected with us, please log in with your personal info" }),
                        /* @__PURE__ */ jsx(
                          Button,
                          {
                            size: "lg",
                            color: "white",
                            borderColor: "white",
                            onClick: handleSignInClick,
                            children: "Log In"
                          }
                        )
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    Image,
                    {
                      src: login_default,
                      width: "100%",
                      margin: 0,
                      padding: 0,
                      border: "none",
                      mb: 4,
                      objectFit: "cover"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Box,
                    {
                      display: "flex",
                      flexDir: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 8,
                      children: [
                        /* @__PURE__ */ jsx(Heading, { size: "lg", mb: 2, children: "Welcome to St. Peter eStore!" }),
                        /* @__PURE__ */ jsx(Text, { mb: 4, children: "Enter your personal details and start your journey with us" }),
                        /* @__PURE__ */ jsx(
                          Button,
                          {
                            size: "lg",
                            color: "white",
                            borderColor: "white",
                            onClick: handleSignUpClick,
                            children: "Create Account"
                          }
                        )
                      ]
                    }
                  )
                ] })
              },
              "overlay"
            )
          ]
        }
      )
    }
  );
}

// src/Pages/ReinstatementPage/ReinstatementPage.tsx
import {
  Box as Box2,
  Heading as Heading2,
  Text as Text2,
  VStack as VStack2,
  HStack as HStack2,
  Checkbox as Checkbox2,
  Input,
  Button as Button2,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  useDisclosure,
  Stack
} from "@chakra-ui/react";
import { useState as useState2, useRef, useEffect } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ReinstatementPage({
  initialPlans,
  onSubmit
}) {
  const RIFee = useRef(null);
  const RIPayment = useRef(null);
  const TotalAmountDue = useRef(null);
  const [reinstateFullyPaid, setReinstateFullyPaid] = useState2(false);
  const [selectedPlan, setSelectedPlan] = useState2(null);
  const [checkedPlans, setCheckedPlans] = useState2([]);
  const [phLapsedPlans] = useState2(initialPlans || []);
  const selectedPlanData = phLapsedPlans == null ? void 0 : phLapsedPlans.find(
    (plan) => plan.lpaNo === selectedPlan
  );
  const {
    open: isErrorModalOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose
  } = useDisclosure();
  const handleSelect = (plan, checked) => {
    if (checked) {
      const newItem = {
        lpaNo: plan.lpaNo,
        planType: plan.planType,
        reinstatementFee: 500,
        reinstatementPayment: reinstateFullyPaid ? plan.newBalance ? parseFloat(plan.newBalance) : 0 : plan.newInstAmt ? parseFloat(plan.newInstAmt) : 0
      };
      setCheckedPlans((prev) => [...prev, newItem]);
    } else {
      setCheckedPlans((prev) => prev.filter((p) => p.lpaNo !== plan.lpaNo));
    }
  };
  const handleReinstateFullyPaidChange = (checked) => {
    setReinstateFullyPaid(checked);
    setCheckedPlans(
      (prev) => prev.map((element) => {
        const plan = phLapsedPlans.find((p) => p.lpaNo === element.lpaNo);
        return __spreadProps(__spreadValues({}, element), {
          reinstatementPayment: checked ? (plan == null ? void 0 : plan.newBalance) ? parseFloat(plan.newBalance) : 0 : (plan == null ? void 0 : plan.newInstAmt) ? parseFloat(plan.newInstAmt) : 0
        });
      })
    );
  };
  useEffect(() => {
    const totalRIFee = checkedPlans.reduce(
      (sum, plan) => sum + plan.reinstatementFee,
      0
    );
    const totalRIPayment = checkedPlans.reduce(
      (sum, plan) => sum + plan.reinstatementPayment,
      0
    );
    const totalDue = totalRIFee + totalRIPayment;
    if (RIFee.current) RIFee.current.innerText = totalRIFee.toFixed(2);
    if (RIPayment.current) RIPayment.current.innerText = totalRIPayment.toFixed(2);
    if (TotalAmountDue.current)
      TotalAmountDue.current.innerText = totalDue.toFixed(2);
  }, [checkedPlans, reinstateFullyPaid]);
  const btnReinstate_OnClick = () => {
    if (checkedPlans.length === 0) onErrorOpen();
    else onSubmit(checkedPlans);
  };
  return /* @__PURE__ */ jsxs2(Card.Root, { maxW: "6xl", mx: "auto", p: 6, shadow: "lg", children: [
    /* @__PURE__ */ jsxs2(CardHeader, { textAlign: "center", children: [
      /* @__PURE__ */ jsx2(Heading2, { size: "lg", children: "Reinstatement" }),
      /* @__PURE__ */ jsx2(Text2, { color: "gray.600", mt: 2, children: "Bring your plan back on track with ease. The Reinstatement option lets you reactivate a lapsed plan so you can continue enjoying your benefits and resume payments smoothly." })
    ] }),
    /* @__PURE__ */ jsxs2(CardBody, { children: [
      /* @__PURE__ */ jsx2(
        Box2,
        {
          borderWidth: "1px",
          borderRadius: "md",
          mb: 6,
          bg: "gray.50",
          maxH: "150px",
          overflowY: "auto",
          children: phLapsedPlans.length === 0 ? /* @__PURE__ */ jsx2(Text2, { p: 4, textAlign: "center", children: "No Lapsed Plan" }) : phLapsedPlans.map((plan) => /* @__PURE__ */ jsxs2(
            HStack2,
            {
              p: 3,
              justify: "space-around",
              borderBottom: "1px solid",
              borderColor: "gray.200",
              cursor: "pointer",
              bg: selectedPlan === plan.lpaNo ? "var(--chakra-colors-primary)/15" : "white",
              _hover: { bg: "gray.100" },
              onClick: () => setSelectedPlan(plan.lpaNo),
              children: [
                /* @__PURE__ */ jsxs2(Checkbox2.Root, { colorPalette: "green", children: [
                  /* @__PURE__ */ jsx2(Checkbox2.HiddenInput, { onChange: (e) => handleSelect(plan, e.target.checked) }),
                  /* @__PURE__ */ jsx2(Checkbox2.Control, {})
                ] }),
                /* @__PURE__ */ jsx2(Text2, { children: plan.lpaNo }),
                /* @__PURE__ */ jsx2(Text2, { children: plan.phName }),
                /* @__PURE__ */ jsxs2(Text2, { children: [
                  "Mode: ",
                  plan.mop
                ] }),
                /* @__PURE__ */ jsxs2(Text2, { children: [
                  "Due: ",
                  plan.duedate
                ] })
              ]
            },
            plan.lpaNo
          ))
        }
      ),
      /* @__PURE__ */ jsxs2(Stack, { direction: { base: "column", md: "row" }, p: 6, children: [
        /* @__PURE__ */ jsxs2(Box2, { flex: "1", children: [
          /* @__PURE__ */ jsx2(Heading2, { size: "md", textAlign: "center", mb: 4, children: "Current Plan" }),
          /* @__PURE__ */ jsxs2(SimpleGrid, { columns: { base: 1, md: 2 }, p: 4, children: [
            /* @__PURE__ */ jsx2(FormField, { label: "LPA No.", value: selectedPlanData == null ? void 0 : selectedPlanData.lpaNo }),
            /* @__PURE__ */ jsx2(
              FormField,
              {
                label: "Account Status",
                value: selectedPlanData == null ? void 0 : selectedPlanData.status
              }
            ),
            /* @__PURE__ */ jsx2(
              FormField,
              {
                label: "Total Amount Payable",
                value: selectedPlanData == null ? void 0 : selectedPlanData.totalAmtPayable
              }
            ),
            /* @__PURE__ */ jsx2(
              FormField,
              {
                label: "Total Amount Paid",
                value: selectedPlanData == null ? void 0 : selectedPlanData.totalAmtPaid
              }
            ),
            /* @__PURE__ */ jsx2(FormField, { label: "Balance", value: selectedPlanData == null ? void 0 : selectedPlanData.balance }),
            /* @__PURE__ */ jsx2(
              FormField,
              {
                label: "Installment Amount",
                value: selectedPlanData == null ? void 0 : selectedPlanData.instAmt
              }
            )
          ] }),
          /* @__PURE__ */ jsxs2(Checkbox2.Root, { mt: 4, colorPalette: "green", children: [
            /* @__PURE__ */ jsx2(Checkbox2.HiddenInput, { onChange: (e) => handleReinstateFullyPaidChange(e.target.checked) }),
            /* @__PURE__ */ jsx2(Checkbox2.Control, {}),
            /* @__PURE__ */ jsx2(Checkbox2.Label, __spreadProps(__spreadValues({}, { children: null }), { children: "Reinstate Fully Paid" }))
          ] })
        ] }),
        /* @__PURE__ */ jsxs2(Box2, { flex: "1", children: [
          /* @__PURE__ */ jsx2(Heading2, { size: "md", textAlign: "center", mb: 4, children: "After Reinstatement" }),
          /* @__PURE__ */ jsxs2(SimpleGrid, { columns: { base: 1, md: 2 }, p: 4, children: [
            /* @__PURE__ */ jsx2(FormField, { label: "LPA No.", value: selectedPlanData == null ? void 0 : selectedPlanData.newLpaNo }),
            /* @__PURE__ */ jsx2(
              FormField,
              {
                label: "New Account Status",
                value: selectedPlanData == null ? void 0 : selectedPlanData.newStatus
              }
            ),
            /* @__PURE__ */ jsx2(
              FormField,
              {
                label: "New Total Amount Payable",
                value: selectedPlanData == null ? void 0 : selectedPlanData.newTotalAmtPayable
              }
            ),
            /* @__PURE__ */ jsx2(
              FormField,
              {
                label: "Total Amount Paid",
                value: selectedPlanData == null ? void 0 : selectedPlanData.newTotalAmtPaid
              }
            ),
            /* @__PURE__ */ jsx2(
              FormField,
              {
                label: "Balance",
                value: selectedPlanData == null ? void 0 : selectedPlanData.newBalance
              }
            ),
            /* @__PURE__ */ jsx2(
              FormField,
              {
                label: "New Installment Amount",
                value: selectedPlanData == null ? void 0 : selectedPlanData.newInstAmt
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2(
        Box2,
        {
          mt: 8,
          borderWidth: "1px",
          borderColor: "var(--chakra-colors-primary)",
          borderRadius: "lg",
          p: 5,
          bg: "var(--chakra-colors-primary)/15",
          color: "gray.700",
          children: [
            /* @__PURE__ */ jsx2(Text2, { children: "Applying for reinstatement requires the following payments:" }),
            /* @__PURE__ */ jsxs2(VStack2, { align: "start", p: 1, mt: 2, children: [
              /* @__PURE__ */ jsxs2(Text2, { children: [
                "Reinstatement Fee: ",
                /* @__PURE__ */ jsxs2("strong", { children: [
                  "\u20B1 ",
                  /* @__PURE__ */ jsx2("span", { ref: RIFee, children: "0" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs2(Text2, { children: [
                "Reinstatement Payment:",
                " ",
                /* @__PURE__ */ jsxs2("strong", { children: [
                  "\u20B1 ",
                  /* @__PURE__ */ jsx2("span", { ref: RIPayment, children: "0" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs2(Text2, { fontWeight: "bold", mt: 3, children: [
              "Total Amount Due: \u20B1 ",
              /* @__PURE__ */ jsx2("span", { ref: TotalAmountDue, children: "0" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx2(
        Button2,
        {
          mt: 6,
          colorScheme: "blue",
          w: "full",
          size: "lg",
          onClick: btnReinstate_OnClick,
          children: "Reinstate"
        }
      )
    ] })
  ] });
}
function FormField({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs2(Box2, { m: 1, children: [
    /* @__PURE__ */ jsx2(Text2, { fontSize: "sm", color: "gray.600", mb: 1, children: label }),
    /* @__PURE__ */ jsx2(Input, { value: value || "", readOnly: true, bg: "white" })
  ] });
}
export {
  LoginPage,
  ReinstatementPage
};
//# sourceMappingURL=index.mjs.map