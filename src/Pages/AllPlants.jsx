
import React, { useContext, useMemo, useState } from "react";
import { useLoaderData, Link } from "react-router"; 
import { FaEye, FaSearch, FaSort } from "react-icons/fa";
import AuthContext from "../Authentication With FireBase/AuthContext";

// tiny helper
const cx = (...c) => c.filter(Boolean).join(" ");

const PAGE_SIZE = 10;

const AllPlants = () => {
  const plants = useLoaderData() || [];
  const { darkMode } = useContext(AuthContext) || { darkMode: false };

  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [careLevel, setCareLevel] = useState("all");
  const [sortKey, setSortKey] = useState("name"); // name | category | wateringFrequency
  const [sortDir, setSortDir] = useState("asc");  // asc | desc
  const [page, setPage] = useState(1);

  // Dynamic options
  const categories = useMemo(() => {
    const set = new Set();
    plants.forEach(p => p?.category && set.add(String(p.category)));
    return ["all", ...Array.from(set).sort()];
  }, [plants]);

  const careLevels = useMemo(() => {
    const set = new Set();
    plants.forEach(p => p?.careLevel && set.add(String(p.careLevel)));
    return ["all", ...Array.from(set).sort()];
  }, [plants]);

  // Filtering + searching + sorting
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = plants.slice();

    if (q) {
      arr = arr.filter(p =>
        [p?.name, p?.category, p?.wateringFrequency]
          .filter(Boolean)
          .some(v => String(v).toLowerCase().includes(q))
      );
    }
    if (category !== "all") {
      arr = arr.filter(p => String(p?.category) === category);
    }
    if (careLevel !== "all") {
      arr = arr.filter(p => String(p?.careLevel) === careLevel);
    }

    arr.sort((a, b) => {
      const av = (a?.[sortKey] ?? "").toString().toLowerCase();
      const bv = (b?.[sortKey] ?? "").toString().toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  }, [plants, query, category, careLevel, sortKey, sortDir]);

  // Pagination
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

  const tableHeadCell = (label, key) => (
    <th
      className={cx(
        "px-3 py-2 text-left text-sm font-semibold select-none cursor-pointer",
        darkMode ? "text-zinc-100" : "text-zinc-800"
      )}
      onClick={() => toggleSort(key)}
      title={`Sort by ${label}`}
    >
      <span className="inline-flex items-center gap-2">
        {label}
        <FaSort className={cx("opacity-60", sortKey === key && "opacity-100")} />
      </span>
    </th>
  );

  return (
    <div className={cx("min-h-screen px-4 pt-20 pb-10", darkMode ? "bg-zinc-950" : "bg-gray-100")}>
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2
            className={cx(
              "text-3xl font-extrabold tracking-tight",
              darkMode ? "text-zinc-50" : "text-green-700"
            )}
          >
            All Plants
          </h2>

          {/* Controls */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            {/* Search */}
            <label className="relative block sm:w-80">
              <span
                className={cx(
                  "absolute left-3 top-1/2 -translate-y-1/2",
                  darkMode ? "text-zinc-400" : "text-zinc-500"
                )}
              >
                <FaSearch />
              </span>
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search plants, category, frequency..."
                className={cx(
                  "w-full rounded-xl pl-9 pr-3 py-2 text-sm border shadow-sm",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-400"
                    : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500"
                )}
              />
            </label>

            {/* Category filter */}
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className={cx(
                "rounded-xl px-3 py-2 text-sm border shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                  : "bg-white border-zinc-300 text-zinc-900"
              )}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>
              ))}
            </select>

            {/* Care level filter */}
            <select
              value={careLevel}
              onChange={(e) => { setCareLevel(e.target.value); setPage(1); }}
              className={cx(
                "rounded-xl px-3 py-2 text-sm border shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                  : "bg-white border-zinc-300 text-zinc-900"
              )}
            >
              {careLevels.map(c => (
                <option key={c} value={c}>{c === "all" ? "All care levels" : c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table card */}
        <div
          className={cx(
            "overflow-hidden rounded-2xl border shadow-lg",
            darkMode ? "border-zinc-800 bg-zinc-900/70" : "border-zinc-200 bg-white"
          )}
        >
          <div className={cx("overflow-x-auto")}>
            <table className="min-w-full border-collapse">
              <thead className={cx(darkMode ? "bg-zinc-900" : "bg-emerald-50")}>
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-semibold">#</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold">Image</th>
                  {tableHeadCell("Plant Name", "name")}
                  {tableHeadCell("Category", "category")}
                  {tableHeadCell("Watering Frequency", "wateringFrequency")}
                  <th className="px-3 py-2 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((plant, idx) => (
                  <tr
                    key={plant._id}
                    className={cx(
                      "border-t",
                      darkMode ? "border-zinc-800" : "border-zinc-200",
                      idx % 2 === 0 ? (darkMode ? "bg-zinc-900/40" : "bg-white") : (darkMode ? "bg-zinc-900/20" : "bg-emerald-50/30")
                    )}
                  >
                    <td className="px-3 py-3 text-sm">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                    <td className="px-3 py-3">
                      <img
                        src={plant.image}
                        alt={plant.name || "plant"}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='10'>No Image</text></svg>"; }}
                        className="h-12 w-12 rounded object-cover"
                      />
                    </td>
                    <td className="px-3 py-3 text-sm font-medium">{plant.name}</td>
                    <td className="px-3 py-3 text-sm">
                      <span
                        className={cx(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",
                          darkMode
                            ? "bg-emerald-900/40 text-emerald-300 ring-emerald-800"
                            : "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        )}
                      >
                        {plant.category}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm">{plant.wateringFrequency}</td>
                    <td className="px-3 py-3">
                      <Link to={`/plants/${plant._id}`}>
                        <button
                          className={cx(
                            "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium border transition-colors",
                            darkMode
                              ? "border-emerald-600 text-emerald-300 hover:bg-emerald-600/10"
                              : "border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                          )}
                          aria-label={`View details for ${plant.name}`}
                        >
                          <FaEye /> View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}

                {paged.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-10">
                      <div
                        className={cx(
                          "text-center rounded-xl border p-10",
                          darkMode ? "border-zinc-800 bg-zinc-900/40 text-zinc-300" : "border-zinc-200 bg-white text-zinc-600"
                        )}
                      >
                        No plants found. Try clearing filters or search.
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
              Showing {(filtered.length === 0) ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
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

        {/* Small hint */}
        <p className={cx("mt-3 text-xs", darkMode ? "text-zinc-400" : "text-zinc-500")}>
          Tip: click a column header to sort; use the filters to narrow results.
        </p>
      </div>
    </div>
  );
};

export default AllPlants;
