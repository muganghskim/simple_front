import React, { useEffect, useState } from "react";
import axios from "axios";

interface IAddr {
  address: string;
  zonecode: string;
}

declare global {
  interface Window {
    daum: any;
  }
}

interface AddrProps {
  onAddressAdded: () => void;
}

const Addr: React.FC<AddrProps> = ({ onAddressAdded }) => {
  const [userAddress, setUserAddress] = useState({
    userEmail: "rhgustmfrh@naver.com",
    userAddress1: "",
    userAddress2: "",
    userAddress3: ""
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Daum 우편번호 서비스 스크립트 로드 후 실행할 작업
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onClickAddr = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: IAddr) {
          setUserAddress({
            ...userAddress,
            userAddress1: data.address,
            userAddress2: "", // 상세주소를 여기에 추가할 수 있음
            userAddress3: data.zonecode // 우편번호를 여기에 추가할 수 있음
          });
          document.getElementById("addrDetail")?.focus();
        }
      }).open();
    } else {
      console.error("Daum Postcode service is not available.");
    }
  };

  const addUserAddress = () => {
    console.log("userAddress", userAddress);
    const handleCreateAddress = async () => {
      const responseSave = await axios.post(
        "http://localhost:8096/api/delivery/add",
        userAddress
      );
    };
    handleCreateAddress();
    onAddressAdded();
    // axios
    //   .post("http://localhost:8096/api/delivery/add", userAddress)
    //   .then((response) => {
    //     console.log("User address added successfully.");
    //     // 추가적인 처리가 필요한 경우 여기에 작성
    //   })
    //   .catch((error) => {
    //     console.error("Error adding user address:", error);
    //   });
  };

  return (
    <>
      <div className="ml-64 space-y-12 pr-12">
        <div className="border-b border-gray-900/10 pb-12">
          <button onClick={onClickAddr}>배송지 추가</button>
          <input
            id="zipNo"
            type="text"
            readOnly
            value={userAddress.userAddress3}
          />
          <input
            id="addr"
            type="text"
            readOnly
            value={userAddress.userAddress1}
            onClick={onClickAddr}
          />
          <input
            id="addrDetail"
            type="text"
            value={userAddress.userAddress2}
            onChange={(e) =>
              setUserAddress({ ...userAddress, userAddress2: e.target.value })
            }
          />
          <button onClick={addUserAddress}>저장</button>
        </div>
      </div>
    </>
  );
};

export default Addr;
