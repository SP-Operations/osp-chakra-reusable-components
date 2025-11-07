"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  LoginPage: () => LoginPage,
  ReinstatementPage: () => ReinstatementPage
});
module.exports = __toCommonJS(index_exports);

// src/LoginPage.tsx
var import_react = require("@chakra-ui/react");
var import_react2 = require("react");
var import_framer_motion = require("framer-motion");
var import_st_peter_ui = require("st-peter-ui");

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

// src/LoginPage.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var MotionFlex = (0, import_framer_motion.motion)(import_react.Flex);
var MotionBox = (0, import_framer_motion.motion)(import_react.Box);
function LoginPage({
  onLogin,
  onSignUp,
  forgotPasswordLink
}) {
  const isMobile = (0, import_react.useBreakpointValue)({ base: true, md: false });
  const [isSignUp, setIsSignUp] = (0, import_react2.useState)(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react.Flex,
    {
      w: "100%",
      h: "100vh",
      align: "center",
      justify: "center",
      bg: "gray.50",
      overflow: "hidden",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_react.Flex,
        {
          position: "relative",
          w: { base: "100%", md: "800px" },
          h: { base: "100%", md: "650px" },
          borderRadius: { base: 0, md: "lg" },
          boxShadow: "xl",
          bg: "white",
          overflow: "hidden",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { mode: "wait", children: !isSignUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", { onSubmit: Login_OnSubmit, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.VStack, { padding: 4, align: "stretch", minW: "280px", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Image, { src: stpeter_logo_default, w: "100%", mx: "auto", mb: isMobile ? "20px" : "10px" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Heading, { size: "lg", textAlign: "center", color: "rgb(53, 53, 53)", mb: isMobile ? "20px" : "10px", children: "Log In" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.HStack, { justify: "center", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_react.Link,
                      {
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 5px",
                        height: "40px",
                        width: "40px",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Image, { src: icons8_google_48_default, boxSize: "8" })
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_react.Link,
                      {
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 5px",
                        height: "40px",
                        width: "40px",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Image, { src: icons8_meta_48_default, boxSize: "8" })
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_react.Link,
                      {
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 5px",
                        height: "40px",
                        width: "40px",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Image, { src: icons8_apple_48_default, boxSize: "8" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Text, { textAlign: "center", fontSize: "sm", color: "gray.500", my: "10px", children: "or use your account" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.InputFloatingLabel, { type: "email", label: "Email", name: "emailInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.InputFloatingLabel, { type: "password", label: "Password", name: "passwordInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Link, { href: forgotPasswordLink, color: "blue.500", fontSize: "sm", my: "10px", children: "Forgot your password?" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Button, { type: "submit", children: "Log In" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    import_react.Text,
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
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          import_react.Link,
                          {
                            color: "var(--chakra-colors-primary)",
                            onClick: handleSignUpClick,
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Strong, { children: " Create Account" })
                          }
                        )
                      ]
                    }
                  )
                ] }) })
              },
              "signin"
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", { onSubmit: Signup_OnSubmit, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.VStack, { padding: 3, align: "stretch", maxW: "sm", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Heading, { size: "lg", color: "rgb(53, 53, 53)", children: "Create Account" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Text, { fontSize: "sm", color: "gray.600", children: "Join us and secure your future." }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.InputFloatingLabel, { label: "Last Name", name: "lastnameInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.InputFloatingLabel, { label: "First Name", name: "firstnameInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.InputFloatingLabel, { label: "Middle Name", name: "middlenameInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.InputFloatingLabel, { label: "Email", type: "email", name: "emailInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.InputFloatingLabel, { label: "Contact No.", type: "number", name: "contactInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.InputFloatingLabel, { label: "Password", type: "password", name: "passwordInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.InputFloatingLabel, { label: "Confirm Password", type: "password", name: "confirmPasswordInput", required: true, autoComplete: "off" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Checkbox.Root, { mt: "10px", colorPalette: "theme", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Checkbox.HiddenInput, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Checkbox.Control, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Checkbox.Label, __spreadProps(__spreadValues({ color: "rgb(53, 53, 53)" }, { children: null }), { children: [
                      "I agree to the ",
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Link, { color: "var(--chakra-colors-primary)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Strong, { children: "Terms and Conditions" }) })
                    ] }))
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Checkbox.Root, { mb: "10px", colorPalette: "theme", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Checkbox.HiddenInput, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Checkbox.Control, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Checkbox.Label, __spreadProps(__spreadValues({ color: "rgb(53, 53, 53)" }, { children: null }), { children: [
                      "I agree to the ",
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Link, { color: "var(--chakra-colors-primary)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Strong, { children: "Data Privacy Policy" }) })
                    ] }))
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_st_peter_ui.SignupButton, { type: "submit", width: "100%" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    import_react.Text,
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
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          import_react.Link,
                          {
                            color: "var(--chakra-colors-primary)",
                            onClick: handleSignInClick,
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Strong, { children: " Log In" })
                          }
                        )
                      ]
                    }
                  )
                ] }) })
              },
              "signup"
            ) }),
            !isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              MotionBox,
              {
                flex: "1",
                bg: "var(--chakra-colors-primary)",
                color: "white",
                initial: { x: isSignUp ? "-100%" : "0%" },
                animate: { x: isSignUp ? "-100%" : "0%" },
                transition: { duration: 0.6 },
                p: 0,
                children: isSignUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_react.Image,
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
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    import_react.Box,
                    {
                      display: "flex",
                      flexDir: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 8,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Heading, { size: "lg", mb: 2, children: "Already have an account?" }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Text, { mb: 4, children: "To keep connected with us, please log in with your personal info" }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          import_react.Button,
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
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_react.Image,
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
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    import_react.Box,
                    {
                      display: "flex",
                      flexDir: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 8,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Heading, { size: "lg", mb: 2, children: "Welcome to St. Peter eStore!" }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Text, { mb: 4, children: "Enter your personal details and start your journey with us" }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          import_react.Button,
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

// src/ReinstatementPage/ReinstatementPage.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function ReinstatementPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: "Reinstatement Form" });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginPage,
  ReinstatementPage
});
//# sourceMappingURL=index.js.map