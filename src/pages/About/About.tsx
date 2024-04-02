import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import * as React from "react";
import Header from "../Common/Header"

const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

const milestones = [
  {
    year: "2024/05",
    event: "회사 설립 및 첫 제품 출시",
    icon: "🚀",
  },
  {
    year: "2024/08",
    event: "hide carbon 기획 및 개발",
    icon: "📜",
  },
  {
    year: "2024/11",
    event: "hide carbon 프로토타입 출시",
    icon: "🌍",
  },
  {
    year: "2025/01",
    event: "hide carbon 오픈 베타",
    icon: "👥",
  }
];


export default function About() {
  return (
    <>
      <Header />
      <div className="sm:ml-64 2xl:ml-32 mt-20 overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">우리의 마일스톤</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">친환경 혁신의 여정</p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  혁신과 탁월함에 대한 우리의 의지를 반영하는 중요한 이정표가 우리 여정의 모든 단계를 장식했습니다. 초라한 시작부터 업계 선두주자가 되기까지, 우리는 환경이라는 가치를 통해 성장할 것입니다.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {milestones.map((milestone) => (
                    <div key={milestone.year} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <span className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true">
                          {milestone.icon}
                        </span>
                        {milestone.year}
                      </dt>{' '}
                      <dd className="inline">{milestone.event}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              src="img/milestone.jpg"
              alt="Milestone timeline"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>

    </>
  )
}