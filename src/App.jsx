import Week1 from "./AllWeekList/Week1";
import Week2 from "./AllWeekList/Week2";
import Week3 from "./AllWeekList/Week3";
import Week4 from "./AllWeekList/Week4";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Utily/Layout";
import ItemsSection from "./Components/ItemsSection/ItemsSection";
import { GlobalProvider } from "./Store/GlobalContext";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ItemsSection />} />
              <Route path="/Week1/:id" element={<Week1 />} />
              <Route path="/Week2/:id" element={<Week2 />} />
              <Route path="/Week3/:id" element={<Week3 />} />
              <Route path="/Week4/:id" element={<Week4 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
