import React, { Component } from "react";
import ImageLazyLoad from "../section-components/ImageLazyLoad";
import { Link } from "react-router-dom";

class TourListV3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      locationFilter: "",
      priceFilter: 0,
      filteredData: null,
      travelType: ""
    };
  }

  componentDidMount() {
    this.updateFilteredData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.data !== this.props.data ||
      prevState.query !== this.state.query ||
      prevState.locationFilter !== this.state.locationFilter ||
      prevState.priceFilter !== this.state.priceFilter ||
      prevState.travelType !== this.state.travelType
    ) {
      this.updateFilteredData();
    }
  }

  updateFilteredData() {
    const { query, locationFilter, priceFilter, travelType } = this.state;
    const filteredData = this.props.data.filter((singleContent) => {
      const lowercaseQuery = query.toLowerCase();
      const lowercaseLocation = singleContent.location.toLowerCase();
      const lowercaseTravelType = singleContent.travelType.toLowerCase();
     
      return (
        (singleContent.name.toLowerCase().includes(lowercaseQuery) ||
          lowercaseQuery === "") &&
        (locationFilter === "" ||
          lowercaseLocation.includes(locationFilter.toLowerCase())) &&
          (travelType === "" ||
          lowercaseTravelType.includes(travelType.toLowerCase()))
      );
    });

    if (priceFilter === 0) {
      filteredData.sort((a, b) => {
        return (
          parseInt(a.price.replace(",", "")) -
          parseInt(b.price.replace(",", ""))
        );
      });
    } else if (priceFilter === 1) {
      filteredData.sort((a, b) => {
        return (
          parseInt(b.price.replace(",", "")) -
          parseInt(a.price.replace(",", ""))
        );
      });
    }

    this.setState({ filteredData });
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value });
  };

  handleLocationFilter = (e) => {
    this.setState({ locationFilter: e.target.value });
  };

  handleTravelTypeFilter = (e) =>{
    this.setState({travelType: e.target.value});
  }

  handlePriceFilter = (e) => {
    const priceFilter = parseInt(e.target.value);
    this.setState({ priceFilter });
  };

  render() {
    const { query, locationFilter, priceFilter, filteredData, travelType } = this.state;
    console.log(this.state.travelType);
    return (
      <div className="tour-list-area pd-top-120 viaje-go-top">
        <div className="container">
          <div className="row">
            <div className=" col-lg-8 col-sm-12 filter-above order-lg-2 order-sm-2">
              <div className="row justify-content-center">
                {filteredData ? this.renderFilteredData(filteredData) : null}
              </div>
            </div>
            <div className=" col-lg-4 col-sm-12 order-lg-1 order-sm-1">
              <div className="sidebar-area sidebar-area-inner-page">
                <div className="widget tour-list-widget">
                  <div className="widget-tour-list-search">
                    <form className="search-form">
                      <div className="form-group">
                        <input
                          type="text"
                          value={query}
                          onChange={this.handleSearch}
                          placeholder="Search"
                        />
                      </div>
                      <button className="submit-btn" type="submit">
                        <i className="ti-search" />
                      </button>
                    </form>
                  </div>
                  <div className="widget-tour-list-meta">
                    <div className="filter">
                      <i className="fa fa-plus-circle" /> Location
                    </div>
                    <div className="filter">
  <select
                      className="selector w-100"
    value={locationFilter}
    onChange={this.handleLocationFilter}
  >
    <option value={""}>All Tours</option>
    <option value={"Old Delhi"}>Old Delhi</option>
    <option value={"New Delhi"}>New Delhi</option>
    <option value={"Agra"}>Agra</option>
    <option value={"Rajasthan"}>Rajasthan</option>
  </select>
</div>

<div className="filter">
  <i className="fa fa-plus-circle" /> Travel Type
</div>
<div className="filter">
  <select
                        className="selector w-100"
                        value={travelType}
                        onChange={this.handleTravelTypeFilter}
                    >
    <option value="">All Tours</option>
    <option value="Day Cycle Tour">Day Cycle Tour</option>
    <option value="Walking Tour">Walking Tour</option>
    <option value="Cycling Holidays">Cycling Holidays</option>
  </select>
</div>

<div className="filter">
  <i className="fa fa-usd" /> Price Filter
</div>
<div className="filter">
                      <select
                        className="selector w-100"
    value={priceFilter}
    onChange={this.handlePriceFilter}
  >
    <option value={0}>Low - High</option>
    <option value={1}>High - Low</option>
  </select>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFilteredData(filteredData) {
    return filteredData.map((singleContent) => {
      const {
        imagewebp,
        imagejpeg,
        alt,
        location,
        duration,
        name,
        link,
        price,
      } = singleContent;

      return (
        <div className="col-lg-4 col-sm-6" key={link}>
          <div className="single-destinations-list style-two">
            <Link to={link}>
              <div className="thumb">
                <ImageLazyLoad
                  imagejpeg={imagejpeg}
                  imagewebp={imagewebp}
                  alt={alt}
                />
              </div>

              <div className="details">
                <p className="location">
                  <img
                    src={
                      "https://delhibycycle.s3.ap-south-1.amazonaws.com/1.png"
                    }
                    alt="map"
                  />
                  {location}
                </p>
                <h4 className="title">
                  <Link to={link}>{name}</Link>
                </h4>
                <p className="content">{duration}</p>
                <div className="tp-price-meta">
                  <h2>INR {price}</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
    });
  }
}

export default TourListV3;
