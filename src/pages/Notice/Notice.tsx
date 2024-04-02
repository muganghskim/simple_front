import React, { useState, useEffect } from "react";
import Header from "../Common/Header"
import axios from "axios";
// import Footer from "../Common/Footer"


interface Post {
  title: String;
  content: String;
  noticeId: number;
  noticeType: String;
  userImg: string;
  userName: string;
  createdAt: string;
}

// const posts = [
//   {
//     id: 1,
//     title: 'Boost your conversion rate',
//     href: '#',
//     description:
//       'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//     date: 'Mar 16, 2020',
//     datetime: '2020-03-16',
//     category: { title: 'Marketing', href: '#' },
//     author: {
//       name: 'Michael Foster',
//       role: 'Co-Founder / CTO',
//       href: '#',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//   },
//   // More posts...
// ]

export default function Notice() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(true); // 로딩 상태

  const [page, setPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
  const [pageSize, setPageSize] = useState(10); // 페이지 크기

  // const token = localStorage.getItem("token");

  // 전체 조회 데이터를 로딩
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // 전체 조회
  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      // `pageNumber`는 일반적으로 0부터 시작하지만,
      // UI에서 사용자에게 표시하는 페이지 번호는 1부터 시작할 수 있으므로
      // 요청을 보낼 때는 페이지 번호에서 1을 빼줘야 할 수도 있습니다.
      const params = {
        page: page, // 또는 `page: page - 1` 이 필요한 경우
        size: pageSize,
        paged: true,
        "sort.sorted": true, // 또는 false, 정렬 여부
        "sort.unsorted": false, // 또는 true, 정렬하지 않을 여부
        unpaged: false, // 페이지네이션을 사용하지 않는 경우 true
        // 추가적인 정렬 파라미터 예시: 'sort': 'createdAt,desc'
        headers: {
          // Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(
        `http://localhost:8096/api/notice/all`,
        params
      );

      setPosts(response.data.content);
      // 추가적으로, 페이징 정보 처리
      // 예: setTotalPages(response.data.totalPages);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching profits:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>

      <Header></Header>
      <div className="sm:ml-64 2xl:ml-32 mt-20 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">쇼핑몰 블로그</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              공지사항 및 이벤트를 확인하세요.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.slice().reverse().map((post) => (
              <article key={post.noticeId} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.createdAt} className="text-gray-500">
                    {post.createdAt}
                  </time>
                  <a
                    href="#"
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.noticeType}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.userImg} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {post.userName}
                      </a>
                    </p>
                    {/* <p className="text-gray-600">{post.author.role}</p> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  )
}