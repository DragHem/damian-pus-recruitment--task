import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { withRouter } from "react-router-dom";

export const withQuery = (ComponentToWrap, query) => {
  class WithQuery extends Component {
    render() {
      const [key] = Object.keys(this.props.match.params);

      const param = this.props.match.params[key];

      return (
        <Query query={query(param)} fetchPolicy={"no-cache"}>
          {({ loading, error, data }) => {
            if (loading) return;
            // if (error) return <p>Something gone wrong...</p>;

            return <ComponentToWrap data={data} error={error} />;
          }}
        </Query>
      );
    }
  }

  return withRouter(WithQuery);
};
