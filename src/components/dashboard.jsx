import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import ModuleCard from "./ModuleCard";
import TestCaseTable from "./TestCaseTable";
import modulesData from "../data/testModule.json";
import { toast } from "react-toastify";
import ModulePieChart from "./ModulePieChart";
import ModuleBarChart from "./ModuleBarChart";
import ModuleLineChart from "./ModuleLineChart";
import ModuleStackedBarChart from "./ModuleStackedBarChart";
import { convertToCSV } from "../utils/exportToCsv";

const Dashboard = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  //   const [testResults, setTestResults] = useState([]);
  const [testModules, setTestModules] = useState(modulesData);
  // const [modules, setModules] = React.useState(modulesData);

  useEffect(() => {
    const storedTestResults = JSON.parse(
      localStorage.getItem("testResults") || "{}"
    );
    // Get saved modules (including reordered testCases) if available
    const savedModules = JSON.parse(localStorage.getItem("modules"));

    const baseModules = savedModules || modulesData;

    const updatedModules = baseModules.map((mod) => {
      const updatedTestCases = mod.testCases.map((tc) => {
        const testResult = storedTestResults[tc.name];
        return testResult && testResult.moduleName === mod.module
          ? { ...tc, status: testResult.testCaseStatus }
          : tc;
      });
      return { ...mod, testCases: updatedTestCases };
    });

    setTestModules(updatedModules);
  }, []);

  const handleDownloadCSV = () => {
    const csv = convertToCSV(testModules);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "test_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(testModules, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "test_results.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const runAllTests = () => {
    const updatedModules = testModules.map((module) => {
      const updatedTestCases = module.testCases.map((test) => {
        const result = Math.random() > 0.5 ? "Passed" : "Failed";
        toast[result === "Passed" ? "success" : "error"](
          `${test.name} ${result}`
        );
        return {
          ...test,
          status: result,
        };
      });
      return {
        ...module,
        testCases: updatedTestCases,
      };
    });

    setTestModules(updatedModules);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.chartsGrid}>
        <div style={{ display: "flex", flexDirection: "column", width: "45%" }}>
          <ModuleCard
            setSelectedModule={setSelectedModule}
            selectedModule={selectedModule}
            testModules={testModules}
            setTestModules={setTestModules}
          />

          <h3 className={styles.moduleHead}>
            Test cases for selected module {selectedModule?.module}
          </h3>
          <TestCaseTable
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            testModules={testModules}
            setTestModules={setTestModules}
          />
        </div>
        <div style={{ width: "55%", padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 20px",
            }}
          >
            <button onClick={runAllTests} className={styles.allTestCasesBtn}>
              Run All TestCases
            </button>
            <div>
              <button className={styles.loginBtn} onClick={handleDownloadCSV}>
                Download as CSV
              </button>{" "}
              <button onClick={handleDownloadJSON} className={styles.loginBtn}>
                Download as JSON
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              overflowX: "scroll",
              marginTop: "40px",
              boxShadow: "0 0px 0px 0 #000000, 0 0px 1px 0 #000000",
            }}
          >
            <ModuleLineChart modules={testModules} />
            <ModuleBarChart modules={testModules} />
            <ModuleStackedBarChart modules={testModules} />
            {testModules.map((module, index) => (
              <ModulePieChart key={index} module={module} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
