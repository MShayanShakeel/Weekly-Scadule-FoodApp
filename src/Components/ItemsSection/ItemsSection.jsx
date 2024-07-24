import React, { useContext, useEffect, useState } from "react";
import "./ItemsSection.css";
import { HandleApi } from "../../Services/Api";
import { Link, useParams } from "react-router-dom";
import Modal from "../../Utily/Modal";
import { GlobalContext } from "../../Store/GlobalContext";

const ItemsSection = () => {
  const { id } = useParams();

  const [itemValues, setItemValues] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState([]);
  const [getCardId, setGetCardId] = useState([]);
  const [combinedState, setCombinedState] = useState({
    selectedWeek: "",
    getCardId: {},
  });
  const [dataArray, setDataArray] = useState([]);

  const {
    // selectedWeek,
    // setSelectedWeek,
    // getCardId,
    // setGetCardId,
    // storeAllValue,
    // setStoreAllValue,
    globallyStore,
    setGloballyStore,
  } = useContext(GlobalContext);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleCardClick = (recipe) => {
    setSelectedCardId(recipe.id);
    setGetCardId(recipe);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setSelectedWeek(id);
  }, [id]);

  // localStorage.setItem("selectedWeek", JSON.stringify(selectedWeek));
  // localStorage.setItem("getCardId", JSON.stringify(getCardId));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await HandleApi();
        setItemValues(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedWeek(selectedValue);
  };


  useEffect(() => {
    setCombinedState({
      selectedWeek: selectedWeek,
      getCardId: getCardId,
    });
  }, [selectedWeek]);

  useEffect(() => {
    if (
      combinedState.selectedWeek &&
      Object.keys(combinedState.getCardId).length > 0
    ) {
      setDataArray((prevArray) => [...prevArray, combinedState]);
    }
  }, [combinedState]);

  useEffect(() => {
    setGloballyStore(dataArray);
  }, [dataArray]);

  // TRIM TEXT LOGIC

  // storage logic
  // if (selectedWeek === "week1") {
  //   localStorage.setItem("selectedWeek", JSON.stringify(selectedWeek));
  //   localStorage.setItem("getCardId", JSON.stringify(getCardId));
  // } else if (selectedWeek === "week2") {
  //   localStorage.setItem("selectedWeek1", JSON.stringify(selectedWeek));
  //   localStorage.setItem("getCardId1", JSON.stringify(getCardId));
  // } else if (selectedWeek === "week3") {
  //   localStorage.setItem("selectedWeek2", JSON.stringify(selectedWeek));
  //   localStorage.setItem("getCardId2", JSON.stringify(getCardId));
  // } else if (selectedWeek === "week4") {
  //   localStorage.setItem("selectedWeek3", JSON.stringify(selectedWeek));
  //   localStorage.setItem("getCardId3", JSON.stringify(getCardId));
  // }

  const handleWorkdstrim = (instructions, wordLimit) => {
    const words = instructions.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "....";
    }
    return instructions;
  };

  console.log(
    dataArray,
    "mergedValues",
    // combinedState,
    "lkgsfiuwe",
    globallyStore
  );
  return (
    <>
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>SELECT YOUR WEEKLY MEAL</h2>
          <span className="Model-span">
            <select
              className="model-selecter"
              value={selectedWeek}
              onChange={handleChange}
            >
              <option value="">Select Week</option>
              <option value="week1">Week 1</option>
              <option value="week2">Week 2</option>
              <option value="week3">Week 3</option>
              <option value="week4">Week 4</option>
            </select>

            <button className="model-selecter" onClick={closeModal}>
              Save
            </button>
          </span>
        </Modal>
      </div>

      <div className="ItemsSection-Main">
        <h1>Weeek Orders</h1>
        <div className="ItemsSection-List">
          <ul>
            <li>
              <Link to="/">All Meals</Link>
            </li>
            <li>
              {" "}
              <Link to="/Week1/:week">Week1</Link>
            </li>
            <li>
              <Link to="/Week2/:week">Week2</Link>
            </li>
            <li>
              <Link to="/Week3/:week">Week3</Link>
            </li>
            <li>
              <Link to="/Week4/:week">Week4</Link>
            </li>
            <button className="model-selecter" onClick={openModal}>
              Open Modal
            </button>
          </ul>
        </div>
        <div className="ItemsSection-Cards">
          {itemValues.recipes && itemValues.recipes.length > 0 ? (
            itemValues.recipes.map((recipe, index) => (
              <div
                className={`card ${
                  selectedCardId === recipe.id ? "selected" : ""
                }`}
                onClick={() => handleCardClick(recipe)}
                key={index}
              >
                <img src={recipe.image} alt="pizzaimg1" />
                <div className="container">
                  <h4>
                    <b>{recipe.name}</b>
                  </h4>

                  {/* <p>{recipe.instructions}</p> */}
                  <p>{handleWorkdstrim(recipe.instructions.join(" "), 45)}</p>

                  <div className="rating-section">
                    <span>
                      {" "}
                      <b>cuisine</b>
                      <p>{recipe.cuisine}</p>
                    </span>

                    <span>
                      {" "}
                      <b>rating:</b>
                      <p>{recipe.rating}</p>
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemsSection;
