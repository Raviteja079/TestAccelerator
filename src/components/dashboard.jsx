import React, { useState } from "react";
import styles from "./dashboard.module.css";
import ModuleCard from "./ModuleCard";
import TestCaseTable from "./TestCaseTable";
import modulesData from "../data/testModule.json";

const Dashboard = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  //   const [testResults, setTestResults] = useState([]);
  const [modules, setModules] = useState(modulesData);
  return (
    <div className={styles.dashboardContainer}>
      <h1>Test Accelerator Dashboard</h1>
      {/* Modules */}
      <ModuleCard
        setSelectedModule={setSelectedModule}
        selectedModule={selectedModule}
        testModules={modules}
        setTestModules={setModules}
      />
      <h3 className={styles.moduleHead}>
        Test cases for selected module {selectedModule?.module}
      </h3>

      {/* Test cases */}
      <TestCaseTable
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        testModules={modules}
        setTestModules={setModules}
      />
    </div>
  );
};

export default Dashboard;
