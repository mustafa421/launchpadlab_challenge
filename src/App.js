import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Panel from "./components/Panel.js";
import "./App.css";

const frameworks = ["React", "Angular", "Ember", "Vue"];

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h2 className="display-4" style={{ textAlign: "center" }}>
              Comparing popular Javascript Frameworks
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Panel
              title={"Commits"}
              subtitle={
                "Commit activity gives us insight on project development"
              }
            />
            <Panel
              title={"Stars"}
              subtitle={"Star count could indicate favorability of the project"}
            />
            <Panel
              title={"Issue ratio"}
              subtitle={
                "Number of issues raised vs issues closed could forecast how quickly bugs are fixed"
              }
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
