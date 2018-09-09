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

const issueLinks = [
  "https://api.github.com/search/issues?q=repo:facebook/react+type:issue+state:open",
  "https://api.github.com/search/issues?q=repo:angular/angular.js+type:issue+state:open",
  "https://api.github.com/search/issues?q=repo:emberjs/ember.js+type:issue+state:open",
  "https://api.github.com/search/issues?q=repo:vuejs/vue+type:issue+state:open"
];

// TODO - Finish retrieving the rest of stats + refresh -- put a react table with summary

class App extends Component {
  state = {
    // stars: [],
    // openIssues: []
    data: []
  };

  retrieveData = () => {
    console.log("Refreshed");
    const headers = new Headers();
    headers.append("Authorization", "Basic bXVzdGFmYTQyMTo1JDY5ckRFU1JzXll6"); // Better handling of authentication
    frameworks.forEach((framework, i) => {
      const frameworkObj = {};
      frameworkObj.framework = framework;

      // Get stars + forks
      fetch(links[i], { headers })
        .then(res => res.json())
        .then(body => {
          frameworkObj.stars = body.stargazers_count.toLocaleString();
          frameworkObj.forks = body.forks.toLocaleString();
        })
        .then(() => {
          // Get open issues
          fetch(issueLinks[i], { headers })
            .then(res => res.json())
            .then(body => {
              frameworkObj.openIssues = body.total_count.toLocaleString();
            })
            .then(() =>
              this.setState(prevState => {
                const copy = prevState.data.slice();
                copy[i] = frameworkObj;
                return { data: copy };
              })
            );
        });
    });
  };

  componentDidMount() {
    this.retrieveData();
    setInterval(this.retrieveData, 60000);
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
              subtitle={
                <p>
                  Listed below are the most popular Javascript frameworks on
                  Github. I've selected three different repo qualities to help
                  pick a favorite. To sort the data, simply click on any of the
                  columns.
                </p>
              }
              data={this.state.data}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
