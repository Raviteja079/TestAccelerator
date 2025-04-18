import React, { useState } from "react";
import styles from "./dashboard.module.css";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TestCaseTable = ({ selectedModule, testModules, setTestModules }) => {
  const [testStatus, setTestStatus] = useState({});
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterFocused, setIsFilterFocused] = useState(false);

  const isFilterActive =
    searchText.trim() !== "" || statusFilter !== "All" || isFilterFocused;

  const handleTestStatus = (testName, status) => {
    if (status === "Passed") {
      toast.success(`${testName} passed`);
    } else {
      toast.error(`${testName} failed`);
    }
  };

  const updateTestResult = (testName, result) => {
    const updatedModules = testModules.map((mod) => {
      if (mod.module === selectedModule.module) {
        return {
          ...mod,
          testCases: mod.testCases.map((testCase) =>
            testCase.name === testName
              ? { ...testCase, status: result }
              : testCase
          ),
        };
      }
      return mod;
    });
    setTestModules(updatedModules);
  };

  const getStatus = (testCase) =>
    testStatus[testCase.name] || testCase.status || "Not Started";
  const matchedTestCaseModule = testModules.find(
    (mod) => mod?.module === selectedModule?.module
  );
  const filteredTestCases = matchedTestCaseModule?.testCases?.filter(
    (testCase) => {
      const nameMatch = testCase.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const status = getStatus(testCase);
      const statusMatch = statusFilter === "All" || statusFilter === status;
      return nameMatch && statusMatch;
    }
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTestCases = Array.from(selectedModule.testCases);
    const [moved] = updatedTestCases.splice(result.source.index, 1);
    updatedTestCases.splice(result.destination.index, 0, moved);

    const updatedModules = testModules.map((mod) =>
      mod.module === selectedModule.module
        ? { ...mod, testCases: updatedTestCases }
        : mod
    );
    setTestModules(updatedModules);
    localStorage.setItem("modules", JSON.stringify(updatedModules));
  };

  return (
    <>
      <div className={styles.filterContainer}>
        {isFilterActive && (
          <p
            style={{ color: "red", fontStyle: "italic", marginBottom: "8px" }}
          >
            Reordering disabled while filters are applied.
          </p>
        )}
        <input
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFilterFocused(true)}
          onBlur={() => setIsFilterFocused(false)}
          className={styles.searchInput}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          onFocus={() => setIsFilterFocused(true)}
          onBlur={() => setIsFilterFocused(false)}
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
          onClick={() => {
            setSearchText("");
            setStatusFilter("All");
          }}
        >
          Reset Filters
        </button>
      </div>

      {selectedModule?.module && (
        <div className={styles.testCaseTable}>
          {filteredTestCases.length === 0 ? (
            <div>
              <p>No data to show</p>
            </div>
          ) : (
            <DragDropContext
              onBeforeCapture={(start) => {
                if (isFilterActive) {
                  toast.info("Clear filters to reorder test cases");
                }
              }}
              onDragEnd={onDragEnd}
            >
              <Droppable
                droppableId="test-cases"
                isDropDisabled={isFilterActive}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
                // className={styles.droppableArea}
                direction="vertical"
              >
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredTestCases.map((testCase, index) => {
                      const status =
                        testStatus[testCase.name] ||
                        testCase.status ||
                        "Not Started";
                      const color =
                        status === "Passed"
                          ? "green"
                          : status === "Failed"
                          ? "red"
                          : "black";
                      return (
                        <Draggable
                          key={testCase.name}
                          draggableId={testCase.name}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className={styles.testCaseCard}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                maxWidth: "100%",
                              }}
                            >
                              <h3 className={styles.testCaseName}>
                                {testCase.name}
                              </h3>
                              <p>{testCase.description}</p>
                              <button
                                className={styles.runTestBtn}
                                onClick={() => {
                                  setTestStatus((prev) => ({
                                    ...prev,
                                    [testCase.name]: "Running",
                                  }));
                                  setTimeout(() => {
                                    const result =
                                      Math.random() > 0.5 ? "Passed" : "Failed";
                                    setTestStatus((prev) => ({
                                      ...prev,
                                      [testCase.name]: result,
                                    }));
                                    updateTestResult(testCase.name, result);

                                    const storedTestResults = JSON.parse(
                                      localStorage.getItem("testResults") ||
                                        "{}"
                                    );
                                    const newResult = {
                                      testCaseStatus: result,
                                      moduleName: selectedModule.module,
                                    };
                                    storedTestResults[testCase.name] =
                                      newResult;
                                    localStorage.setItem(
                                      "testResults",
                                      JSON.stringify(storedTestResults)
                                    );
                                    handleTestStatus(testCase.name, result);
                                  }, 2000);
                                }}
                              >
                                Run Test
                              </button>
                              Status:
                              <span
                                style={{
                                  marginLeft: "10px",
                                  color,
                                  // testStatus[testCase.name] === "Passed"
                                  //   ? "green"
                                  //   : testStatus[testCase.name] === "Failed"
                                  //   ? "red"
                                  //   : "black",
                                  fontWeight: "bold",
                                }}
                              >
                                {status}
                                {console.log(
                                  testCase,
                                  testModules,
                                  "testa",
                                  testStatus
                                )}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      )}
    </>
  );
};

export default TestCaseTable;
