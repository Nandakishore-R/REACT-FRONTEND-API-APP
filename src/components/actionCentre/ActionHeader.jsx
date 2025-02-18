import { useState } from "react";

const ActionHeader = ({ activeTab, setActiveTab }) => {
    const tabs = [
      { id: "dueId", label: "Due", target: "DueTable" },
      { id: "overdueId", label: "Overdue", target: "OverdueTable" },
      { id: "upcomingId", label: "Upcoming", target: "Upcoming" },
      { id: "inprogressId", label: "In Progress", target: "Inprogress" },
      { id: "completedId", label: "Completed", target: "Completed" },
    ];
    return (
      <div className="action-centre-nav">
        <ul className="nav nav-tabs action-tabs">
          {tabs.map((tab) => (
            <li key={tab.id} className={activeTab === tab.target ? "active" : ""}>
              <a
                id={tab.id}
                data-toggle="tab"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab.target);
                }}
                href={`#${tab.target}`}
              >
                <span className="tab-num"></span>
                <br />
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default ActionHeader;
