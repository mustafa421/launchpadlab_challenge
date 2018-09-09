import React, { Component } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
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

class App extends Component {
  state = {
    time: 0,
    data: []
  };

  retrieveData = () => {
    this.setState(() => ({ time: new Date().toTimeString() }));

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
            <h5>This page updates every minute</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Panel
              subtitle={
                <div>
                  <p>
                    Listed below are the most popular Javascript frameworks on
                    Github. I've selected three different repo qualities to help
                    pick a favorite. To sort the data, simply click on any of
                    the columns. Here is why I selected the following 3
                    categories:
                  </p>
                  <br />
                  <ul style={{ textAlign: "left" }}>
                    <li>
                      Stars - This gives us a hint on general favorability of
                      the project
                    </li>
                    <li>
                      Forks - Larger projects are usually read-only and are not
                      directly editable by the general public. In order to
                      introduce changes to the code base, a person has to fork.
                      A high number of forks may correlate with a higher
                      contribution count.
                    </li>
                    <li>
                      Open Issues - Issues could give us insight on the
                      stability of the project. Thus, many open issues could
                      correlate with more bugs.
                    </li>
                  </ul>
                </div>
              }
              data={this.state.data}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Alert color="warning">Last refresh on {this.state.time}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
