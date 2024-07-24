import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "../Utily/Modal";
import { GlobalContext } from "../Store/GlobalContext";

const Week4 = () => {
  const { id } = useParams();

  const { globallyStore, setGloballyStore } = useContext(GlobalContext);
  const [selectedWeek, setSelectedWeek] = useState([]);
  const [deletIDStore, setDeletIDStore] = useState("");

  // MODEL CODE LLOGIC START
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletModalOpen, setDeletIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    setDeletIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeletIsModalOpen(false);
  };
  // MODEL CODE LLOGIC END

  useEffect(() => {
    setSelectedWeek(id);
  }, [id]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedWeek(selectedValue);
  };

  const handleDelete = () => {
    const updatedGloballyStore = globallyStore.filter(
      (item) => item.getCardId.id !== deletIDStore
    );

    setGloballyStore(updatedGloballyStore);
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

      <div>
        <Modal isOpen={deletModalOpen} onClose={closeModal}>
          <h2>Your Want to delet this iitem</h2>
          <span className="Model-span">
            <button
              className="model-selecter"
              onClick={() => {
                handleDelete();
                closeModal();
              }}
            >
              YES
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
          {Array.isArray(globallyStore) && globallyStore.length > 0 ? (
            globallyStore
              .filter((recipe) => recipe?.selectedWeek === "week1")
              .map((recipe, index) => (
                <div
                  onClick={() => setGetCardId(recipe)}
                  key={index}
                  className="card"
                >
                  {console.log(recipe?.getCardId, "shayan")}
                  <img src={recipe?.getCardId?.image} alt="recipe img" />
                  <div className="container">
                    <h4>
                      {/* {console.log(recipe, "recipe")} */}
                      <b>{recipe?.getCardId?.name}</b>
                    </h4>
                    <p>{recipe?.getCardId?.instructions}</p>
                    <div className="rating-section">
                      <span>
                        <b>Cuisine:</b>
                        <p>{recipe?.getCardId?.cuisine}</p>
                      </span>
                      <span>
                        <b>Rating:</b>
                        <p>{recipe?.getCardId?.rating}</p>
                        {console.log(
                          recipe?.getCardId?.id,
                          "recipe?.getCardId?.id"
                        )}
                      </span>
                    </div>
                    <button
                      className="model-selecter delete-button"
                      onClick={() => {
                        const id = recipe?.getCardId?.id;
                        setDeletIDStore(id);
                        openModal();
                      }}
                    >
                      DELETE THIS MEAL
                    </button>
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

export default Week4;
