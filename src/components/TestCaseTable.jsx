import React, { useState } from "react";
import styles from "./dashboard.module.css";
import { toast } from "react-toastify";

const TestCaseTable = ({ selectedModule, testModules, setTestModules }) => {
  const [testStatus, setTestStatus] = useState({});
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleTestStatus = (testName, status) => {
    if (status === "Passed") {
      toast.success(`${testName} passed`);
    } else {
      toast.error(`${testName} failed`);
    }
  };
  const updateTestResult = (testName, result) =>{
    const updatedModules = testModules.map((mod)=>{
        if(mod.module === selectedModule.module){
            return {
                ...mod,
                testCases: mod.testCases.map((testCase)=>
                    testCase.name === testName ? {...testCase, status: result} : testCase
                )
            }
        }
        return mod
    })
    setTestModules(updatedModules)
  }
  const getStatus = (testCase)=>{
    testStatus[testCase.name] ||  testCase.staus || "Not Started"
  }

  const filteredTestCases = selectedModule?.testCases.filter((testCase)=>{
    const nameMatch = testCase.name.toLowerCase().includes(searchText.toLowerCase())
    const status = getStatus(testCase)
    const statusMatch = statusFilter === "All" || statusFilter === status
    return nameMatch && statusMatch
  })

  return (
    <>
    <div className={styles.filterContainer}>
        <input
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={(e)=> setSearchText(e.target.value)}
        className={styles.searchInput}
         />
         <select
         value={statusFilter}
         onChange={(e)=> setStatusFilter(e.target.value)}
         className={styles.statusDropdown}
         >
          <option value="All">All</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
          <option value="Running">Running</option>
          <option value="Not Started">Not Started</option>
         </select>
         <button 
         className={styles.resetBtn}
         onClick={()=>{
            setSearchText("");
            setStatusFilter("All");
         }}>Reset Filters</button>
    </div>
      {selectedModule?.module && (
        <div className={styles.testCaseTable}>
            
          {filteredTestCases.length === 0 ? <div>
            <p>No data to show</p>
          </div>  : filteredTestCases.map((testCase, index) => {
            return (
              <div key={index} className={styles.testCaseCard}>
                <h3 className={styles.testCaseName}>{testCase.name}</h3>
                <p>{testCase.description}</p>
                <button
                  className={styles.runTestBtn}
                  onClick={() => {
                    setTestStatus((prev) => ({
                      ...prev,
                      [testCase.name]: "Running",
                    }));
                    setTimeout(() => {
                      const result = Math.random() > 0.5 ? "Passed" : "Failed";
                      setTestStatus((prev) => ({
                        ...prev,
                        [testCase.name]: result,
                      }));
                      updateTestResult(testCase.name, result)
                      const storedTestResults = JSON.parse(
                        localStorage.getItem("testResults") || "{}"
                      );
                      const newResult = {
                        testCaseStatus: result,
                        moduleName: selectedModule.module,
                      };
                      storedTestResults[testCase.name] = newResult;
                      localStorage.setItem(
                        "testResults",
                        JSON.stringify(storedTestResults)
                      );
                      handleTestStatus(testCase.name, result);
                    }, 2000);
                    // console.log("Running test for", testCase.name, testCase.status, testStatus[testCase.name], );
                  }}
                >
                  Run Test
                </button>
                Status:
                <span
                  style={{
                    marginLeft: "10px",
                    color:
                      testStatus[testCase.name] === "Passed"
                        ? "green"
                        : testStatus[testCase.name] === "Failed"
                        ? "red"
                        : "black",
                    fontWeight: "bold",
                  }}
                >
                  {testStatus[testCase.name] ||
                    testCase.status ||
                    "Not Started"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TestCaseTable;
