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
  salaries: number;
  bills: number;
  taxes: number;
  refund: number;
  createdAt: String;
}

interface ProfitData {
  totalProfit: number;
  monthProfit: number;
  dayProfit: number;
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
  const [profitData, setProfitData] = useState<ProfitData| null>(null); // 수익 통계 데이터 
  const [loading, setLoading] = useState(true); // 로딩 상태

  const [page, setPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
  const [pageSize, setPageSize] = useState(5); // 페이지 크기
  const [pageGroupStart, setPageGroupStart] = useState(0); // 현재 페이지 그룹의 시작 페이지 번호

  const [mpage, setMpage] = useState(0); 
  const [mpageSize, setMpageSize] = useState(5); 
  const [mpageGroupStart, setMpageGroupStart] = useState(0); 

  const [dpage, setDpage] = useState(0); 
  const [dpageSize, setDpageSize] = useState(5); 
  const [dpageGroupStart, setDpageGroupStart] = useState(0); 

  const [activeView, setActiveView] = useState('all'); // 'all', 'mon', 'day'


  const token = localStorage.getItem("token");

  // 통계 데이터 로딩
  useEffect(() => {
    fetchProfitData();
  }, []);

  // 전체 조회 데이터를 로딩
  useEffect(() => {
    fetchAllProfits();
  }, [page]);

  useEffect(() => {
    fetchProfitsByMonth();
  }, [selectedMonth, selectedYear, mpage]); // selectedMonth와 selectedYear가 변경될 때마다 실행

  useEffect(() => {
    fetchProfitsByDay();
  }, [selectedDate, dpage]); // selectedDate가 변경될 때마다 실행

  const fetchProfitData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8096/admin/profit/data`,{
        headers: { // 헤더는 여기에
          Authorization: `Bearer ${token}`
        }
      })
      setProfitData(response.data);
    } catch (error) {
      console.error("Error fetching monthly profits:", error);
    } finally {
      setLoading(false);
    }
  }

  // 전체 조회
  const fetchAllProfits = async () => {
    setLoading(true);
    try {
      // `pageNumber`는 일반적으로 0부터 시작하지만,
      // UI에서 사용자에게 표시하는 페이지 번호는 1부터 시작할 수 있으므로
      // 요청을 보낼 때는 페이지 번호에서 1을 빼줘야 할 수도 있습니다.
      console.log("page", page);
      const response = await axios.get(`http://localhost:8096/admin/all`, {
        params: { // 여기에 쿼리 파라미터들을 넣어줘야 합니다.
          page: page, // 또는 `pageNumber: page - 1` 이 필요한 경우
          size: pageSize,
          paged: true,
          "sort.sorted": true, // 또는 false
          "sort.unsorted": false, // 또는 true
          unpaged: false,
          'sort': 'createdAt,desc' // 추가적인 정렬 파라미터 예시
        },
        headers: { // 헤더는 여기에
          Authorization: `Bearer ${token}`
        }
      });

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
      const response = await axios.get(
        `http://localhost:8096/admin/month/${selectedYear}/${selectedMonth}`
        , {
          params: { // 여기에 쿼리 파라미터들을 넣어줘야 합니다.
            page: mpage, // 또는 `pageNumber: page - 1` 이 필요한 경우
            size: mpageSize,
            paged: true,
            "sort.sorted": true, // 또는 false
            "sort.unsorted": false, // 또는 true
            unpaged: false,
            'sort': 'createdAt,desc' // 추가적인 정렬 파라미터 예시
          },
          headers: { // 헤더는 여기에
            Authorization: `Bearer ${token}`
          }
        }
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
     
      const response = await axios.get(
        `http://localhost:8096/admin/day/${year}/${month}/${day}`
        , {
          params: { // 여기에 쿼리 파라미터들을 넣어줘야 합니다.
            page: dpage, // 또는 `pageNumber: page - 1` 이 필요한 경우
            size: dpageSize,
            paged: true,
            "sort.sorted": true, // 또는 false
            "sort.unsorted": false, // 또는 true
            unpaged: false,
            'sort': 'createdAt,desc' // 추가적인 정렬 파라미터 예시
          },
          headers: { // 헤더는 여기에
            Authorization: `Bearer ${token}`
          }
        }
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

  // // 페이지 변경 핸들러
  // const handlePageChange = (event: any, newPage: any) => {
  //   setPage(newPage);
  // };

  // 다음 버튼 페이지 그룹 업데이트 핸들러
  const handleNextPageGroup = () => {
    const newStart = pageGroupStart + pageSize;
    setPageGroupStart(newStart);
    setPage(newStart); // 현재 페이지도 그룹의 첫 번째 페이지로 설정
  };

  // 이전 버튼 페이지 그룹 업데이트 핸들러
  const handlePreviousPageGroup = () => {
    const newStart = Math.max(pageGroupStart - pageSize, 0); // 0 이하로 내려가지 않도록
    setPageGroupStart(newStart);
    setPage(newStart + pageSize - 1); // 페이지 그룹의 마지막 페이지로 이동
  };


  // m 다음 버튼 페이지 그룹 업데이트 핸들러
  const handleNextMpageGroup = () => {
    const newStart = mpageGroupStart + mpageSize;
    setMpageGroupStart(newStart);
    setMpage(newStart); // 현재 페이지도 그룹의 첫 번째 페이지로 설정
  };

  // m 이전 버튼 페이지 그룹 업데이트 핸들러
  const handlePreviousMpageGroup = () => {
    const newStart = Math.max(mpageGroupStart - mpageSize, 0); // 0 이하로 내려가지 않도록
    setMpageGroupStart(newStart);
    setMpage(newStart + mpageSize - 1); // 페이지 그룹의 마지막 페이지로 이동
  };


  // d 다음 버튼 페이지 그룹 업데이트 핸들러
  const handleNextDpageGroup = () => {
    const newStart = dpageGroupStart + dpageSize;
    setDpageGroupStart(newStart);
    setDpage(newStart); // 현재 페이지도 그룹의 첫 번째 페이지로 설정
  };

  // d 이전 버튼 페이지 그룹 업데이트 핸들러
  const handlePreviousDpageGroup = () => {
    const newStart = Math.max(dpageGroupStart - dpageSize, 0); // 0 이하로 내려가지 않도록
    setDpageGroupStart(newStart);
    setDpage(newStart + dpageSize - 1); // 페이지 그룹의 마지막 페이지로 이동
  };


  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setActiveView("day");
    setShowCalendar(false); // 날짜를 선택하면 캘린더 숨기기
    // 추가적으로 선택된 날짜를 처리하는 로직
  };

  const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    setActiveView("mon");
    setShowMonthPicker(false); // 월을 선택하면 월 선택기 숨기기
    // 추가적으로 선택된 월을 처리하는 로직
    // fetchProfitsByMonth();
  };

  const handleYearSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    setActiveView("mon");
  };

  // const handleViewChange = (view: any) => {
  //   setActiveView(view);
  // };


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

      <div className="sm:ml-64 sm:mt-1 mt-20 space-y-12 pr-12">
        <div className="mx-auto px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 border-b border-gray-900/10 pb-12">
          <h2 className="text-base mt-10 font-semibold leading-7 text-gray-900">
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

          <div className="mt-10 mb-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                          수익
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          급여
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          지출
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          세금
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          환불
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
                            {profit.salaries}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {profit.bills}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {profit.taxes}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {profit.refund}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {profit.createdAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
                <div>
                  {activeView === 'all' && (
                    <div className="flex items-center space-x-2">
                    {/* 이전 버튼 */}
                    <button
                      disabled={pageGroupStart <= 0} // 첫 번째 페이지 그룹에서는 비활성화
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        pageGroupStart > 0 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={handlePreviousPageGroup}
                    >
                      이전
                    </button>

                    {/* 페이지 번호 버튼 */}
                    {Array.from({ length: pageSize }, (_, i) => pageGroupStart + i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          page === pageNum - 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={(e) => setPage(pageNum - 1)}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* 다음 버튼 */}
                    <button
                      className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800"
                      onClick={handleNextPageGroup}
                    >
                      다음
                    </button>
                  </div>
                  )}

                  {activeView === 'mon' && (
                    <div className="flex items-center space-x-2">
                    {/* 이전 버튼 */}
                    <button
                      disabled={mpageGroupStart <= 0} // 첫 번째 페이지 그룹에서는 비활성화
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        mpageGroupStart > 0 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={handlePreviousMpageGroup}
                    >
                      이전
                    </button>

                    {/* 페이지 번호 버튼 */}
                    {Array.from({ length: mpageSize }, (_, i) => mpageGroupStart + i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          mpage === pageNum - 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={(e) => setMpage(pageNum - 1)}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* 다음 버튼 */}
                    <button
                      className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800"
                      onClick={handleNextMpageGroup}
                    >
                      다음
                    </button>
                  </div>
                  )}

                  {activeView === 'day' && (
                    <div className="flex items-center space-x-2">
                    {/* 이전 버튼 */}
                    <button
                      disabled={dpageGroupStart <= 0} // 첫 번째 페이지 그룹에서는 비활성화
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        dpageGroupStart > 0 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={handlePreviousDpageGroup}
                    >
                      이전
                    </button>

                    {/* 페이지 번호 버튼 */}
                    {Array.from({ length: dpageSize }, (_, i) => dpageGroupStart + i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          dpage === pageNum - 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={(e) => setDpage(pageNum - 1)}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* 다음 버튼 */}
                    <button
                      className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800"
                      onClick={handleNextDpageGroup}
                    >
                      다음
                    </button>
                  </div>
                  )}
                </div>
        </div>
        <span className="mr-8">총 수익 : {profitData?.totalProfit}</span>
        <span className="mr-8">월 수익 : {profitData?.monthProfit}</span>
        <span>일 수익 : {profitData?.dayProfit}</span>
      </div>
    </>
  );
}
