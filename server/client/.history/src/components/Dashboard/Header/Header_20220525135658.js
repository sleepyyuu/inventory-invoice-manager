export default function Header(props) {
  const { title, handleAdd } = props;
  return (
    <div className="dashboardInfoHeaderContainer">
      <div className="dashboardInfoHeader">
        <h3 className="infoPageTitle">{title}</h3>
        {title === "Summary" ? (
          <div className="dashboardButtons"></div>
        ) : (
          <div className="dashboardButtons">
            <handleAdd></handleAdd>
          </div>
        )}
      </div>
      <div className="searchbar">
        <label htmlFor="searchBar"></label>
        <input type="text" name="searchBar" id="searchBar" placeholder={`Search ${title}`}></input>
      </div>
    </div>
  );
}
