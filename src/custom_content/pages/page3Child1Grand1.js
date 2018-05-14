import React from 'react';
import WcpcAssortment from '../../system/codes/WcpcAssortment'
import ShouldDisplay from '../../system/codes/ShouldDisplay'

const Page3Child1Grand1 = () => {
  return (
    <div>
      <h3>Page 3 child 1 Grand 1</h3>
      <hr/>
      <ShouldDisplay wc_section="itest1-box" ids={["Home-Networking-Orbi"]}>
        <h3>Test 1</h3>
      </ShouldDisplay>

      <WcpcAssortment ids={["Business-Networking-Smart-Managed-Switch"]}>
        <h3>Test 2</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Business-Networking-Smart-Managed-Pro-Switch"]}>
        <h3>Test 3</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Business-Networking-Access-Point"]}>
        <h3>Test 4</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Business-Networking-Network-Attached-Storage"]}>
        <h3>Test 5</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Business-Networking-Unmanaged-Switch" , "Business-Networking-Network-Attached-Storage" , "Business-Networking-Access-Point"]}>
        <h3>Test 6</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Business-Networking-Unmanaged-Switch" , "Business-Networking-Access-Point"]}>
        <h3>Test 7</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Home-Networking-Router","Business-Networking-Unmanaged-Switch"]}>
        <h3>Test 8</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Home-Networking-Router"]}>
        <h3>Test 9</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Home-Networking-Orbi"]}>
        <h3>Test 10</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Business-Networking-Unmanaged-Switch"]}>
        <h3>Test 11</h3>
      </WcpcAssortment>

      <WcpcAssortment ids={["Business-Networking-Unmanaged-Switch"]}>
        <h3>Test 12</h3>
      </WcpcAssortment>
    </div>
  );
};

export default Page3Child1Grand1;
