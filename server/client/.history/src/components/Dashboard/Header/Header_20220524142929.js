export default function Header(props) {
  const { title } = props;
  return (
    <div className="dashboardInfoHeaderContainer">
      <div className="dashboardInfoHeader">
        <h3 className="infoPageTitle">{title}</h3>
        <div className="dashboardButtons">
          <button>add thing button</button>
          <button>+ New {title.slice(0, title.length - 1)}</button>
        </div>
      </div>
      <div className="searchbar">
        <label htmlFor="searchBar"></label>
        <input type="text" name="searchBar" id="searchBar" placeholder={`Search ${title}`}></input>
      </div>
    </div>
  );
}
