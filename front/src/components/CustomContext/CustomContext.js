import React from "react";
import "./CustomContext.scss";

class CustomContext extends React.Component {
  
  render() {
    const ContenairStyle = {  
      visibility: this.props.visible ? "visible" : "hidden",
    };

    const contextStyle = {
      top: this.props.position.Y,
      left: `${this.props.position.X + 5}px`,
      visibility: this.props.visible ? "visible" : "hidden",
    };

    return (
      <div
        className="custom-context-container"
        style={ContenairStyle}
        onClick={e => this.props.hideContext(e)}
        onContextMenu={e => this.props.hideContext(e)}
      >
        <div className="custom-context" id="text" style={contextStyle}>
          {this.props.items.map((item, index, arr) => {
            return (
              <div key={index} className="custom-context-item" value={item.label} onClick={()=>this.props.itemClick(item.label)}>
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CustomContext;
