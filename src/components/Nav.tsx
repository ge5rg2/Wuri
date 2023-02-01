import { MainContainer, Wraper, SubContainer } from "..//styles/NavStyle";
import Btn from "./common/Btn";

function Nav() {
  return (
    <Wraper>
      <MainContainer>
        <div>
          <img
            src="https://partnerhub.samsung.com/resource/1524249349000/samsungLogo"
            alt="Samsung"
            data-aura-rendered-by="242:789;a"
          />
        </div>
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
