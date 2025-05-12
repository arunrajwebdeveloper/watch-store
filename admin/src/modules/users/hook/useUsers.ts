import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { getUsers, getUserById } from "../api";

export const useUsers = ({ load = false, userId = "" }) => {
  // const navigate = useNavigate();

  const fetchUsers = useQuery({
    queryKey: ["USERS"],
    queryFn: getUsers,
    enabled: load,
  });

  const fetchUsersById = useQuery({
    queryKey: ["USERS", userId],
    queryFn: () => getUserById(userId),
    enabled: load && !!userId,
  });

  return { fetchUsers, fetchUsersById };
};
