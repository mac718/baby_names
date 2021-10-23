import React from "react";

export const RatingsContext = React.createContext();

export class RatingsProvider extends React.Component {
  render() {
    return(
      <RatingsContext.Provider value={}>
        {this.props.children}
      </RatingsContext.Provider>
    )
  }
}