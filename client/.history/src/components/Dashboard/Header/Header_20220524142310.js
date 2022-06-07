export default function Header(props) {
  const { title } = props;
  return (
    <div className="dashboardInfoHeaderContainer">
      <div className="dashboardInfoHeader">
        <h3 className="infoPageTitle">{title}</h3>
        <div className="dashboardButtons">
          <button>add thing button</button>
          <button>other button</button>
        </div>
      </div>
      <div className='searchbar'
    </div>
  );
}
