export default function Summary(props) {
  return (
    <div>
      <div className="dashboardInfoHeaderContainer">
        <div className="dashboardInfoHeader">
          <h3 className="infoPageTitle">Welcome back, name</h3>
        </div>
      </div>
      <div id="dashboardCounts">
        Overview
        <div>sales per week graph</div>
        <div>pie chart product sold</div>
      </div>
    </div>
  );
}
