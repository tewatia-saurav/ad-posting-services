import React from "react";
import { Card, Button } from "react-bootstrap";
import { ADPROPS } from "./models";
import "./styles.scss";

const AdTile = (props: ADPROPS) => {
  const { title, category, description, img, price, _id } = props;

  const handleDelete = () => {
    props?.handleDelete(_id);
  };
  return (
    <Card className="card_container">
      <Card.Img
        variant="top"
        className="card_image"
        src={img}
        alt="loading error"
      />

      <Card.Body className="card_body">
        <Card.Title className="card_title">{title}</Card.Title>
        <Card.Text className="card_description">{description}</Card.Text>
        {props.enableDelete && <Button onClick={handleDelete}>Delete</Button>}
      </Card.Body>
      <div className="card_item card_item_category">{category}</div>
      <div className="card_item card_item_price">₹ {price}</div>
    </Card>
  );
};

export default AdTile;
