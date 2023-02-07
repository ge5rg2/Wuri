import { MainContainer, Wraper, SubContainer } from "..//styles/NavStyle";
import Btn from "./common/Btn";

function Nav() {
  return (
    <Wraper>
      <MainContainer>
        <div>
          <Btn children="Login" />
          <Btn children="Register" />
        </div>
      </MainContainer>
      <SubContainer>
        <div className="subNav">
          <div className="subNavDiv">Homne</div>
          <div className="subNavDiv">Tech Resources</div>
        </div>
      </SubContainer>
    </Wraper>
  );
}

export default Nav;
