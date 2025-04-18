import React from "react";
import accordionData from "../../data/accordionData";
import { useState } from "react";
import styles from "./Accordion.module.css";

const AccordionForm = () => {
  const [formData, setFormData] = useState({});
  const [openAccordions, setOpenAccordions] = useState({});

  let icon = "";
  const handleChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };
  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      {accordionData.accordions.map((accordion) => {
        icon = openAccordions[accordion.id] ? (
          <i className="fas fa-minus-circle"></i>
        ) : (
          <i className="fas fa-plus-circle"></i>
        );

        return (
          <div key={accordion.id}>
            <h2
              className={styles.accordionTitle}
              onClick={() => toggleAccordion(accordion.id)}
            >
              {accordion.title}
              <span
                style={{ fontSize: "15px", marginLeft: "15px" }}
                
              >
                {icon}
              </span>
            </h2>
            {openAccordions[accordion.id] && (
              <div style={{backgroundColor: "#ccd9e7",paddingBottom: "20px"}}>
                {accordion.fields.map((field) => {
                  return (
                    <div
                      key={field.key}
                      style={{
                        padding: "15px 15px 0px 35px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label style={{marginBottom:"10px"}} htmlFor={field.key}>{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          value={formData[field.key] || ""}
                          placeholder={field.key}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value)
                          }
                          style={{
                            width: "40%",
                            padding: "8px",
                            border: "none",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.key}
                          value={formData[field.key] || ""}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value)
                          }
                          style={{
                            width: "40%",
                            padding: "8px",
                            border: "none",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      <button
        type="submit"
        style={{
          padding: "10px 16px",
          fontWeight: "bold",
          margin: "20px 0px 20px 20px",
          backgroundColor: "#266baf",
          color: "white",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default AccordionForm;
