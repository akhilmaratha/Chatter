import Logout from "./Logout"
import Search from "./Search"
import Users from "./Users"

const Left = () => {
  return (
    <div className="w-full bg-black text-gray-400">
        <Search/>
        <div
        className=" flex-1 overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users/>
      </div>
        <Logout/>
    </div>
  )
}

export default Left