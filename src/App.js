import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { CardContent } from "../node_modules/@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./App.css";

const frameworks = ["React", "Angular", "Ember", "Vue"];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Card className={{ minWidth: 275, height: 140 }}>
          <CardContent>
            {frameworks.map(framework => (
              <Typography variant="title" gutterBottom>
                {framework}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;
