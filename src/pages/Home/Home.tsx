import * as React from "react";
import Header from "../Common/Header";
// import Footer from "../Common/Footer";

const features = [
  { name: '지속 가능성', description: '환경을 위한 실천적 방법을 제공하여 지속 가능한 미래를 만들어갑니다.' },
  { name: '환경 보호 교육', description: '환경 보호에 대한 인식을 높이고, 지식을 나누어 더 나은 세상을 만듭니다.' },
  { name: '환경 보호 미션', description: '환경 보호 미션을 수행하고 탄소 배출 포인트를 획득합니다.' },
  { name: '탄소 배출권', description: '환경 보호 활동을 탄소 배출권으로 정량화 하여 측정할 수 있습니다.' },
  { name: '보상', description: '환경 보호 활동으로 얻은 탄소 배출 포인트로 보상을 받을 수 있습니다.' },
  { name: '커뮤니티', description: '일상에서 쉽게 실천할 수 있는 방법들과 환경 보호 미션 성공 사례들을 공유할 수 있습니다.' },
]

const Home: React.FC = () => {
  return (
    <>
      <Header></Header>
      <div className="sm:ml-64 2xl:ml-32 mt-20 bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hide Carbon</h2>
            <p className="mt-4 text-gray-500">
              탄소를 숨기다. <br></br> 안녕하세요 개발자 김현승입니다. <br></br> 현재는 가족 쇼핑몰이지만 친환경 탄소 배출 플랫폼을 목표로 하고 있습니다.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
};

export default Home;