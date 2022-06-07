export default function Summary(props) {
  return (
    <div>
      <div className="dashboardInfoHeaderContainer">
        <div className="dashboardInfoHeader">
          <h3 className="infoPageTitle">Welcome back, user</h3>
        </div>
      </div>
      <div id="dashboardInfo">
        <div id="overviewTitle">Overview</div>
        <div>sales per week graph</div>
        <div>pie chart product sold</div>
      </div>
    </div>
  );
}
