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

  const userYn = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const deliveryData = {
    userEmail: userYn
  };

  const [userAddress, setUserAddress] = useState({
    userEmail: deliveryData.userEmail,
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

  const addUserAddress = async () => {

    // 필수 필드가 비어 있는지 검사
    if (!userAddress.userAddress1 || !userAddress.userAddress2 || !userAddress.userAddress3) {
      window.alert("배송지 정보를 넣어주세요");
      // 필수 필드가 비어 있으면, 여기서 함수 실행을 중단
      return;
    }
    console.log("userAddress", userAddress);
    const handleCreateAddress = async () => {
      const responseSave = await axios.post(
        "http://localhost:8096/api/delivery/add",
        userAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
   
      );
      console.log("User address added successfully.");
    // 주소 추가 완료 후 onAddressAdded 콜백 호출
    onAddressAdded();

    };
    
    handleCreateAddress();
    
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
      <div className="sm:ml-64 2xl:ml-32 mt-20 space-y-12 pr-12">
        <div className="border-b border-gray-900/10 pb-12">
          <button
            className="mt-8 text-base font-semibold leading-7 text-gray-900"
            onClick={onClickAddr}
          >
            배송지 추가
          </button>

          <input
            className="border-b border-gray-900/10 pb-1 ml-8 mr-8 w-72"
            id="addr"
            type="text"
            placeholder="도로명/지번"
            readOnly
            required
            value={userAddress.userAddress1}
            onClick={onClickAddr}
          />

          <input
            className="border-b border-gray-900/10 pb-1 mr-8 w-24"
            id="zipNo"
            type="text"
            placeholder="우편번호"
            readOnly
            required
            value={userAddress.userAddress3}
          />

          <input
            className="border-b border-gray-900/10 pb-1 mr-12 w-72"
            id="addrDetail"
            type="text"
            placeholder="상세주소"
            value={userAddress.userAddress2}
            required
            onChange={(e) =>
              setUserAddress({ ...userAddress, userAddress2: e.target.value })
            }
          />

          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={addUserAddress}
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
};

export default Addr;
