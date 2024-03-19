import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import axios from "axios";
import Calendar from "../Common/Calendar";
// todo 월별, 일별, 페이징
const years = Array.from(
  new Array(20),
  (val, index) => new Date().getFullYear() - index
);
const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];

interface Profit {
  plId: number;
  profit: number;
  createdAt: String;
}

export default function Profit() {
  const isAdmin = localStorage.getItem("isAdmin");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [showCalendar, setShowCalendar] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [profits, setProfits] = useState<Profit[]>([]); // 수익 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  const [page, setPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
  const [pageSize, setPageSize] = useState(10); // 페이지 크기

  const token = localStorage.getItem("token");

  // 전체 조회 데이터를 로딩
  useEffect(() => {
    fetchAllProfits();
  }, []);

  // 전체 조회
  const fetchAllProfits = async () => {
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
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(
        `http://localhost:8096/admin/all`,
        params
      );

      setProfits(response.data.content);
      // 추가적으로, 페이징 정보 처리
      // 예: setTotalPages(response.data.totalPages);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching profits:", error);
    } finally {
      setLoading(false);
    }
  };

  // 월별 조회
  const fetchProfitsByMonth = async () => {
    if (!selectedMonth || !selectedYear) return;
    setLoading(true);
    try {
      const params = {
        page: page, // 또는 `page: page - 1` 이 필요한 경우
        size: pageSize,
        paged: true,
        "sort.sorted": true, // 또는 false, 정렬 여부
        "sort.unsorted": false, // 또는 true, 정렬하지 않을 여부
        unpaged: false, // 페이지네이션을 사용하지 않는 경우 true
        // 추가적인 정렬 파라미터 예시: 'sort': 'createdAt,desc'
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(
        `http://localhost:8096/admin/month/${selectedYear}/${selectedMonth}`,
        params
      );
      setProfits(response.data.content);
    } catch (error) {
      console.error("Error fetching monthly profits:", error);
    } finally {
      setLoading(false);
    }
  };

  // 일별 조회
  const fetchProfitsByDay = async () => {
    if (!selectedDate) return;

    // 'YYYY-MM-DD' 형식으로 포맷된 날짜에서 연도, 월, 일 추출
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const day = selectedDate.getDate();

    setLoading(true);
    try {
      const params = {
        page: page, // 또는 `page: page - 1` 이 필요한 경우
        size: pageSize,
        paged: true,
        "sort.sorted": true, // 또는 false, 정렬 여부
        "sort.unsorted": false, // 또는 true, 정렬하지 않을 여부
        unpaged: false, // 페이지네이션을 사용하지 않는 경우 true
        // 추가적인 정렬 파라미터 예시: 'sort': 'createdAt,desc'
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(
        `http://localhost:8096/admin/day/${year}/${month}/${day}`,
        params
      );
      setProfits(response.data.content); // 페이지네이션된 응답에서 실제 데이터 부분
      // 필요한 경우 추가 페이징 정보 처리
      //   setTotalPages(response.data.totalPages); // 예시: 총 페이지 수 설정
    } catch (error) {
      console.error("Error fetching daily profits:", error);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
    fetchAllProfits(); // 새 페이지 번호로 데이터 다시 조회
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false); // 날짜를 선택하면 캘린더 숨기기
    // 추가적으로 선택된 날짜를 처리하는 로직
  };

  const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    setShowMonthPicker(false); // 월을 선택하면 월 선택기 숨기기
    // 추가적으로 선택된 월을 처리하는 로직
  };

  const handleYearSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  // 관리자 여부에 따라 다른 컴포넌트 렌더링
  if (isAdmin === "false" || isAdmin === null) {
    // 관리자가 아닌 경우
    // 리다이렉트하거나 관리자가 아니라는 메시지를 표시
    window.location.href = "/signin"; // 로그인 페이지로 리다이렉트
    // 리다이렉트하는 경우 아래 리턴문은 필요 없지만, 예시를 위해 포함
    return <div>관리자만 접근 가능합니다.</div>;
  }

  return (
    <>
      <Header></Header>

      <div className="ml-64 space-y-12 pr-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">
            수익 관리
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            쇼핑몰을 이용하면서 생기는 수익을 조회할 수 있습니다.
          </p>

          <div className="flex">
            {/* 월별 조회 선택 필드 */}
            <div className="relative mt-2 mr-12 space-y-1">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="month"
              >
                월별 조회
              </label>
              <div className="flex space-x-2">
                <select
                  name="year"
                  onChange={handleYearSelect}
                  value={selectedYear}
                  className="border border-gray-300 rounded-md p-2 cursor-pointer"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  onChange={handleMonthSelect}
                  value={selectedMonth}
                  className="border border-gray-300 rounded-md p-2 cursor-pointer"
                  onMouseEnter={() => setShowMonthPicker(true)}
                >
                  <option value="">월 선택...</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 입력 필드 */}
            <div className="relative mt-2 space-y-1 pr-12">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="day"
              >
                일별 조회
              </label>
              <input
                type="text"
                name="day"
                readOnly
                value={selectedDate ? selectedDate.toDateString() : ""}
                onMouseEnter={() => setShowCalendar(true)}
                className="border border-gray-300 rounded-md p-2 w-72 cursor-pointer"
                placeholder="날짜 선택..."
              />
              {showCalendar && (
                <div
                  className="absolute top-full mt-1 z-10"
                  onMouseLeave={() => setShowCalendar(false)}
                >
                  <Calendar onDateSelect={handleDateSelect} />
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* 데이터 로딩 및 테이블 렌더링 */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="sm:col-span-4">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          PL ID
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Profit
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {profits.map((profit) => (
                        <tr key={profit.plId}>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {profit.plId}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {profit.profit}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {profit.createdAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* <div className="sm:col-span-4">
                  <button
                    onClick={() =>
                      setPage((prevPage) => Math.max(prevPage - 1, 0))
                    }
                    disabled={page === 0}
                    className="px-4 py-2 border rounded-md"
                  >
                    Prev
                  </button>
                  <span>Page {page + 1}</span>
                  <button
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                    className="px-4 py-2 border rounded-md"
                  >
                    Next
                  </button>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
