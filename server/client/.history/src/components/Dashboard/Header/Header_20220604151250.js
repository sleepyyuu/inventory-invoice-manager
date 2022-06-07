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
            <button
              className="addNewButton"
              onClick={() => {
                handleAdd();
              }}
            >
              + New {title.slice(0, title.length - 1)}
            </button>
          </div>
        )}
      </div>
      <div className="searchbar">
        <label htmlFor="searchBar"></label>
        <input type="text" name="searchBar" id="searchBar" placeholder={`&nbsp;Search ${title}`}></input>
      </div>
    </div>
  );
}
