import React, { createContext, useEffect, useState } from "react";
import { RestaurantInterface } from "../interfaces";

interface Props {
  children: React.ReactNode;
}

interface ContextData {
  restaurants: RestaurantInterface[];
  handleUpdateRestaurants: () => void;
}

export const RestaurantsContext = createContext<ContextData | null>(null);

export const RestaurantsProvider: React.FC<Props> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<RestaurantInterface[]>();

  useEffect(() => {
    fetch("http://localhost:5001/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  const handleUpdateRestaurants = () => {
    fetch("http://localhost:5001/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  };

  const contextObj: ContextData = {
    restaurants: restaurants && restaurants?.length > 0 ? restaurants : [],
    handleUpdateRestaurants,
  };

  return (
    <RestaurantsContext.Provider value={contextObj}>
      {children}
    </RestaurantsContext.Provider>
  );
};
