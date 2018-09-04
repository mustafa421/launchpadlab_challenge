import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer
} from "victory";

import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const Panel = props => {
  const { title, subtitle, data, frameworks } = props;
  if (!data) return null;

  // TODO - Add switch statement to retrieve specific components
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
        </CardBody>
        <CardBody>
          <VictoryChart
            domainPadding={20}
            // containerComponent={<VictoryZoomContainer />}
          >
            <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={frameworks} />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={x => `${x / 1000}k`}
            />
            <VictoryBar
              data={data.map((stars, index) => ({ x: index + 1, y: stars }))}
            />
          </VictoryChart>
        </CardBody>
      </Card>
    </div>
  );
};

export default Panel;
