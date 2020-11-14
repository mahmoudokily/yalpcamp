import { useState, useEffect } from "react";
import axios from "axios";
import { validationFunc } from "../helper/validationForms.js";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
function ShowCampground(props) {
  const campId = props.match.params.id;
  const [campground, setCampground] = useState({});
  const [rating, setRating] = useState(0);
  const [textComment, setTextComment] = useState("");

  useEffect(() => {
    validationFunc();
    axios.get(`/api/campgrounds/${campId}`).then((res) => {
      setCampground(res.data);
    });
  }, [campId]);
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/campgrounds/${campId}`)
      .then((res) => {
        props.history.push(`/api/campgrounds`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitReview = (e) => {
    const review = { rating, textComment };
    e.preventDefault();
    axios.post(`/api/campgrounds/${campId}/reviews`, review).then((res) => {});
  };

  return (
    <Container className="show-camp">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item
          active
          href="https://getbootstrap.com/docs/4.0/components/breadcrumb/"
        >
          {campground.title}
        </Breadcrumb.Item>
      </Breadcrumb>

      {campground && (
        <Row>
          <Col xl={7} className="cardBody">
            <Card>
              <Card.Img variant="top" src={campground.image} />
              <Card.Body>
                <div className="mar-l">
                  <Card.Title>{campground.title}</Card.Title>

                  <Card.Title className="text">{campground.price} $</Card.Title>
                </div>
                <Card.Text>{campground.description}</Card.Text>
                <div className="mar-r">
                  <a className="show-btn" href={campground._id + "/edit"}>
                    Edit
                  </a>
                  <button className="show-btn" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={5}>
            <Card>
              <Card.Body className="content">
                <hr />

                <Form
                  onSubmit={handleSubmitReview}
                  className="needs-validation"
                  noValidate
                >
                  <Form.Group controlId="formBasicRange">
                    <Form.Label>Range</Form.Label>
                    <Form.Control
                      type="range"
                      min="0"
                      max="5"
                      onChange={(e) => setRating(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      onChange={(e) => setTextComment(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="success" type="submit">
                    Add Review
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ShowCampground;
