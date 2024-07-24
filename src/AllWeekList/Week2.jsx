import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "../Utily/Modal";
import { GlobalContext } from "../Store/GlobalContext";

const Week2 = () => {
  const { id } = useParams();

  const { selectedWeek, setSelectedWeek, getCardId, setGetCardId } =
    useContext(GlobalContext);

    // MODEL CODE LLOGIC START
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
// MODEL CODE LLOGIC END
  useEffect(() => {
    setSelectedWeek(id);
  }, [id]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedWeek(selectedValue);
  };
  const savedItemValues = localStorage.getItem("selectedWeek1");
  const savedGetCardId = localStorage.getItem("getCardId1");

  const safeParseJSON = (data) => {
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  const parsedItemValues = safeParseJSON(savedItemValues);
  const parsedGetCardId = safeParseJSON(savedGetCardId);

  const recipesArray = Array.isArray(parsedGetCardId)
    ? parsedGetCardId
    : [parsedGetCardId];

  const handleRemoveitem = () => {
    if (parsedItemValues === "week2") {
      localStorage.removeItem("getCardId1");
      localStorage.removeItem("selectedWeek1");
    } else {
      console.log("something is want to Wrong");
    }
  };

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
              <option value="" disabled>
                Select Week
              </option>
              <option value="week1">Week 1</option>
              <option value="week2">Week 2</option>
              <option value="week3">Week 3</option>
              <option value="week4">Week 4</option>
            </select>

            <button className="model-selecter">Save</button>
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
              <Link to="/Week1/:week">Week 1</Link>
            </li>
            <li>
              <Link to="/Week2/:week">Week 2</Link>
            </li>
            <li>
              <Link to="/Week3/:week">Week 3</Link>
            </li>
            <li>
              <Link to="/Week4/:week">Week 4</Link>
            </li>
            <button className="model-selecter" onClick={openModal}>
              Open Modal
            </button>
          </ul>
        </div>
        <div className="ItemsSection-Cards">
          {parsedItemValues === "week2" ? (
            Array.isArray(recipesArray) && recipesArray.length > 0 ? (
              recipesArray.map((recipe, index) => (
                <div
                  onClick={() => {
                    setGetCardId(recipe);
                  }}
                  key={index}
                  className="card"
                >
                  <img src={recipe?.image} alt="recipe img" />
                  <div className="container">
                    <h4>
                      {console.log(recipe, "recipe")}
                      <b>{recipe?.name}</b>
                    </h4>

                    <p>{recipe?.instructions.join(" ")}</p>

                    <div className="rating-section">
                      <span>
                        <b>Cuisine:</b>
                        <p>{recipe?.cuisine}</p>
                      </span>

                      <span>
                        <b>Rating:</b>
                        <p>{recipe?.rating}</p>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No recipes available.</p>
            )
          ) : (
            <p>No recipes available  in Week 2.</p>
          )}
        </div>
        <button className="model-selecter" onClick={handleRemoveitem}>
          DELETE THIS MEAL
        </button>
      </div>
    </>
  );
};

export default Week2;
