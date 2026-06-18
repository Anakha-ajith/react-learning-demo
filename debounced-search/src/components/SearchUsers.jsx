import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { fetchUsers } from "../services/userService";

const SearchUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      const getUsers = async () => {
        try {
          setLoading(true);
          setError("");

          const data = await fetchUsers(debouncedSearch);

          setUsers(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getUsers();
    }
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsers;
