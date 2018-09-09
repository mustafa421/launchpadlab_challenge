import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import { Card, CardBody } from "reactstrap";

const Panel = props => {
  const { subtitle, data } = props;
  if (!data) return null;

  const columns = [
    {
      Header: "Framework",
      accessor: "framework"
    },
    {
      Header: "Stars",
      accessor: "stars"
    },
    {
      Header: "Open Issues",
      accessor: "openIssues"
    },
    {
      Header: "Forks",
      accessor: "forks"
    }
  ];
  // TODO - Add switch statement to retrieve specific components
  return (
    <div>
      <Card>
        <CardBody>
          <p>{subtitle}</p>
        </CardBody>
        <CardBody>
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={4}
            className="-striped -highlight"
            showPaginationBottom={false}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Panel;
