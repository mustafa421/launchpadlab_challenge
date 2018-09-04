import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Panel from "./components/Panel.js";
import "./App.css";

const frameworks = ["React", "Angular", "Ember", "Vue"];
const links = [
  "https://api.github.com/repos/facebook/react",
  "https://api.github.com/repos/angular/angular.js",
  "https://api.github.com/repos/emberjs/ember.js",
  "https://api.github.com/repos/vuejs/vue"
];

// TODO - Finish retrieving the rest of stats + refresh -- put a react table with summary

class App extends Component {
  state = {
    stars: []
  };

  componentDidMount() {
    // Get stars
    const headers = new Headers();
    headers.append("Authorization", "Basic bXVzdGFmYTQyMTo1JDY5ckRFU1JzXll6");
    links.forEach((link, i) => {
      fetch(link, { headers })
        .then(res => res.json())
        .then(body => {
          this.setState(prevState => {
            const copy = prevState.stars.slice();
            copy[i] = body.stargazers_count;
            return { stars: copy };
          });
        });
    });
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h2 className="display-4" style={{ textAlign: "center" }}>
              Comparing popular Javascript Frameworks
            </h2>
            <br />
            <h5>This page refreshes every 2 minutes</h5>
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
              data={this.state.stars}
              frameworks={frameworks}
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
