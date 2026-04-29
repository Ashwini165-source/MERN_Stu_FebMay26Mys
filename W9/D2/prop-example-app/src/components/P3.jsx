//Container/ Wrapper component
import { React } from "react";
//children is a special react prop
//It holds nested JSX  passes between the component tags
//It helps create reusable wrapper components
function Container({ children }) {
  return (
    <div className="card" style={{ padding: "1rem", margin: "1rem" }}>
      {children}
    </div>
  );
}
//Parent component
export function PropsChildren() {
  return (
    <>
    <Container> {/*Container here is name of child component */}
        <h3>First child element in Nested approach</h3> 
    </Container>
    </>
  );
}