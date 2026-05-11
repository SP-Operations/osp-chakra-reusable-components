import { Flex, Tabs, Text } from "@chakra-ui/react";
import { IoHomeOutline } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";

import PersonalInfo from "./PersonalInfo";
import Address from "./Address";
import Employment from "./Employment";

const LifePlanApplicationFormWrapper = () => {
  const [activeTab, setActiveTab] = useState("step1");

  const handleTabChange = (details: any) => {
    setActiveTab(details.value);
  };

  return (
    <div>
      <Tabs.Root
        value={activeTab}
        onValueChange={handleTabChange}
        variant="line"
      >
        <Tabs.List>
          <Tabs.Trigger value="step1">
            <Flex align="center" gap={2}>
              <FaRegUser fontSize={24} />
              <Text>Personal Info</Text>
            </Flex>
          </Tabs.Trigger>

          <Tabs.Trigger value="step2">
            <Flex align="center" gap={2}>
              <IoHomeOutline />
              <Text>Residential Address</Text>
            </Flex>
          </Tabs.Trigger>

          <Tabs.Trigger value="step3">
            <Flex align="center" gap={2}>
              <BsPersonWorkspace />
              <Text>Employment</Text>
            </Flex>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="step1">
          <PersonalInfo
            firstName={""}
            lastName={""}
            birthDate={""}
            idType={""}
          />
        </Tabs.Content>

        <Tabs.Content value="step2">
          <Address />
        </Tabs.Content>

        <Tabs.Content value="step3">
          <Employment
            occupation={""}
            employerName={""}
            employmentStatus={""}
            officeAddress={""}
            TIN={""}
            SSS={""}
            sourceOfIncome={""}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default LifePlanApplicationFormWrapper;
