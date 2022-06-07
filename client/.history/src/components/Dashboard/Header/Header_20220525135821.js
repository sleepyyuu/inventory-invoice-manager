export default function Header(props) {
  const { title, handleAdd, addButton } = props;
  console.log(handleAdd);
  return (
    <div className="dashboardInfoHeaderContainer">
      <div className="dashboardInfoHeader">
        <h3 className="infoPageTitle">{title}</h3>
        {title === "Summary" ? (
          <div className="dashboardButtons"></div>
        ) : (
          <div className="dashboardButtons">
            <addButton></addButton>
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
