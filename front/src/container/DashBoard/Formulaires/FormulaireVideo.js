import React from "react";
import { Form } from "semantic-ui-react";
import classes from "./Formulaire.module.scss";
import Background from "../../../assets/DashBoard/DashBoardVideoBack.jpg";

const FormulaireVideo = props => {
  // Declare a new state variable, which we'll call "count"
  //   const [count, setCount] = useState(0);
  var sectionStyle = {
    backgroundImage: "url(" + Background + ")",
    backgroundSize: "cover"
  };
  return (
    <div className={classes.globalContainer} style={sectionStyle} id={props.id}>
      <Form
        className={classes.AllFormulaire}
        style={{ backgroundColor: "#ffffffbf" }}
      >
        <Form.Group widths="equal">
          <Form.Input fluid label="Video" placeholder="First name" />
          <Form.Input fluid label="Last name" placeholder="Last name" />
          {/* <Form.Select
            fluid
            label="Gender"
            // options={options}
            placeholder="Gender"
          /> */}
        </Form.Group>
        <Form.Group inline>
          <label>Size</label>
          <Form.Radio
            label="Small"
            value="sm"
            // checked={value === "sm"}
            // onChange={this.handleChange}
          />
          <Form.Radio
            label="Medium"
            value="md"
            // checked={value === "md"}
            // onChange={this.handleChange}
          />
          <Form.Radio
            label="Large"
            value="lg"
            // checked={value === "lg"}
            // onChange={this.handleChange}
          />
        </Form.Group>
        <Form.TextArea label="About" placeholder="Tell us more about you..." />
        <Form.Checkbox label="I agree to the Terms and Conditions" />
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
};

export default FormulaireVideo;
