import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return "loading...............";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  const {subpage}=useParams();
  console.log(subpage); 

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4">
        <Link
          className="px-2 py-6 bg-primary text-white rounded-full"
          to={"/account/"}
        >
          My profile
        </Link>
        <Link className="px-2 py-6" to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className="px-2 py-6" to={"/account/places"}>
          My accomodations
        </Link>
      </nav>
    </div>
  );
}
