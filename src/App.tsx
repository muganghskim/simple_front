import AppRoutes from "./app/AppRoutes";
import { RecoilRoot } from "recoil";
import "./input.css"

export default function App() {
  return (
    <>
      <RecoilRoot>
        <AppRoutes />
      </RecoilRoot>
      
    </>
  )
}