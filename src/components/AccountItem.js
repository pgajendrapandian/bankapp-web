import React from "react";
import classes from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { upperFirst } from "lodash";

const AccountItem = (props) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`${props.id}`, { replace: true });
  };
  const sectionClasses = `${classes["accounts-section-item"]} ${
    props.isTitle ? classes["account-title-item"] : ""
  }`;
  const nameClasses = `${[
    classes["account-section-fields"],
    classes["account-name"],
  ].join(" ")} ${props.isTitle ? classes["account-title"] : ""}`;
  const othersClasses = `${[
    classes["account-section-fields"],
    classes["account-others"],
  ].join(" ")} ${props.isTitle ? classes["account-title"] : ""}`;
  return (
    <li className={sectionClasses} onClick={onClickHandler}>
      <div className={nameClasses}>{upperFirst(props.name)}</div>
      <div className={othersClasses}>{props.loanAmount}</div>
      <div className={othersClasses}>{props.outStandingAmount}</div>
      <div className={othersClasses}>{props.interestAmount}</div>
    </li>
  );
};

export default AccountItem;
