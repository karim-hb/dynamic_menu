import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import allData from "./menu.json";
const Navdata = () => {
  const history = useNavigate();

  const [menuHandler, setMenuHandler] = useState({});
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
  }, [iscurrentState]);

  const genrateMenuItem = (item, level) => {
    return {
      ...item,
      click: (e) => handleMenuItemClick(e, item.id),
      stateVariables: Boolean(menuHandler[item.id]),
    };
  };

  const handleMenuItemClick = (e, itemId) => {
    e.preventDefault();
    setMenuHandler((prevState) => ({
      ...prevState,
      [itemId]: !Boolean(prevState[itemId]),
    }));
    setIscurrentState(itemId);
    updateIconSidebar(itemId);
  };

  const memoizedMenuItems = useMemo(() => {
    return allData.map((item) => {
      if (item.isHeader) {
        return item;
      } else {
        if (item.subItems.find((si) => si.childItems !== undefined)) {
          const subItems = item.subItems.map((ni) => genrateMenuItem(ni, 2));
          return { ...genrateMenuItem(item, 1), subItems };
        } else {
          return genrateMenuItem(item, 1);
        }
      }
    });
  }, [allData, menuHandler]);
  return <React.Fragment>{memoizedMenuItems}</React.Fragment>;
};
export default Navdata;
