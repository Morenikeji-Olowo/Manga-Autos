import { useState } from "react";
import { Link } from "react-router-dom";
import "./Listings.css"; 
import car1 from "../assets/2025_08_04_15_07_IMG_0855.JPG";
import car2 from "../assets/2025_08_04_16_43_IMG_0869.JPG";
import car3 from "../assets/2025_08_04_16_45_IMG_0870.JPG";


// (Later we can move this to a separate file or API)
const carsData = [
  {
    id: "car-1",
    name: "2019 Toyota Land cruiser",
    price: "₦150,000,000",
    year: 2019,
    model: "Land cruiser",
    image: car1,
  },
  {
    id: "car-2",
    name: "2022 Toyota Hilux",
    price: "₦90,000,000",
    year: 2022,
    model: "Hilux",
    image: car2,
  },
  {
    id: "car-3",
    name: "Mercedes Benz C400",
    price: "₦41,000,000",
    year: 2016,
    model: "C400",
    image: car3,
  },
];

export default function Listings() {
  const [cars, setCars] = useState(carsData);

  const [filters, setFilters] = useState({
    search: "",
    price: "all",
    year: "all",
    model: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState("asc");

  // 🔍 FILTER + SORT LOGIC
  const filterCars = () => {
    let filtered = [...carsData];

    if (filters.search) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          car.model.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.year !== "all") {
      const [min, max] = filters.year.split("-");
      filtered = filtered.filter(
        (car) => car.year >= Number(min) && car.year <= Number(max)
      );
    }

    if (filters.model) {
      filtered = filtered.filter((car) =>
        car.model.toLowerCase().includes(filters.model.toLowerCase())
      );
    }

    // Sort by price (basic numeric extraction)
    if (sort === "asc") {
      filtered.sort(
        (a, b) =>
          Number(a.price.replace(/[^0-9]/g, "")) -
          Number(b.price.replace(/[^0-9]/g, ""))
      );
    } else {
      filtered.sort(
        (a, b) =>
          Number(b.price.replace(/[^0-9]/g, "")) -
          Number(a.price.replace(/[^0-9]/g, ""))
      );
    }

    setCars(filtered);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <span className="title">Car Listings</span>

        {/* Hamburger (mobile only via CSS) */}
        <button className="menu-icon" onClick={() => setShowModal(true)}>
          ☰
        </button>

        {/* Dropdown */}
        {showModal && (
          <div className="dropdown-menu show">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>My Account</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
      </header>

      {/* FILTER BAR */}
      <div className="filter-sort-bar">
        <button onClick={() => setShowModal(true)}>Filter</button>

        <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
          Sort
        </button>
      </div>

      {/* GRID */}
      <div className="car-grid-container">
        {cars.map((car) => (
          <Link
            to={`/car/${car.id}`}
            key={car.id}
            className="car-card"
          >
            <img src={car.image} alt={car.name} />

            <div className="car-card-content">
              <h3>{car.name}</h3>
              <p>Model: {car.model}</p>
              <p>Year: {car.year}</p>
              <span className="price">{car.price}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/listings" className="nav-item active">
          Listings
        </Link>
        <Link to="/about" className="nav-item">
          Contact
        </Link>
      </nav>

      {/* FILTER MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Filter Cars</h4>

            <input
              placeholder="Search"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            <select
              onChange={(e) =>
                setFilters({ ...filters, year: e.target.value })
              }
            >
              <option value="all">All Years</option>
              <option value="2020-2024">2020 - 2024</option>
              <option value="2015-2019">2015 - 2019</option>
            </select>

            <input
              placeholder="Model"
              onChange={(e) =>
                setFilters({ ...filters, model: e.target.value })
              }
            />

            <button
              onClick={() => {
                filterCars();
                setShowModal(false);
              }}
            >
              Show Results
            </button>

            <button
              onClick={() => {
                setFilters({
                  search: "",
                  price: "all",
                  year: "all",
                  model: "",
                });
                setCars(carsData);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}