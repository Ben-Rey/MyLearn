import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class Modals extends Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        dimmer={"blurring"}
        size="large"
        style={{
          height: "auto",
          left: "50%",
          top: "50%",
          transform: " translate(-50%, -50%)"
        }}
      >
        <Modal.Header>
          Video Title{" "}

            <Button onClick={() => this.props.handleModalVisibility(false)} floated='right' circular icon='close'/>
            

        </Modal.Header>
        <Modal.Content>{this.props.children}</Modal.Content>
      </Modal>
    );
  }
}

export default Modals;
