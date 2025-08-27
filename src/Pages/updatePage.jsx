// UpdatePage.jsx — React (JavaScript)
import React, { useContext, useMemo, useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../Authentication With FireBase/AuthContext";

// tiny helper
const cx = (...c) => c.filter(Boolean).join(" ");

const UpdatePage = () => {
  const allPlants = useLoaderData() || [];
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(AuthContext) || { darkMode: false };

  const plant = useMemo(
    () => allPlants.find((p) => String(p?._id) === String(id)),
    [allPlants, id]
  );

  const [saving, setSaving] = useState(false);

  // UI theme atoms
  const containerBg = darkMode ? "bg-zinc-950" : "bg-gray-100";
  const cardClass = darkMode
    ? "rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur"
    : "rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg";
  const labelText = darkMode ? "text-zinc-200" : "text-zinc-700";
  const helpText = darkMode ? "text-zinc-400" : "text-zinc-500";
  const inputBase =
    "w-full p-3 rounded-xl border shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500";
  const inputLight = "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500";
  const inputDark = "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-400";

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    // simple date sanity: nextWatering >= lastWatered
    if (data.lastWatered && data.nextWatering && data.nextWatering < data.lastWatered) {
      Swal.fire({
        icon: "warning",
        title: "Check the dates",
        text: "Next watering date can't be earlier than the last watered date.",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`https://plant-traker-server.vercel.app/plants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Request failed with ${res.status}`);
      }

      const json = await res.json();
      if (json?.modifiedCount > 0) {
        await Swal.fire("Updated!", "Your plant has been updated.", "success");
        navigate(`/plants/${id}`); // go to details page; change if you prefer another route
      } else {
        Swal.fire("Saved", "No changes detected, but data was processed.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", err?.message || "Failed to update plant.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!plant) {
    return (
      <div className={cx("min-h-screen flex items-center justify-center px-4", containerBg)}>
        <div className={cardClass}>
          <h2 className={cx("text-xl font-bold", darkMode ? "text-zinc-50" : "text-zinc-900")}>
            Plant not found
          </h2>
          <p className={cx("mt-1 text-sm", helpText)}>The plant ID looks invalid or the item was removed.</p>
          <button
            onClick={() => navigate(-1)}
            className={cx(
              "mt-4 inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium ring-1",
              darkMode ? "ring-zinc-700 text-zinc-100 hover:bg-zinc-800" : "ring-zinc-300 text-zinc-800 hover:bg-zinc-100"
            )}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("min-h-screen px-4 py-10 pt-24", containerBg)}>
      <div className="mx-auto w-full max-w-3xl">
        <div className={cardClass}>
          <div className="mb-6 text-center">
            <h2
              className={cx(
                "text-3xl font-extrabold tracking-tight",
                darkMode ? "text-emerald-400" : "text-green-700"
              )}
            >
              Update Plant
            </h2>
            <p className={cx("mt-1 text-sm", helpText)}>
              Edit the fields and save. Dates should make chronological sense.
            </p>
          </div>

          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2" noValidate>
            {/* Image */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>Image URL</span>
              <input
                type="url"
                name="image"
                defaultValue={plant.image || ""}
                placeholder="https://..."
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              />
            </label>

            {/* Plant Name */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>Plant Name</span>
              <input
                type="text"
                name="name"
                defaultValue={plant.name || ""}
                placeholder="e.g. Snake Plant"
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              />
            </label>

            {/* Category */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>Category</span>
              <select
                name="category"
                defaultValue={plant.category || ""}
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="succulent">Succulent</option>
                <option value="fern">Fern</option>
                <option value="flowering">Flowering</option>
              </select>
            </label>

            {/* Care Level */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>Care Level</span>
              <select
                name="careLevel"
                defaultValue={plant.careLevel || ""}
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              >
                <option value="" disabled>
                  Select care level
                </option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
            </label>

            {/* Watering Frequency */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>Watering Frequency</span>
              <input
                type="text"
                name="wateringFrequency"
                defaultValue={plant.wateringFrequency || ""}
                placeholder="e.g. every 3 days"
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              />
            </label>

            {/* Health Status */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>Health Status</span>
              <input
                type="text"
                name="healthStatus"
                defaultValue={plant.healthStatus || ""}
                placeholder="e.g. Healthy, Wilting"
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              />
            </label>

            {/* Last Watered Date */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>Last Watered Date</span>
              <input
                type="date"
                name="lastWatered"
                defaultValue={plant.lastWatered || ""}
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              />
            </label>

            {/* Next Watering Date */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>Next Watering Date</span>
              <input
                type="date"
                name="nextWatering"
                defaultValue={plant.nextWatering || ""}
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              />
            </label>

            {/* User Email */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>User Email</span>
              <input
                type="email"
                name="userEmail"
                defaultValue={plant.userEmail || ""}
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              />
            </label>

            {/* User Name */}
            <label className="block">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>User Name</span>
              <input
                type="text"
                name="userName"
                defaultValue={plant.userName || ""}
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              />
            </label>

            {/* Description */}
            <label className="block md:col-span-2">
              <span className={cx("mb-1.5 inline-block text-sm font-medium", labelText)}>Description</span>
              <textarea
                name="description"
                defaultValue={plant.description || ""}
                rows={4}
                placeholder="Brief description about the plant..."
                required
                className={cx(inputBase, darkMode ? inputDark : inputLight)}
              />
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className={cx(
                  "w-full rounded-xl text-white font-semibold tracking-wide transition-transform",
                  "hover:scale-[1.01] active:scale-[.99] disabled:opacity-60 disabled:cursor-not-allowed",
                  darkMode ? "bg-emerald-500 hover:bg-emerald-600" : "bg-emerald-600 hover:bg-emerald-700"
                )}
              >
                {saving ? "Updating..." : "Update"}
              </button>
            </div>

            <p className={cx("md:col-span-2 text-xs", helpText)}>
              Your changes will update immediately on success.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
