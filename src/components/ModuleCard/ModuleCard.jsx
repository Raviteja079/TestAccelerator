const ModuleCard = ({ setSelectedModule, selectedModule, testModules }) => {
  return (
    <div style={{ paddingRight: "20px" }}>
      <h2>Modules</h2>

      <ul>
        {testModules.map((module, index) => {
          const passedTestCases = module?.testCases?.filter((testCase) => {
            return testCase.status === "Passed";
          }).length;
          const failedTestCases = module?.testCases?.filter((testCase) => {
            return testCase.status === "Failed";
          }).length;
          return (
            <li
              key={index}
              style={{
                cursor: "pointer",
                listStyleType: "none",
                padding: "10px",
                backgroundColor:
                  selectedModule?.module === module.module ? "#f0f0f0" : "#fff",
              }}
              onClick={() => {
                setSelectedModule(module);
              }}
            >
              <span style={{ width: "40px", display: "inline-block" }}>
                {module?.module}
              </span>
              - ✅{" "}
              <span style={{ width: "40px", display: "inline-block" }}>
                {passedTestCases}
              </span>{" "}
              passed{" "}
              <span style={{ width: "20px", display: "inline-block" }}>|</span>{" "}
              ❌{" "}
              <span style={{ width: "40px", display: "inline-block" }}>
                {failedTestCases}
              </span>{" "}
              failed
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ModuleCard;
