import "../index.css";

const Navbar = () => {
  return (
    <>
      <nav style={{ borderBottom: "2px solid gray", marginBottom: "20px" }}>
        <ul className="flex align-center ">
          <li className="nav bold">Task</li>
          <li className="nav">Home</li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
