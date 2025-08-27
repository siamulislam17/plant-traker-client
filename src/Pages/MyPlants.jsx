// MyPlants.jsx — React (JavaScript)
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaSearch, FaSort } from "react-icons/fa";
import AuthContext from "../Authentication With FireBase/AuthContext";

// tiny helper
const cx = (...c) => c.filter(Boolean).join(" ");
const PAGE_SIZE = 8;

const MyPlants = () => {
  const initialPlants = useLoaderData() || [];
  const navigate = useNavigate();

  // auth context
  const { user, darkMode } = useContext(AuthContext) || { user: null, darkMode: false };

  // local state
  const [plants, setPlants] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name"); // name | category | wateringFrequency
  const [sortDir, setSortDir] = useState("asc");  // asc | desc
  const [page, setPage] = useState(1);

  // prepare user-specific list when user/loader changes
  useEffect(() => {
    if (user && initialPlants?.length) {
      const mine = initialPlants.filter(p => p?.userEmail === user.email);
      setPlants(mine);
      setPage(1);
    } else {
      setPlants([]);
    }
  }, [user, initialPlants]);

  // filter + search + sort
  const filtered = useMemo(() => {
    let arr = plants.slice();
    const q = query.trim().toLowerCase();

    if (q) {
      arr = arr.filter(p =>
        [p?.name, p?.category, p?.wateringFrequency, p?.healthStatus]
          .filter(Boolean)
          .some(v => String(v).toLowerCase().includes(q))
      );
    }

    arr.sort((a, b) => {
      const av = (a?.[sortKey] ?? "").toString().toLowerCase();
      const bv = (b?.[sortKey] ?? "").toString().toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  }, [plants, query, sortKey, sortDir]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Delete plant
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await fetch(`https://plant-traker-server.vercel.app/plants/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || `Request failed with ${res.status}`);
        }
        const data = await res.json();
        if (data?.deletedCount > 0) {
          setPlants(prev => prev.filter(p => p._id !== id));
          Swal.fire("Deleted!", "Your plant has been deleted.", "success");
        } else {
          Swal.fire("Hmm", "Server didn’t confirm deletion. Refresh to verify.", "info");
        }
      } catch (e) {
        Swal.fire("Error", e?.message || "Could not delete the plant.", "error");
      }
    });
  };

  // Navigate to update page
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  // image fallback
  const fallbackSrc =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>
        <rect width='100%' height='100%' fill='#e5e7eb'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='10'>No Image</text>
      </svg>`
    );

  const onImgError = (e) => {
    e.currentTarget.src = fallbackSrc;
  };

  // table header helper
  const ThSort = ({ label, keyName }) => (
    <th
      onClick={() => toggleSort(keyName)}
      className={cx(
        "px-3 py-2 text-left text-sm font-semibold cursor-pointer select-none",
        darkMode ? "text-zinc-100" : "text-zinc-800"
      )}
      title={`Sort by ${label}`}
    >
      <span className="inline-flex items-center gap-2">
        {label} <FaSort className={cx("opacity-60", sortKey === keyName && "opacity-100")} />
      </span>
    </th>
  );

  return (
    <div className={cx("min-h-screen px-4 pt-20 pb-10", darkMode ? "bg-zinc-950" : "bg-gray-100")}>
      <div className="mx-auto w-full max-w-6xl">
        {/* Header + Controls */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className={cx("text-3xl font-extrabold tracking-tight", darkMode ? "text-zinc-50" : "text-green-700")}>
            My Plants
          </h2>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            {/* Search */}
            <label className="relative block sm:w-80">
              <span className={cx("absolute left-3 top-1/2 -translate-y-1/2", darkMode ? "text-zinc-400" : "text-zinc-500")}>
                <FaSearch />
              </span>
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search your plants..."
                className={cx(
                  "w-full rounded-xl pl-9 pr-3 py-2 text-sm border shadow-sm",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-400"
                    : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500"
                )}
              />
            </label>
          </div>
        </div>

        {/* Table card */}
        <div
          className={cx(
            "overflow-hidden rounded-2xl border shadow-lg",
            darkMode ? "border-zinc-800 bg-zinc-900/70" : "border-zinc-200 bg-white"
          )}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className={cx(darkMode ? "bg-zinc-900" : "bg-emerald-50")}>
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-semibold">Image</th>
                  <ThSort label="Name" keyName="name" />
                  <ThSort label="Category" keyName="category" />
                  <ThSort label="Watering" keyName="wateringFrequency" />
                  <th className="px-3 py-2 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.length > 0 ? (
                  paged.map((plant, idx) => (
                    <tr
                      key={plant._id}
                      className={cx(
                        "border-t",
                        darkMode ? "border-zinc-800" : "border-zinc-200",
                        idx % 2 === 0
                          ? darkMode ? "bg-zinc-900/40" : "bg-white"
                          : darkMode ? "bg-zinc-900/20" : "bg-emerald-50/30"
                      )}
                    >
                      <td className="px-3 py-3">
                        <img
                          src={plant.image}
                          alt={plant.name || "plant"}
                          className="h-14 w-14 rounded object-cover ring-1 ring-black/5"
                          loading="lazy"
                          onError={onImgError}
                        />
                      </td>
                      <td className="px-3 py-3 text-sm font-medium">{plant.name}</td>
                      <td className="px-3 py-3 text-sm">{plant.category}</td>
                      <td className="px-3 py-3 text-sm">{plant.wateringFrequency}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdate(plant._id)}
                            className={cx(
                              "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium border transition-colors",
                              darkMode
                                ? "border-blue-500 text-blue-300 hover:bg-blue-500/10"
                                : "border-blue-600 text-blue-700 hover:bg-blue-50"
                            )}
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(plant._id)}
                            className={cx(
                              "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium border transition-colors",
                              darkMode
                                ? "border-red-500 text-red-300 hover:bg-red-500/10"
                                : "border-red-600 text-red-700 hover:bg-red-50"
                            )}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-3 py-10">
                      <div
                        className={cx(
                          "text-center rounded-xl border p-10",
                          darkMode
                            ? "border-zinc-800 bg-zinc-900/40 text-zinc-300"
                            : "border-zinc-200 bg-white text-zinc-600"
                        )}
                      >
                        No plants found for your account.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer: results + pagination */}
          <div
            className={cx(
              "flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between",
              darkMode ? "border-zinc-800" : "border-zinc-200"
            )}
          >
            <div className={cx("text-sm", darkMode ? "text-zinc-300" : "text-zinc-600")}>
              Showing {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
              {"–"}
              {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={cx(
                  "rounded-lg px-3 py-1.5 text-sm border",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  darkMode ? "border-zinc-700 text-zinc-100 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"
                )}
              >
                Prev
              </button>
              <span className={cx("text-sm", darkMode ? "text-zinc-300" : "text-zinc-700")}>
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={cx(
                  "rounded-lg px-3 py-1.5 text-sm border",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  darkMode ? "border-zinc-700 text-zinc-100 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"
                )}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <p className={cx("mt-3 text-xs", darkMode ? "text-zinc-400" : "text-zinc-500")}>
          Tip: search by name/category/frequency. Click column headers to sort.
        </p>
      </div>
    </div>
  );
};

export default MyPlants;
